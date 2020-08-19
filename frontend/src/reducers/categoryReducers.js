import {
    CATEGORY_DELETE_ERROR,
        CATEGORY_DELETE_REQUEST, CATEGORY_DELETE_SUCCESS,
        CATEGORY_LIST_ERROR,
        CATEGORY_LIST_REQUEST,
        CATEGORY_LIST_SUCCESS, CATEGORY_SAVE_ERROR,
        CATEGORY_SAVE_REQUEST, CATEGORY_SAVE_SUCCESS
} from "../constants/categoryConstants";

const categoryListReducer = (state = {categories: []}, action) => {
    switch(action.type){
        case CATEGORY_LIST_REQUEST:
            return {loading: true, categories: []}
        case CATEGORY_LIST_SUCCESS:
            return {loading: false, categories: action.payload}
        case CATEGORY_LIST_ERROR:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

const categorySaveReducer = (state={}, action) => {
    switch (action.type){
        case CATEGORY_SAVE_REQUEST:
            return {
                loading: true
            }
        case CATEGORY_SAVE_SUCCESS:
            return {
                loading: false,
                category: action.payload,
                success: true
            }
        case CATEGORY_SAVE_ERROR:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state

    }
}

const categoryDeleteReducer = (state={}, action) => {
    switch (action.type){
        case CATEGORY_DELETE_REQUEST:
            return {
                loading: true
            }
        case CATEGORY_DELETE_SUCCESS:
            return {
                loading: false,
                category: action.payload,
                success: true
            }
        case CATEGORY_DELETE_ERROR:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state

    }
}

export {categoryDeleteReducer, categoryListReducer, categorySaveReducer}
