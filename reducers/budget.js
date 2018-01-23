import { GET_BUDGETS_LIST, GET_CURRENT_BUDGET, CREATE_BUDGET, UPDATE_BUDGET, DELETE_BUDGET } from '../constants/ActionTypes'

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
    case UPDATE_BUDGET:
        return {
            ...state,
            list: state.list.map(budget => budget.id === action.data.id ? { ...budget, ...action.data.budget } : budget)
        }
    case DELETE_BUDGET:
        return {
            ...state,
            list: state.list.filter(budget => budget.id !== action.data.id)
        }
    case CREATE_BUDGET:
      return {
          ...state,
          list: [
              action.data,
              ...state.list,
          ]
      }

    default:
      return state
  }
}