import { SET_LOG_IN, SET_LOG_OUT, SET_MESSAGE, SET_USER } from './actionTypes';
import axios from 'axios'

export function sendRegister(data) {
  return async dispatch => {
    const req = await axios({
      method: 'POST',
      url: '/api/auth/register',
      data: {
        email: data.email,
        password: data.password
      },
      validateStatus: false
    })
    if(!req.data.success) {
      return dispatch(setMessage({message: 'Неверные данные при регистрации', color: 'danger'}))
    }
    dispatch(setMessage({message: req.data.message, color: 'success'}))
    dispatch(sendLogin({email: data.email, password: data.password}))
  }
}

export function sendLogin(data) {
  return async dispatch => {
    const req = await axios({
      method: 'POST',
      url: '/api/auth/login',
      data: {
        email: data.email,
        password: data.password
      },
      validateStatus: false
    })
    if(!req.data.success) {
      return dispatch(setMessage({message: 'Неверные данные при регистрации', color: 'danger'}))
    }
    localStorage.setItem('token', req.data.token)
    dispatch(setLogIn())
    console.log(req)
  }
}

export function getMe() {
  return async dispatch => {
    const token = localStorage.getItem('token')
    const req = await axios({
      method: 'get',
      url: '/api/users/me',
      headers: {
        authorization: `Bearer ${token}`
      },
      validateStatus: false
    })
    if(!req.data.success) {
      return localStorage.removeItem('token')
    }
    dispatch(setLogIn())
    dispatch(setUser(req.data.data))
  }
}

export function setLogIn() {
  return {
    type: SET_LOG_IN,
    payload: {
      loading: true
    }
  }
}

export function setUser(user) {
  return {
    type: SET_USER,
    payload: {
      user
    }
  }
}

export function setLogOut() {
  localStorage.removeItem('token')
  return {
    type: SET_LOG_OUT,
    payload: {
      loading: false,
      user: null
    }
  }
}

export function setMessage(data) {
  return {
    type: SET_MESSAGE,
    payload: {
      message: data.message,
      color: data.color
    }
  }
}