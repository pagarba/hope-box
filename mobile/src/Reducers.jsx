
import C from './Constants'
import {combineReducers} from 'redux'

const esi = (state = 0, {payload, type}) => {
  if (type === C.ESI) return payload
  return state
}

const imsi = (state = 0, {payload, type}) => {
  if (type === C.IMSI) return payload
  return state
}

const msisdn = (state = 0, {payload, type}) => {
  if (type === C.MSISDN) return payload
  return state
}

const sms = (state = [], {payload, type}) => {
  if (type === C.SMS.ALL) {
    return [...payload]
  } else if (type === C.SMS.SINGLE) {
    return [...state, {...payload}]
  }
  return state
}

const step = (state = 0, {payload, type}) => {
  if (type === C.STEP) return payload
  return state
}

const ussd = (state = 0, {payload, type}) => {
  if (type === C.USSD) return payload
  return state
}

export default combineReducers({
  esi,
  imsi,
  msisdn,
  sms,
  step,
  ussd,
})
