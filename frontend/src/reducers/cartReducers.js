import {CART_ADD_ITEM, CART_SAVE_PAYMENT, CART_SAVE_SHIPPING, REMOVE_FROM_CART} from "../constants/cartConstants";

const cartReducer = (state = {cartItems: [], shipping: {}, payment: {}}, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload;
            const product = state.cartItems.find(x => x._id === item._id);
            if (product) {
                return {
                    cartItems:
                        state.cartItems.map(x => x._id === product._id ? item : x),
                    success: true
                };
            }
            return {cartItems: [...state.cartItems, item]};
        case REMOVE_FROM_CART:
            return {cartItems: state.cartItems.filter(x => x._id !== action.payload)}
        case CART_SAVE_SHIPPING:
            return {...state, shipping: action.payload}
        case CART_SAVE_PAYMENT:
            return {...state, payment: action.payload}
        case "REMOVE_ALL_FROM_CART":
            return {...state, cartItems: []}
        default:
            return state
    }
}

export {cartReducer}
