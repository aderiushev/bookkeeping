import { INIT_CONSUMPTIONS, CREATE_CONSUMPTION, UPDATE_CONSUMPTION, DELETE_CONSUMPTION } from '../constants/ActionTypes'

let initialState = [];

export default function consumptions(state = initialState, action) {
    switch (action.type) {
        case INIT_CONSUMPTIONS:
            return action.consumptions;

        case CREATE_CONSUMPTION:
            return [
                action.lastRow,
                ...state
            ];

        case UPDATE_CONSUMPTION:
            return state.map(consumption =>
                consumption.id === action.consumption_id ? Object.assign({}, consumption, { sum: action.sum, comment: action.comment }) : consumption
            );

        case DELETE_CONSUMPTION:
            return state.filter(consumption =>
                consumption.id !== action.consumption_id
            );

        default:
            return state
    }
}