import { loginHttp, categoriesHttp } from '../libs/httpClient'

import utils from '../libs/utils'

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

function requestLogin(creds) {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
  }
}

function receiveLogin(user) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    id_token: user.token
  }
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}

export function loginUser(creds) {
  return dispatch => {
    dispatch(requestLogin(creds))
    return loginHttp.login(creds)
      .then(response => {
        response.json()
          .then(user => ({user, response}))
          .then(({user, response}) => {
            if (!response.ok) {
              dispatch(loginError(user.message))
                return Promise.reject(user)
            } else {
              utils.store.set('x-access-token', user.token)
              dispatch(receiveLogin(user))
            }
          })
      }).catch(err => console.log('Error: ', err))
  }
}

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS= 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE= 'LOGOUT_FAILURE'


function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
  }
}

function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false
  }
}


export function logoutUser() {
  return dispatch => {
    dispatch(requestLogout())
    utils.store.remove('x-access-token')
    dispatch(receiveLogout())
  }
}

export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE'

export const resetErrorMessage = () => ({
  type: RESET_ERROR_MESSAGE
})

export const CATEGORY_REQUEST = 'CATEGORY_REQUEST'
export const CATEGORY_SUCCESS = 'CATEGORY_SUCCESS'
export const CATEGORY_FAILURE = 'CATEGORY_FAILURE'

function requestCategories() {
  return {
    type: CATEGORY_REQUEST,
    isFetching: true,
    errorMessage: '',
    data: [],
    total_num: 0
  }
}

function receiveCategories(categories) {
  return {
    type: CATEGORY_SUCCESS,
    isFetching: false,
    errorMessage: '',
    data: categories.data,
    total_num: categories.total_num
  }
}

function categoriesError(message) {
  return {
    type: CATEGORY_FAILURE,
    isFetching: false,
    errorMessage: message
  }
}

export function loadCategories(params = {}) {
  return dispatch => {
    dispatch(requestCategories(params))
    return categoriesHttp.list(params)
      .then(response => {
        const { data } = response
        dispatch(receiveCategories(data))
      }).catch(err => {
        const { data } = err
        dispatch(categoriesError(data.message))
      })
  }
}
