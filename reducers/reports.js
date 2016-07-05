import { INIT_BUDGET, SET_BUDGET } from '../constants/ActionTypes'

let initialState = {};

export default function budget(state = initialState, action) {
    switch (action.type) {
        case INIT_BUDGET:
            return action.budget;

        default:
            return state
    }
}