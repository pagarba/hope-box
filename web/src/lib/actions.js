
import C from './constants'
import {DELETE, GET, POST, PUT} from './fetch'

const error = (dispatch, err) => {
  dispatch({payload: err.message || err, type: C.ERROR})
}

export const deleteResponder = id => dispatch => {
  return DELETE('/responder', {query: {id}})
    .catch(err => error(dispatch, err))
}

export const getResponder = (limit, skip) => dispatch => {
  return GET('/responder', {query: {limit, skip}})
    .then(res => {
      dispatch({payload: res.result, type: C.RESPONDERS})
      return res
    })
    .catch(err => error(dispatch, err))
}

export const postResponder = data => dispatch => {
  return POST('/responder', data)
    .catch(err => error(dispatch, err))
}

export const putResponder = data => dispatch => {
  return PUT('/responder', data)
    .catch(err => error(dispatch, err))
}

export default {
  deleteResponder,
  getResponder,
  postResponder,
  putResponder,
}
