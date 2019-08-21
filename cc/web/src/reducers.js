
import C from './constants'

export const responders = (state = [], {payload, type}) => {
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

export const stations = (state = [], {payload, type}) => {
  switch(type) {
    case C.STATIONS:
      return [...payload]
    default:
      return state
  }
}

export const users = (state = [], {payload, type}) => {
  switch(type) {
    case C.USERS:
      return [...payload]
    default:
      return state
  }
}

export default {
  responders,
  settings,
  stations,
  users
}
