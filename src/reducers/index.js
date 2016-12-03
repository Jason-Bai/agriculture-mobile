import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS,
  CATEGORY_REQUEST, CATEGORY_SUCCESS, CATEGORY_FAILURE
} from '../actions'

import utils from '../libs/utils'

function auth(state = {
  isFetching: false,
  isAuthenticated: utils.store.get('x-access-token') ? true : false
}, action) {
  switch(action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        user: action.creds
      })
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        errorMessage: ''
      })
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message
      })
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false
      })
    default:
      return state
  }
}

function categories(state = {
  isFetching: false,
  data: [],
  total_num: 0,
  errorMessage: ''
}, action) {
  switch(action.type) {
    case CATEGORY_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case CATEGORY_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        data: action.data,
        total_num: action.total_num
      })
    case CATEGORY_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.message
      })
    default:
      return state
  }
}

export default combineReducers({
  auth,
  categories,
  routing
})
