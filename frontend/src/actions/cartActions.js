import axios from 'axios'
import {CART_ADD_ITEM, CART_SAVE_PAYMENT, CART_SAVE_SHIPPING, REMOVE_FROM_CART} from "../constants/cartConstants";


const addToCart = (productId, qty, size) => async(dispatch, getState) => {
    try{
        const {data} = await axios.get('http://localhost:5000/api/products/' + productId)
        dispatch({
            type: CART_ADD_ITEM, payload: {
                _id: data._id,
                name: data.name,
                color: data.color,
                imageUrl: data.imageUrl,
                price: data.price,
                countInStock: data.countInStock,
                qty,
                size
            }
        });
        const {cart: {cartItems}} = getState()
        localStorage.setItem('cartItems', JSON.stringify(cartItems))
    }catch (e) {

    }
}

const removeFromCart = (productId) =>  (dispatch, getState) => {
    try{
        dispatch({type: REMOVE_FROM_CART, payload: productId})
        const {cart: {cartItems}} = getState()
        localStorage.setItem('cartItems', JSON.stringify(cartItems))
    }catch (e) {

    }
}
const saveShipping = (data) => (dispatch) => {
    dispatch({type: CART_SAVE_SHIPPING, payload: data})
    localStorage.setItem('shipping', JSON.stringify(data))
}

const savePayment = (data) => (dispatch) => {
    dispatch({type: CART_SAVE_PAYMENT, payload: data})
    localStorage.setItem('payment', JSON.stringify(data))
}

export {addToCart, removeFromCart, saveShipping, savePayment}
