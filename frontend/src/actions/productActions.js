import {
    PRODUCT_DELETE_ERROR,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DETAIL_ERROR,
    PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_SUCCESS,
    PRODUCT_GET_COLORS_ERROR,
    PRODUCT_GET_COLORS_REQUEST,
    PRODUCT_GET_COLORS_SUCCESS, PRODUCT_GET_SIZES_ERROR,
    PRODUCT_GET_SIZES_REQUEST, PRODUCT_GET_SIZES_SUCCESS,
    PRODUCT_LIST_ERROR,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_SAVE_ERROR,
    PRODUCT_SAVE_REQUEST,
    PRODUCT_SAVE_SUCCESS,
    SAVE_PRODUCT_REVIEW_ERROR,
    SAVE_PRODUCT_REVIEW_REQUEST,
    SAVE_PRODUCT_REVIEW_SUCCESS
} from "../constants/productConstants";
import axios from 'axios'


const listProducts = (category='', searchKeyword = '', sortOrder = '',
                      all=false, sizes = '', colors = '',
                      minPrice = 0, maxPrice = 0) => async (dispatch, getState) => {
    try{
        dispatch({type: PRODUCT_LIST_REQUEST})
        const {userSignIn: {userInfo}} = getState()
        if(all){
            const {data} = await axios.get('http://localhost:5000/api/products/all?category=' +
                category +
                '&searchKeyword=' +
                searchKeyword +
                '&sortOrder=' +
                sortOrder +  '&sizes=' +
                sizes +  '&colors=' +
                colors +  '&minprice=' +
                minPrice +  '&maxprice=' +
                maxPrice, {
                    headers: {
                        'Authorization': 'Bearer ' + userInfo.token
                    }
                }
            )
            dispatch({type:  PRODUCT_LIST_SUCCESS, payload: data})
        }else {
            const {data} = await axios.get('http://localhost:5000/api/products?category=' +
                category +
                '&searchKeyword=' +
                searchKeyword +
                '&sortOrder=' +
                sortOrder + '&sizes=' +
                sizes +  '&colors=' +
                colors +  '&minprice=' +
                minPrice +  '&maxprice=' +
                maxPrice
            )
            dispatch({type:  PRODUCT_LIST_SUCCESS, payload: data})
        }


    }catch (e) {
        if (e.response && e.response.data) {
            dispatch({type: PRODUCT_LIST_ERROR, payload: e.response.data.message})
        }
    }
}

const getProduct = (productId) => async (dispatch) => {
    try{
        dispatch({type: PRODUCT_DETAIL_REQUEST, payload: productId})
        const {data} = await axios.get('http://localhost:5000/api/products/' + productId)
        dispatch({type:  PRODUCT_DETAIL_SUCCESS, payload: data})

    }catch (e) {
        if (e.response && e.response.data) {
            dispatch({type: PRODUCT_DETAIL_ERROR, payload: e.response.data.message})
        }
    }
}


const saveProduct = (product) => async(dispatch, getState) => {
    try{
        const {userSignIn: {userInfo}} = getState()
        dispatch({type: PRODUCT_SAVE_REQUEST, payload: product})
        if(product._id) {
            const {data} = await axios.put('http://localhost:5000/api/products/' + product._id, product, {
                headers: {
                    'Authorization': 'Bearer ' + userInfo.token
                }
            })
            dispatch({type: PRODUCT_SAVE_SUCCESS, payload: data})
        }else{
            const {data} = await axios.post('http://localhost:5000/api/products', product, {
                headers: {
                    'Authorization': 'Bearer ' + userInfo.token
                }
            })
            dispatch({type: PRODUCT_SAVE_SUCCESS, payload: data})
        }

    }catch (e) {
        if (e.response && e.response.data) {
            dispatch({type: PRODUCT_SAVE_ERROR, payload: e.response.data.message})
        }
    }
}

const deleteProduct = (productId) => async (dispatch, getState) => {
    try{
        const {userSignIn: {userInfo}} = getState()
        dispatch({type: PRODUCT_DELETE_REQUEST, payload: productId})
        const {data} = await axios.delete('http://localhost:5000/api/products/' + productId, {
            headers: {
                'Authorization': 'Bearer ' + userInfo.token
            }
        })
        dispatch({type: PRODUCT_DELETE_SUCCESS, payload: data})
    }catch (e) {
        if (e.response && e.response.data) {
            dispatch({type: PRODUCT_DELETE_ERROR, payload: e.response.data.message})
        }
    }
}

const saveProductReview = (productId, review) => async (dispatch, getState) => {
    try{
        const {userSignIn: {userInfo}} = getState()
        dispatch({type: SAVE_PRODUCT_REVIEW_REQUEST, payload: productId})
        const {data} = await axios.post('http://localhost:5000/api/products/' + productId + '/reviews', review,{
            headers: {
                'Authorization': 'Bearer ' + userInfo.token
            }
        })
        dispatch({type: SAVE_PRODUCT_REVIEW_SUCCESS, payload: data})
    }catch (e) {
        dispatch({type: SAVE_PRODUCT_REVIEW_ERROR, payload: e.message})
    }
}

const getColors = () => async (dispatch) => {
    try{
        dispatch({type: PRODUCT_GET_COLORS_REQUEST})
        const {data} = await axios.get('http://localhost:5000/api/products/colors')
        dispatch({type: PRODUCT_GET_COLORS_SUCCESS, payload: data})
    }catch (e) {
        if (e.response && e.response.data) {
            dispatch({type: PRODUCT_GET_COLORS_ERROR, payload: e.response.data.message})
        }
    }
}

const getSizes = () => async (dispatch) => {
    try{
        dispatch({type: PRODUCT_GET_SIZES_REQUEST})
        const {data} = await axios.get('http://localhost:5000/api/products/sizes')
        dispatch({type: PRODUCT_GET_SIZES_SUCCESS, payload: data})
    }catch (e) {
        if (e.response && e.response.data) {
            dispatch({type: PRODUCT_GET_SIZES_ERROR, payload: e.response.data.message})
        }
    }
}

export {listProducts, getProduct, saveProduct, deleteProduct, saveProductReview, getColors, getSizes}
