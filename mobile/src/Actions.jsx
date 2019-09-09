
import C from './Constants'

export const esi = payload => dispatch => {
 dispatch({payload, type: C.ESI})
 return Promise.resolve(payload)
}

export const imsi = payload => dispatch => {
  dispatch({payload, type: C.IMSI})
  return Promise.resolve(payload)
}

export const msisdn = payload => dispatch => {
  dispatch({payload, type: C.MSISDN})
  return Promise.resolve(payload)
}

export const sms = payload => dispatch => {
  dispatch({payload, type: Array.isArray(payload) ? C.SMS.ALL : C.SMS.SINGLE})
  return Promise.resolve(payload)
}

export const step = payload => dispatch => {
  dispatch({payload, type: C.STEP})
  return Promise.resolve(payload)
}

export const ussd = payload => dispatch => {
  dispatch({payload, type: C.USSD})
  return Promise.resolve(payload)
}

export default {
  esi,
  imsi,
  msisdn,
  sms,
  step,
  ussd,
}
