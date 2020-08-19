import {
    CREATE_ORDER_ERROR,
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    ORDER_DELETE_ERROR,
    ORDER_DELETE_REQUEST,
    ORDER_DELETE_SUCCESS,
    ORDER_LIST_ERROR,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS
} from "../constants/orderConstants";


const orderCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_ORDER_REQUEST:
            return {loading: true}
        case CREATE_ORDER_SUCCESS:
            return {loading: false, order: action.payload, success: true}
        case CREATE_ORDER_ERROR:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

// const orderDetailsReducer = (state={ order: {
//         orderItems: [],
//         shipping: {},
//         payment: {}
//     }}, action) => {
//     switch (action.type) {
//         case ORDER_DETAIL_REQUEST:
//             return {loading: true}
//         case ORDER_DETAIL_SUCCESS:
//             return {loading: false, order: action.payload}
//         case ORDER_DETAIL_ERROR:
//             return {loading: false, error: action.payload}
//         default:
//             return state
//     }
// }
//
//
//
// const myOrderListReducer = (state = {orders: []}, action) => {
//     switch (action.type) {
//         case MY_ORDER_LIST_REQUEST:
//             return {loading: true}
//         case MY_ORDER_LIST_SUCCESS:
//             return {loading: false, orders: action.payload}
//         case MY_ORDER_LIST_ERROR:
//             return {loading: false, error: action.payload}
//         default:
//             return state
//     }
// }

const orderListReducer = (state = {orders: []}, action) => {
    switch (action.type) {
        case ORDER_LIST_REQUEST:
            return {loading: true}
        case ORDER_LIST_SUCCESS:
            return {loading: false, orders: action.payload}
        case ORDER_LIST_ERROR:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

const orderDeleteReducer = (state={}, action) => {
    switch (action.type){
        case ORDER_DELETE_REQUEST:
            return {
                loading: true
            }
        case ORDER_DELETE_SUCCESS:
            return {
                loading: false,
                success: true
            }
        case ORDER_DELETE_ERROR:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state

    }
}
export {orderCreateReducer, orderListReducer, orderDeleteReducer}
