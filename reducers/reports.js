import { INIT_MONTHLY_CHART } from '../constants/ActionTypes'

let initialState = {
    monthlyChart: null
};

export default function reports(state = initialState, action) {
    switch (action.type) {
        case INIT_MONTHLY_CHART:
            return {
                ...state,
                monthlyChart: action.data
            };

        default:
            return state
    }
}