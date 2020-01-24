import { SET_LOG_IN, SET_LOG_OUT, SET_MESSAGE, SET_USER } from "../actions/actionTypes";

const initialState = {
  user: null,
  loged: false,
  message: null,
  color: null
}

export default function crypto(state = initialState, action) {
  switch (action.type) {
    case SET_LOG_IN:
      return {
        ...state,
        loged: true
      }
    case SET_LOG_OUT:
      return {
        ...state,
        loged: false
      }
    case SET_MESSAGE:
      return {
        ...state,
        message: action.payload.message,
        color: action.payload.color
      }
    case SET_USER:
      return {
        ...state,
        user: action.payload.user
      }
  
    default:
      return state;
  }
}