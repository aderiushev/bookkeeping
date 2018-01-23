import { GET_CATEGORIES_LIST, CREATE_CATEGORY, UPDATE_CATEGORY, DELETE_CATEGORY } from '../constants/ActionTypes'

const initialState = {
    list: []
}

export default function categories(state = initialState, action) {
    switch (action.type) {
        case GET_CATEGORIES_LIST:
            return {
                ...state,
                list: action.data
            }
        case CREATE_CATEGORY:
            return {
                ...state,
                list: [
                    action.data,
                    ...state.list,
                ]
            }
        case UPDATE_CATEGORY:
            return {
                ...state,
                list: state.list.map(category => category.id === action.data.id ? { ...category, ...action.data.category } : category)
            }
        case DELETE_CATEGORY:
            return {
                ...state,
                list: state.list.filter(category => category.id !== action.data.id)
            }
        default:
            return state
    }
}