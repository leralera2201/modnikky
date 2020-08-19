import {
    USER_LOGOUT, USER_REGISTER_ERROR, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS,
    USER_SIGNIN_ERROR,
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_SUCCESS
} from "../constants/userConstants";
import axios from 'axios'


const signIn = (email, password) => async(dispatch) => {
    dispatch({type: USER_SIGNIN_REQUEST, payload: {email, password}})
    try{

        const {data} = await axios.post('http://localhost:5000/api/users/signin', {email, password})
        dispatch({type: USER_SIGNIN_SUCCESS, payload: data})
        localStorage.setItem('userInfo', JSON.stringify(data))

    }catch (e) {
        if (e.response && e.response.data) {
            dispatch({type: USER_SIGNIN_ERROR, payload: e.response.data.message})
        }
    }
}

const signUp = (email, password, name, surname) => async(dispatch) => {
    dispatch({type: USER_REGISTER_REQUEST, payload: {email, password, name,surname}})
    try{
        const {data} = await axios.post('http://localhost:5000/api/users/register', {email, password, name,surname})
        dispatch({type: USER_REGISTER_SUCCESS, payload: data})
        localStorage.setItem('userInfo', JSON.stringify(data))

    }catch (e) {
        if (e.response && e.response.data) {
            dispatch({type: USER_REGISTER_ERROR, payload: e.response.data.message})
        }
    }
}

// const resetPassword = () => (dispatch) => {
//     dispatch({type: USER_RESET_REQUEST, payload: {email, password, name,surname}})
//     try{
//         const {data} = await axios.post('http://localhost:5000/api/users/register', {email, password, name,surname})
//         dispatch({type: USER_RESET_SUCCESS, payload: data})
//         localStorage.setItem('userInfo', JSON.stringify(data))
//
//     }catch (e) {
//         if (e.response && e.response.data) {
//             dispatch({type: USER_RESET_ERROR, payload: e.response.data.message})
//         }
//     }
// }
const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({type: USER_LOGOUT})
}
export {signIn, logout, signUp}
