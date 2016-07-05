import { INIT_BUDGET, SET_BUDGET } from '../constants/ActionTypes'
import $ from 'jquery';

let initialState = {};

export default function budget(state = initialState, action) {
    switch (action.type) {
        case INIT_BUDGET:
            return action.budget;

        case SET_BUDGET:
            return action.lastRow;

        default:
            return state
    }
}