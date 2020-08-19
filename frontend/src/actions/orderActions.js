import axios from 'axios'
import {
    CREATE_ORDER_ERROR,
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS, ORDER_LIST_ERROR, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS,
    ORDER_DELETE_ERROR, ORDER_DELETE_REQUEST, ORDER_DELETE_SUCCESS
} from "../constants/orderConstants";


const createOrder = (order) => async (dispatch, getState) => {
    try{
        dispatch({type: CREATE_ORDER_REQUEST, payload: order})
        const {userSignIn: {userInfo}} = getState()
        const {data: {data: newOrder}} = await axios.post('http://localhost:5000/api/orders', order, {
            headers: {
                Authorization: 'Bearer ' + userInfo.token
            }
        })
        dispatch({type: CREATE_ORDER_SUCCESS, payload: newOrder})
        localStorage.removeItem('cartItems')
    }catch (e) {
        dispatch({type: CREATE_ORDER_ERROR, payload: e.message})
    }
}

// const detailsOrder = (orderId) => async (dispatch, getState) => {
//     try{
//         dispatch({type: ORDER_DETAIL_REQUEST, payload: orderId})
//         const {userSignIn: {userInfo}} = getState()
//         const {data} = await axios.get('http://localhost:5000/api/orders/'+orderId, {headers: {
//                 Authorization: 'Bearer ' + userInfo.token
//             }})
//         dispatch({type: ORDER_DETAIL_SUCCESS, payload: data})
//     }catch (e) {
//         dispatch({type: ORDER_DETAIL_ERROR, payload: e.message})
//     }
// }
//
//
// const listMyOrders = () =>async (dispatch, getState) => {
//     dispatch({type: MY_ORDER_LIST_REQUEST})
//     const {userSignIn: {userInfo}} = getState()
//     try{
//
//         const {data} = await axios.get('http://localhost:5000/api/orders/mine',  {headers: {
//                 Authorization: 'Bearer ' + userInfo.token
//
//             }})
//         dispatch({type: MY_ORDER_LIST_SUCCESS, payload: data})
//     }catch (e) {
//         dispatch({type: MY_ORDER_LIST_ERROR, payload: e.message})
//     }
// }

const listOrders = () =>async (dispatch, getState) => {
    dispatch({type: ORDER_LIST_REQUEST})
    const {userSignIn: {userInfo}} = getState()
    try{

        const {data} = await axios.get('http://localhost:5000/api/orders',  {headers: {
                Authorization: 'Bearer ' + userInfo.token

            }})
        dispatch({type: ORDER_LIST_SUCCESS, payload: data})
    }catch (e) {
        dispatch({type: ORDER_LIST_ERROR, payload: e.message})
    }
}

const deleteOrder = (orderId) => async (dispatch, getState) => {
    try{
        const {userSignIn: {userInfo}} = getState()
        dispatch({type: ORDER_DELETE_REQUEST, payload: orderId})
        const {data} = await axios.delete('http://localhost:5000/api/orders/' + orderId, {
            headers: {
                'Authorization': 'Bearer ' + userInfo.token
            }
        })
        dispatch({type: ORDER_DELETE_SUCCESS, payload: data})
    }catch (e) {
        dispatch({type: ORDER_DELETE_ERROR, payload: e.message})
    }
}

export {createOrder, listOrders, deleteOrder}
