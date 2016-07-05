import { INIT_CATEGORIES, CREATE_CATEGORY, UPDATE_CATEGORY, DELETE_CATEGORY } from '../constants/ActionTypes'
import $ from 'jquery';

let initialState = [];

export default function categories(state = initialState, action) {
    switch (action.type) {
        case INIT_CATEGORIES:
            return action.categories;

        case CREATE_CATEGORY:
            return [
                action.lastRow,
                ...state
            ];

        case UPDATE_CATEGORY:
            return state.map(category =>
                category.id === action.category_id ? Object.assign({}, category, { name: action.name }) : category
            );

        case DELETE_CATEGORY:
            return state.filter(category =>
                category.id !== action.category_id
            );

        default:
            return state
    }
}