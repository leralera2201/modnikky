
import axios from "axios";
import {
    CATEGORY_DELETE_ERROR,
    CATEGORY_DELETE_REQUEST, CATEGORY_DELETE_SUCCESS,
    CATEGORY_LIST_ERROR,
    CATEGORY_LIST_REQUEST,
    CATEGORY_LIST_SUCCESS, CATEGORY_SAVE_ERROR,
    CATEGORY_SAVE_REQUEST, CATEGORY_SAVE_SUCCESS
} from "../constants/categoryConstants";

const listCategory = (all=false) => async (dispatch, getState) => {
    try{
        dispatch({type: CATEGORY_LIST_REQUEST})
        const {userSignIn: {userInfo}} = getState()
        if (all) {
            let {data} = await axios.get('http://localhost:5000/api/categories/all', {
                headers: {
                    'Authorization': 'Bearer ' + userInfo.token
                }
            })
            dispatch({type:  CATEGORY_LIST_SUCCESS, payload: data})
        }else{
            let {data} =  await axios.get('http://localhost:5000/api/categories')
            dispatch({type:  CATEGORY_LIST_SUCCESS, payload: data})
        }
    }catch (e) {
        if (e.response && e.response.data) {
            dispatch({type: CATEGORY_LIST_ERROR, payload: e.response.data.message})
        }
    }
}
const saveCategory = (category) => async(dispatch, getState) => {
    try{
        const {userSignIn: {userInfo}} = getState()
        dispatch({type: CATEGORY_SAVE_REQUEST, payload: category})
        if(category._id) {
            const {data} = await axios.put('http://localhost:5000/api/categories/' + category._id, category, {
                headers: {
                    'Authorization': 'Bearer ' + userInfo.token
                }
            })
            dispatch({type: CATEGORY_SAVE_SUCCESS, payload: data})
        }else{
            const {data} = await axios.post('http://localhost:5000/api/categories', category, {
                headers: {
                    'Authorization': 'Bearer ' + userInfo.token
                }
            })
            dispatch({type: CATEGORY_SAVE_SUCCESS, payload: data})
        }

    }catch (e) {
        if (e.response && e.response.data) {
            dispatch({type: CATEGORY_SAVE_ERROR, payload: e.response.data.message})
        }
    }
}

const deleteCategory = (categoryId) => async (dispatch, getState) => {
    try{
        const {userSignIn: {userInfo}} = getState()
        dispatch({type: CATEGORY_DELETE_REQUEST, payload: categoryId})
        const {data} = await axios.delete('http://localhost:5000/api/categories/' + categoryId, {
            headers: {
                'Authorization': 'Bearer ' + userInfo.token
            }
        })
        dispatch({type: CATEGORY_DELETE_SUCCESS, payload: data})
    }catch (e) {
        if (e.response && e.response.data) {
            dispatch({type: CATEGORY_DELETE_ERROR, payload: e.response.data.message})
        }
    }
}

export {listCategory, deleteCategory, saveCategory}
