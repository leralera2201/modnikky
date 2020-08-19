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
    SAVE_PRODUCT_REVIEW_RESET,
    SAVE_PRODUCT_REVIEW_SUCCESS
} from "../constants/productConstants";


const productListReducer = (state = {products: []}, action) => {
    switch(action.type){
        case PRODUCT_LIST_REQUEST:
            return {loading: true, products: []}
        case PRODUCT_LIST_SUCCESS:
            return {loading: false, products: action.payload}
        case PRODUCT_LIST_ERROR:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}
const productColorsReducer = (state = {colors: []}, action) => {
    switch(action.type){
        case PRODUCT_GET_COLORS_REQUEST:
            return {loading: true, colors: []}
        case PRODUCT_GET_COLORS_SUCCESS:
            return {loading: false, colors: action.payload}
        case PRODUCT_GET_COLORS_ERROR:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

const productSizesReducer = (state = {sizes: []}, action) => {
    switch(action.type){
        case PRODUCT_GET_SIZES_REQUEST:
            return {loading: true, sizes: []}
        case PRODUCT_GET_SIZES_SUCCESS:
            return {loading: false, sizes: action.payload}
        case PRODUCT_GET_SIZES_ERROR:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

const productDetailReducer = (state = {product: {reviews: []}}, action) => {
    switch(action.type){
        case PRODUCT_DETAIL_REQUEST:
            return {loading: true}
        case PRODUCT_DETAIL_SUCCESS:
            return {loading: false, product: action.payload}
        case PRODUCT_DETAIL_ERROR:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}



const productSaveReducer = (state={}, action) => {
    switch (action.type){
        case PRODUCT_SAVE_REQUEST:
            return {
                loading: true
            }
        case PRODUCT_SAVE_SUCCESS:
            return {
                loading: false,
                product: action.payload,
                success: true
            }
        case PRODUCT_SAVE_ERROR:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state

    }
}

const productDeleteReducer = (state={}, action) => {
    switch (action.type){
        case PRODUCT_DELETE_REQUEST:
            return {
                loading: true
            }
        case PRODUCT_DELETE_SUCCESS:
            return {
                loading: false,
                product: action.payload,
                success: true
            }
        case PRODUCT_DELETE_ERROR:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state

    }
}

const productSaveReviewReducer = (state={}, action) => {
    switch (action.type){
        case SAVE_PRODUCT_REVIEW_REQUEST:
            return {
                loading: true
            }
        case SAVE_PRODUCT_REVIEW_SUCCESS:
            return {
                loading: false,
                review: action.payload,
                success: true
            }
        case SAVE_PRODUCT_REVIEW_ERROR:
            return {
                loading: false,
                error: action.payload
            }
        case SAVE_PRODUCT_REVIEW_RESET:
            return {}
        default:
            return state

    }
}


export {productListReducer, productDetailReducer, productSaveReducer, productDeleteReducer, productSaveReviewReducer, productColorsReducer, productSizesReducer}
