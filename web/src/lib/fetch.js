
import C from './constants'

const getDataOrError = res => {
  return res.json()
    .then(data => {
      if (!res.ok || res.status < 200 || res.status > 399) {
        console.log('Fetch Error:', res, data)
        throw new Error(data.error || res.statusText || res)
      }
      return data
    })
}

const getQuery = opts => {
  if (!opts.query) return ''

  let s = ''
  for(let [k, v] of Object.entries(opts.query)) {
    s += `${k}=${encodeURIComponent(v)}&`
  }
  if (s.substr(s.length - 1) === '&') {
    s = s.substr(0, s.length - 1)
  }
  return s
}

const request = (route, opts) => {
  opts = {
    ...opts,
    headers: {
      'Accept': C.CONTENT_TYPE,
      'Authorization': 'Bearer NONE',
      'Content-Type': C.CONTENT_TYPE,
    }
  }
  route = `${C.API_HOST}${route}`

  const query = getQuery(opts)
  if (query !== '') {
    delete opts['query']
    route += `?${query}`
  }

  return fetch(route, opts).then(getDataOrError)
}

export const DELETE = (route, opts = {}) => {
  opts.method = 'DELETE'
  return request(route, opts)
}

export const GET = (route, opts = {}) => {
  opts.method = 'GET'
  return request(route, opts)
}

export const POST = (route, data, opts = {}) => {
  opts.body = data ? JSON.stringify(data) : null
  opts.method = 'POST'
  return request(route, opts)
}

export const PUT = (route, data, opts = {}) => {
  opts.body = data ? JSON.stringify(data) : null
  opts.method = 'PUT'
  return request(route, opts)
}

export default {
  DELETE,
  GET,
  POST,
  PUT
}
