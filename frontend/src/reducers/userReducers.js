import {
    USER_LOGOUT, USER_REGISTER_ERROR,
    USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS,
    USER_SIGNIN_ERROR,
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_SUCCESS
} from "../constants/userConstants";

const signInReducer = (state={}, action) => {
    switch (action.type) {
        case USER_SIGNIN_REQUEST:
            return {loading: true}
        case USER_SIGNIN_SUCCESS:
            return {loading: false, userInfo: action.payload}
        case USER_SIGNIN_ERROR:
            return {loading: false, error: action.payload}
        case USER_LOGOUT:
            return {}
        default:
            return state
    }
}

const signUpReducer = (state={}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return {loading: true}
        case USER_REGISTER_SUCCESS:
            return {loading: false, userInfo: action.payload, success: true}
        case USER_REGISTER_ERROR:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}



export {signInReducer, signUpReducer}
