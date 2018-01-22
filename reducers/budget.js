import { GET_BUDGETS_LIST, SET_BUDGET } from '../constants/ActionTypes'

let initialState = {
  list: []
};

export default function budget(state = initialState, action) {
    switch (action.type) {
        case GET_BUDGETS_LIST:
            return action.data;

        case SET_BUDGET:
            return action.lastRow;

        default:
            return state
    }
}