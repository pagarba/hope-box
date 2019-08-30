
import C from './constants'
import {DELETE, GET, POST, PUT} from './fetch'

const error = (dispatch, err) => {
  dispatch({payload: err.message || err, type: C.ERROR})
  return Promise.reject(err)
}

export const clearError = () => dispatch => dispatch({payload: null, type: C.ERROR})
export const setError = payload => dispatch => dispatch({payload, type: C.ERROR})

// Responder

export const deleteResponder = id => dispatch => {
  clearError()
  return DELETE('/responder', {query: {id}})
    .catch(err => error(dispatch, err))
}

export const getResponder = (limit, skip) => dispatch => {
  clearError()
  return GET('/responder', {query: {limit, skip}})
    .then(res => {
      dispatch({payload: res.result, type: C.RESPONDERS})
      return res.result
    })
    .catch(err => error(dispatch, err))
}

export const postResponder = data => dispatch => {
  clearError()
  return POST('/responder', data)
    .catch(err => error(dispatch, err))
}

export const putResponder = data => dispatch => {
  clearError()
  return PUT('/responder', data)
    .catch(err => error(dispatch, err))
}

// Settings

export const getSettings = (limit, skip) => dispatch => {
  clearError()
  return GET('/settings', {query: {limit, skip}})
    .then(res => {
      dispatch({payload: res.result, type: C.SETTINGS})
      return res.result
    })
    .catch(err => error(dispatch, err))
}

export const putSettings = data => dispatch => {
  clearError()
  return PUT('/settings', data)
    .catch(err => error(dispatch, err))
}

// Station

export const deleteStation = id => dispatch => {
  clearError()
  return DELETE('/station', {query: {id}})
    .catch(err => error(dispatch, err))
}

export const getStation = (limit, skip) => dispatch => {
  clearError()
  return GET('/station', {query: {limit, skip}})
    .then(res => {
      dispatch({payload: res.result, type: C.STATIONS})
      return res.result
    })
    .catch(err => error(dispatch, err))
}

export const postStation = data => dispatch => {
  clearError()
  return POST('/station', data)
    .catch(err => error(dispatch, err))
}

export const putStation = data => dispatch => {
  clearError()
  return PUT('/station', data)
    .catch(err => error(dispatch, err))
}

// User

export const deleteUser = id => dispatch => {
  clearError()
  return DELETE('/user', {query: {id}})
    .catch(err => error(dispatch, err))
}

export const getUser = (limit, skip) => dispatch => {
  clearError()
  return GET('/user', {query: {limit, skip}})
    .then(res => {
      dispatch({payload: res.result, type: C.USERS})
      return res.result
    })
    .catch(err => error(dispatch, err))
}

export const postUser = data => dispatch => {
  clearError()
  return POST('/user', data)
    .catch(err => error(dispatch, err))
}

export const putUser = data => dispatch => {
  clearError()
  return PUT('/user', data)
    .catch(err => error(dispatch, err))
}

export default {
  clearError,
  setError,
  deleteResponder,
  getResponder,
  postResponder,
  putResponder,
  getSettings,
  putSettings,
  deleteStation,
  getStation,
  postStation,
  putStation,
  deleteUser,
  getUser,
  postUser,
  putUser,
}
