import React from 'react';
import classes from './Cart.module.css';


const Cart = (props) => {

    const cartItems =
        [{
            id: 'c1',
            item: 'sushi',
            amount: 2,
            price: 12.99,
        }].map((item) => <li>{item.name}</li>)



    return (
        <div>

            <div>CartItems</div>
            <div></div>
            <div></div>

        </div>
    )
}

export default Cart;