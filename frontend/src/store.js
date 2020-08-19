import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from "redux-thunk";
import {signInReducer, signUpReducer} from "./reducers/userReducers";
import {
    productColorsReducer,
    productDeleteReducer,
    productDetailReducer,
    productListReducer,
    productSaveReducer, productSaveReviewReducer, productSizesReducer
} from "./reducers/productReducers";
import {cartReducer} from "./reducers/cartReducers";
import {
    orderCreateReducer,
    orderDeleteReducer,
    orderListReducer
} from "./reducers/orderReducers";
import {categoryDeleteReducer, categoryListReducer, categorySaveReducer} from "./reducers/categoryReducers";

const userInfo = JSON.parse(localStorage.getItem('userInfo')) || null
const cartItems = JSON.parse(localStorage.getItem('cartItems')) || []
const shipping = JSON.parse(localStorage.getItem('shipping')) || {}
const payment = JSON.parse(localStorage.getItem('payment')) || {}
const initialState={
    userSignIn: {userInfo},
    cart: {cartItems, shipping, payment}
}

const reducer = combineReducers({
    userSignIn: signInReducer,
    userSignUp: signUpReducer,
    productList: productListReducer,
    productDetail: productDetailReducer,
    cart: cartReducer,
    orderCreate: orderCreateReducer,
    orderDelete: orderDeleteReducer,
    orderList: orderListReducer,
    categoryList: categoryListReducer,
    productSave: productSaveReducer,
    productDelete: productDeleteReducer,
    categorySave: categorySaveReducer,
    categoryDelete: categoryDeleteReducer,
    productSaveReview: productSaveReviewReducer,
    productColors: productColorsReducer,
    productSizes: productSizesReducer
})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)))

export default store
