import request from 'superagent';
import * as types from '../constants/ActionTypes';

export function getConsumptionsList() {
  return dispatch =>
    request('GET', '/api/consumptions').then((response) => {
      dispatch({
        type: types.GET_CONSUMPTIONS_LIST,
        data: response.body,
      });
    });
}

export function getCategoriesList() {
  return dispatch => request('GET', '/api/categories').then((response) => {
    dispatch({
      type: types.GET_CATEGORIES_LIST,
      data: response.body,
    });
  });
}

export function createConsumption({ category_id, sum, comment }) {
  return dispatch => request('POST', '/api/consumptions')
    .send({
      category_id,
      sum,
      comment,
    })
    .then(response => dispatch({
      type: types.CREATE_CONSUMPTION,
      data: response.body,
    }));
}

export function updateConsumption(id, consumption) {
  return dispatch => request('PUT', '/api/consumptions')
    .send({
      id,
      consumption,
    })
    .then(response => dispatch({
      type: types.UPDATE_CONSUMPTION,
      data: response.body,
    }));
}

export function updateCategory(id, category) {
  return dispatch => request('PUT', '/api/categories')
    .send({
      id,
      category,
    })
    .then(response => dispatch({
      type: types.UPDATE_CATEGORY,
      data: response.body,
    }));
}

export function deleteConsumption(consumptionId) {
  return dispatch => request('DELETE', '/api/consumptions')
    .send({
      id: consumptionId,
    })
    .then(response => dispatch({
      type: types.DELETE_CONSUMPTION,
      data: response.body,
    }));
}

export function createCategory({ name }) {
  return dispatch => request('POST', '/api/categories')
    .send({ name })
    .then(response => dispatch({
      type: types.CREATE_CATEGORY,
      data: response.body,
    }));
}


export function deleteCategory(categoryId) {
  return dispatch => request('DELETE', '/api/categories')
    .send({ id: categoryId })
    .then(response => dispatch({
      type: types.DELETE_CATEGORY,
      data: response.body,
    }));
}

export function getChartsData({ startDate, endDate }) {
  return (dispatch) => {
    dispatch({
      type: types.GET_CHARTS_DATA_REQUEST,
    });

    const requests = [
      new Promise(resolve => request('GET', '/api/report/category-consumption-sum')
        .query({ startDate: startDate.format('YYYY-MM-DD'), endDate: endDate.format('YYYY-MM-DD') })
        .then(resolve)),
      new Promise(resolve => request('GET', '/api/report/total-spent')
        .query({ startDate: startDate.format('YYYY-MM-DD'), endDate: endDate.format('YYYY-MM-DD') })
        .then(resolve)),
    ];

    return Promise.all(requests).then(([categoryConsumptionSum, totalSpent]) => {
      dispatch({
        type: types.GET_CHARTS_DATA_SUCCESS,
        payload: {
          categoryConsumptionSum: categoryConsumptionSum.body,
          totalSpent: totalSpent.body,
        },
      });
    }).catch(() => {
      dispatch({
        type: types.GET_CHARTS_DATA_ERROR,
      });
    });
  };
}

export function getGiphy() {
  return request('GET', 'https://api.giphy.com/v1/gifs/random').query({
    api_key: 'zoqSutNq1MM1UlaP6Xg6Hdl4IJ4dxxk6',
    tag: 'money',
    rating: 'G',
  });
}

