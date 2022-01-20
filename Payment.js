import { useElements, useStripe, CardElement } from '@stripe/react-stripe-js';
import React, {useState, useEffect} from 'react'
import CurrencyFormat from 'react-currency-format';
import { Link, useHistory } from 'react-router-dom';
import CheckoutProduct from './CheckoutProduct';
import './Payment.css'
import { getBasketTotal } from './reducer';
import { useStateValue } from './StateProvider'
import axios from './axios';
import { db } from "./firebase";

function Payment() {
    const [{basket, user}, dispatch] = useStateValue();
    const history = useHistory();

    const stripe = useStripe();
    const elements = useElements()

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState('');
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(true);

    useEffect(() => {
        //generate the special stripe secret which allows us to charge a customer

        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                url: '/payments/create?total=${getBasketTotal(basket)*100}'
            });
            setClientSecret(response.data.clientSecret)
        }

        getClientSecret();
    }, [basket])

    console.log('The secret is >>> ', clientSecret);
    console.log('user', user);

    const handleSubmit = async (event) => {
        //do all the fancy sripe stuff
        event.preventDefault();
        setProcessing(true);

    db
        .collection('users')
        .doc(user?.uid)
        .collection('orders')
        .doc(getBasketTotal.id)
        .set({
            basket: basket,
            amount: getBasketTotal(basket),
            created: true
        })

        history.replace('/orders');

        
        

        const payload = await stripe.confirmCardPayment(
            clientSecret, { payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({paymentIntent}) => {
            // paymentIntent = payment confirmation

            setSucceeded(true);
            setError(null);
            setProcessing(false);

            dispatch({
                type: 'EMPTY_BASKET'
            })

        })
    }

    const handleChange = event => {
        // Listen for changes in the CardElement
        // and display any errors as the customer types their card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message : '');


    }

    return (
        <div className='payment'>
            <div className='payment__container'>
                <h1>
                    checkout {<Link to='/checkout'>{basket?.length} items</Link>}
                </h1>
                {/* payment section - Delivery address */}
                <div className='payment__section'>
                    <div className='payement__title'>
                        <h3>Delivery address</h3>
                    </div>
                    <div className='payment__address'>
                        <p>{user?.email}</p>
                        <p>123 React Lane</p>
                        <p>Los Angeles, CA</p>
                    </div>

                </div>

                {/* payment section - Review Items */}
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className='payment__items'>
                        {basket.map(item => (
                            <CheckoutProduct
                            id={item.id}
                            title={item.title}
                            image={item.image}
                            price={item.price}
                            rating={item.rating} />
                        ))} 
                    </div>
                  
                </div>

                {/* payment section - Payment method */}
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Payment Method</h3>
                    </div>
                    <div className='payment__details'>
                        {/* stripe magic will go here */}
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange} />
                            
                            <div className='payment__priceContainer'>
                                <CurrencyFormat
                                renderText={(value) => (
                                    <h3>Order Total: {value}</h3>
                                )}
                                decimalScale={2}
                                value={getBasketTotal(basket)}
                                displayType={'text'}
                                thousandSeperator={true}
                                prefix={'₹'}
                                />
                                <button disabled={processing || disabled || succeeded}>
                                    <span>{processing ? <p>processing</p> : 'Buy Now'}</span>
                                </button>
                            </div>

                                {/* Errors */}
                                {error && <div>{error}</div>}
                        </form>
                    </div>

                </div>

            </div>


        </div>
    )
}

export default Payment
