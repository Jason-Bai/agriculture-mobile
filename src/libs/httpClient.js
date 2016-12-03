import axios from 'axios'

import config from '../config'

import utils from './utils'

let httpClientWithoutToken = axios.create({
  baseURL: config.apiRoot,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json'
  }
})
,  httpClientWithToken = axios.create({
  baseURL: config.apiRoot,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
    'X-Auth-Token': utils.store.get('x-access-token')
  }
})


export const loginHttp = {
  login: (data) => {
    let configs = {
      data
    }
    return httpClientWithoutToken.post('/login', configs)
  },
  logout: () => {
    return httpClientWithToken.get('/logout')
  }
}

export const categoriesHttp = {
  list: (params) => {
    let configs = {
      params
    }
    return httpClientWithoutToken.get('/categories', configs)
  }
}
