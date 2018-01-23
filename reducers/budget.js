import { GET_BUDGETS_LIST, GET_CURRENT_BUDGET, SET_BUDGET } from '../constants/ActionTypes'

const initialState = {
  list: [],
  current: {}
};

export default function budget(state = initialState, action) {
  switch (action.type) {
    case GET_BUDGETS_LIST:
      return {
        ...state,
        list: action.data
      }
    case GET_CURRENT_BUDGET:
      return {
        ...state,
        current: action.data
      }
    case SET_BUDGET:
      return {
        ...state,
        current: action.lastRow
      }

    default:
      return state
  }
}