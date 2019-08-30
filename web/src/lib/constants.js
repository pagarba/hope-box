
let origin = window.location.origin
if (origin === 'http://localhost:3000') {
  origin = 'http://192.168.0.166:4000' //'http://localhost:4000'
}

export const API_HOST = origin

export default {
  API_HOST,
  CONTENT_TYPE: 'application/json',
  ERROR: 'ERROR',
  LATITUDE: 34.0522342,
  LONGITUDE: -118.2436849,
  RESPONDERS: 'RESPONDERS',
  SETTINGS: 'SETTINGS',
  STATIONS: 'STATIONS',
  USERS: 'USERS',
  ZOOM: 15,
}
