
import C from './constants'
import {DELETE, GET, POST, PUT} from './fetch'

const error = (dispatch, err) => {
  dispatch({payload: err.message || err, type: C.ERROR})
  return Promise.reject(err)
}

export const clearError = () => dispatch => dispatch({payload: null, type: C.ERROR})

// Responder

export const deleteResponder = id => dispatch => {
  return DELETE('/responder', {query: {id}})
    .catch(err => error(dispatch, err))
}

export const getResponder = (limit, skip) => dispatch => {
  return GET('/responder', {query: {limit, skip}})
    .then(res => {
      console.log(res)
      dispatch({payload: res.result, type: C.RESPONDERS})
      return res.result
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

// Station

export const deleteStation = id => dispatch => {
  return DELETE('/station', {query: {id}})
    .catch(err => error(dispatch, err))
}

export const getStation = (limit, skip) => dispatch => {
  return GET('/station', {query: {limit, skip}})
    .then(res => {
      dispatch({payload: res.result, type: C.STATIONS})
      return res.result
    })
    .catch(err => error(dispatch, err))
}

export const postStation = data => dispatch => {
  return POST('/station', data)
    .catch(err => error(dispatch, err))
}

export const putStation = data => dispatch => {
  return PUT('/station', data)
    .catch(err => error(dispatch, err))
}

// User

export const deleteUser = id => dispatch => {
  return DELETE('/user', {query: {id}})
    .catch(err => error(dispatch, err))
}

export const getUser = (limit, skip) => dispatch => {
  return GET('/user', {query: {limit, skip}})
    .then(res => {
      dispatch({payload: res.result, type: C.USERS})
      return res.result
    })
    .catch(err => error(dispatch, err))
}

export const postUser = data => dispatch => {
  return POST('/user', data)
    .catch(err => error(dispatch, err))
}

export const putUser = data => dispatch => {
  return PUT('/user', data)
    .catch(err => error(dispatch, err))
}

export default {
  clearError,
  deleteResponder,
  getResponder,
  postResponder,
  putResponder,
  deleteStation,
  getStation,
  postStation,
  putStation,
  deleteUser,
  getUser,
  postUser,
  putUser,
}
