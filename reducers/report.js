import { GET_CHARTS_DATA_SUCCESS } from '../constants/ActionTypes';

const initialState = {

};

export default function report(state = initialState, action) {
  switch (action.type) {
    case GET_CHARTS_DATA_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
