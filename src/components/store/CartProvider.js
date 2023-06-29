import React, { useReducer } from 'react';
import CartContext from './cart-context';

const defaultCartState = {
    items: [],
    totalAmount: 0
};

//action is dispatched by you, state is last state snapshot managed by reducer.
const cartReducer = (state, action) => {
    if (action.type === 'ADD_CART_ITEM') {

        //looking for duplicate cart items by their ID to fuse them together instead of just adding them separatly in the cart
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id)

        const existingCartItem = state.items[existingCartItemIndex];

        let updatedItems

        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            }
            updatedItems = [...state.items]
            updatedItems[existingCartItemIndex] = updatedItem
        } else {
            //return a new array with concat()
            updatedItems = state.items.concat(action.item)
        }

        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }

    if (action.type === 'REMOVE_CART_ITEM') {

        const existingCartItemIndex = state.items.findIndex(item =>
            item.id === action.id);

        const existingItem = state.items[existingCartItemIndex];
        const updatedTotalAmount = state.totalAmount - existingItem.price;
        let updatedItems;
        if (existingItem.amount === 1) {
            updatedItems = state.items.filter(item => item.id !== action.id)

        } else {
            const updatedItem = { ...existingItem, amount: existingItem.amount - 1 }
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }

    return defaultCartState
}


const CartProvider = (props) => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const addCartItemHandler = (item) => {
        dispatchCartAction({
            type: 'ADD_CART_ITEM',
            item: item,
        })
    }
    const removeCartItemHandler = (id) => {
        dispatchCartAction({
            type: 'REMOVE_CART_ITEM',
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