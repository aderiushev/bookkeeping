import { INIT_MONTHLY_CHART, INIT_MONTHLY_TABLE, INIT_MONTHLY_BY_CATEGORY, INIT_BUDGET_CHART } from '../constants/ActionTypes'

let initialState = {
    monthlyChart: null,
    monthlyTable: null,
    monthlyByCategory: null,
    budgetChart: null
};

export default function reports(state = initialState, action) {
    switch (action.type) {
        case INIT_MONTHLY_CHART:
            return {
                ...state,
                monthlyChart: action.data
            };
        case INIT_MONTHLY_TABLE:
            return {
                ...state,
                monthlyTable: action.data
            };
        case INIT_MONTHLY_BY_CATEGORY:
            return {
                ...state,
                monthlyByCategory: action.data
            };
        case INIT_BUDGET_CHART:
            return {
                ...state,
                budgetChart: action.data
            };
        default:
            return state
    }
}