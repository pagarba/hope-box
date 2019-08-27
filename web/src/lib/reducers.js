
import C from './constants'

/* Init - Start */

const toObject = (id, type) => {
  const posNeg = () => Math.random() >= 0.5 ? 1 : -1
  const lat = C.LATITUDE + (Math.random() * 0.01) + 0.001
  const lon = C.LONGITUDE + (Math.random() * (0.01 * posNeg()))

  return {
    bts: `${Math.floor((Math.random() * 5) + 1)}`,
    esi: `${Math.floor(Math.random() * 5)}`,
    id,
    imsi: `${Math.floor((Math.random() * 999999999999999) + 100000000000000)}`,
    latitude: lat,
    longitude: lon,
    msisdn: `${Math.floor((Math.random() * 99999) + 10000)}`,
    name: `${type} ${id}`,
  }
}

const _responders = []
for(let id = 1; id <= 10; id++) {
  _responders.push(toObject(id, 'responders'))
}

const _stations = []
for(let id = 100; id <= 105; id++) {
  _stations.push(toObject(id, 'stations'))
}

const _users = []
for(let id = 200; id <= 300; id++) {
  _users.push(toObject(id, 'users'))
}

/* Init - End */

export const error = (state = null, {payload, type}) => {
  if (type === C.ERROR) {
    return payload
  }
  return state
}

export const responders = (state = _responders, {payload, type}) => {
  switch(type) {
    case C.RESPONDERS:
      return [...payload]
    default:
      return state
  }
}

export const settings = (state = {}, {payload, type}) => {
  switch(type) {
    case C.SETTINGS:
      return {...payload}
    default:
      return state
  }
}

export const stations = (state = _stations, {payload, type}) => {
  switch(type) {
    case C.STATIONS:
      return [...payload]
    default:
      return state
  }
}

export const users = (state = _users, {payload, type}) => {
  switch(type) {
    case C.USERS:
      return [...payload]
    default:
      return state
  }
}

export default {
  error,
  responders,
  settings,
  stations,
  users
}
