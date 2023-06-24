import React, { useReducer } from 'react';
import CartContext from './cart-context';

//action is dispatched by you, state is last state snapshot managed by reducer.
const cartReducer = (state, action) => {
    if (action.type === 'ADD_CART_ITEM') {
        //return a new array with concat()
        const updatedItems = state.items.concat(action.item);
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
        return{
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }
    return
}

const defaultCart = {
    items: [],
    totalAmount: 0
};

const CartProvider = (props) => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCart);

    const addCartItemHandler = (item) => {
        dispatchCartAction({
            type: 'ADD_CART_ITEM',
            item: item,
        })
    }
    const removeCartItemHandler = (id) => {
        dispatchCartAction({
            item: 'REMOVE_CART_ITEM',
            id: id
        })

    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addCartItemHandler,
        removeItem: removeCartItemHandler,
    }

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartProvider;