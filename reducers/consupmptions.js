import { GET_CONSUMPTIONS_LIST, CREATE_CONSUMPTION, UPDATE_CONSUMPTION, DELETE_CONSUMPTION } from '../constants/ActionTypes'

const initialState = {
    list: []
}

export default function consumptions(state = initialState, action) {
    switch (action.type) {
        case GET_CONSUMPTIONS_LIST:
            return {
                ...state,
                list: action.data
            }
        case CREATE_CONSUMPTION:
            return {
                ...state,
                list: [
                    action.data,
                    ...state.list,
                ]
            }
        case UPDATE_CONSUMPTION:
            return {
                ...state,
                list: state.list.map(consumption => consumption.id === action.data.id ? { ...consumption, ...action.data.consumption } : consumption)
            }
        case DELETE_CONSUMPTION:
            return {
                ...state,
                list: state.list.filter(consumption => consumption.id !== action.data.id)
            }
        default:
            return state
    }
}