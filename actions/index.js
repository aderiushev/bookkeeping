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
  return (dispatch) => {
    return request('POST', '/api/consumptions')
      .send({
        category_id,
        sum,
        comment
      })
      .then(response => {
        dispatch({
          type: types.CREATE_CONSUMPTION,
          data: response.body
        })
    })
  }
}

export function updateConsumption(id, consumption) {
  return (dispatch) => {
    return request('PUT', '/api/consumptions')
      .send({
        id,
        consumption
      })
      .then(response => {
        dispatch({
          type: types.UPDATE_CONSUMPTION,
          data: response.body
        })
    })
  }
}

export function updateCategory(id, category) {
  return (dispatch) => {
    return request('PUT', '/api/categories')
      .send({
        id,
        category
      })
      .then(response => {
        dispatch({
          type: types.UPDATE_CATEGORY,
          data: response.body
        })
    })
  }
}

export function deleteConsumption(consumptionId) {
  return (dispatch) => {
    return request('DELETE', '/api/consumptions')
      .send({
        id: consumptionId
      })
      .then(response => {
        dispatch({
          type: types.DELETE_CONSUMPTION,
          data: response.body
        })
    })
  }
}

export function createCategory({ name }) {
  return (dispatch) => {
    return request('POST', '/api/categories')
      .send({
        name
      })
      .then(response => {
        dispatch({
          type: types.CREATE_CATEGORY,
          data: response.body
        })
    })
  }
}


export function deleteCategory(categoryId) {
  return (dispatch) => {
    return request('DELETE', '/api/categories')
      .send({
        id: categoryId
      })
      .then(response => {
        dispatch({
          type: types.DELETE_CATEGORY,
          data: response.body
        })
    })
  }
}


export function getMonthlyChart({ startDate, endDate }) {
  return (dispatch) => {
    return request('GET', '/api/monthly-chart')
      .query({ startDate: startDate.format('YYYY-MM-DD'), endDate: endDate.format('YYYY-MM-DD')  })
      .then(response => {
        dispatch({
          type: types.INIT_MONTHLY_CHART,
          data: {
            columns: [{ label: 'Date', type: 'string' }].concat(response.body.columns),
            rows: response.body.rows
          }
        })
    })
  }
}

export function getMonthlyTable({ startDate, endDate }) {
  return (dispatch) => {
    return request('GET', '/api/monthly-table')
      .query({ startDate: startDate.format('YYYY-MM-DD'), endDate: endDate.format('YYYY-MM-DD')  })
      .then(response => {
        dispatch({
          type: types.INIT_MONTHLY_TABLE,
          data: response.body
        })
    })
  }
}


export function getMonthlyByCategory({ startDate, endDate }) {
  return (dispatch) => {
    return request('GET', '/api/monthly-by-category')
      .query({ startDate: startDate.format('YYYY-MM-DD'), endDate: endDate.format('YYYY-MM-DD')  })
      .then((response) => {
        dispatch({
          type: types.INIT_MONTHLY_BY_CATEGORY,
          data: response.body,
        });
    });
  }
}

export function getGiphy() {
  return request('GET', 'https://api.giphy.com/v1/gifs/random')
    .query({
      api_key: 'zoqSutNq1MM1UlaP6Xg6Hdl4IJ4dxxk6',
      tag: 'money',
      rating: 'G',
    })
}

