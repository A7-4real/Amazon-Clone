import React, {useState, useEffect} from 'react'
import Order from './Order';
import './Orders.css'
import { useStateValue } from './StateProvider';
import { db } from "./firebase";

function Orders() {
    const [{basket, user}, dispatch] = useStateValue();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if(user) {
            db
            .collection('users')
            .doc(user?.uid)
            .collection('orders')
            .orderBy('created', 'desc')
            .onSnapshot(snapshot => {
                setOrders(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
  
            })
        }

    }, [])
    return (
        <div className='orders'>
            <h1>Your Orders</h1>

            <div className='orders__order'>
                {orders?.map(order => {
                    <Order order={order} />
                })}
            </div>
        </div>
        
    )
}

export default Orders
