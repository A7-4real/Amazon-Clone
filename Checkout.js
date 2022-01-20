import React from 'react';
import './Checkout.css';
import CheckoutProduct from './CheckoutProduct';
import { useStateValue } from './StateProvider';
import Subtotal from './Subtotal';

function Checkout() {
    const [{basket, user}, dispatch] = useStateValue();

    return (
        <div className='checkout'>
            <div className='checkout__left'>
                <img className='checkout__ad'
                src='https://images-eu.ssl-images-amazon.com/images/G/31/img20/Vernac13th/3000x300_V2_Eng_2x._CB412597113_.jpg'
                alt='add'
                />

                <div>
                    <h3>Hello, {user?.email}</h3>
                    <h2 className='checkout__title'>
                        Your Shopping Basket
                    </h2>

                    {basket.map(item => (
                        <CheckoutProduct
                        id={item.id}
                        title={item.title}
                        image={item.image}
                        price={item.price}
                        rating={item.rating}
                        />
                    ))}
                
                </div>               
            </div>

            <div className='checkout__right'>
                    <Subtotal />
            </div>
        </div>
    )
}

export default Checkout
