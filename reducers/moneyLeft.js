import { UPDATE_MONEY_LEFT } from '../constants/ActionTypes'
import $ from 'jquery';

let initialState = 0;

export default function moneyLeft(state = initialState, action) {
    switch (action.type) {
        case UPDATE_MONEY_LEFT:
            return action.moneyLeft;

        default:
            return state
    }
}