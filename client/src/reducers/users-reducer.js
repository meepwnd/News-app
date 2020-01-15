import {
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE
} from "../actions/actionTypes";

const initialState = {
  data: {},
  isFetching: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_USER_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case CREATE_USER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.payload,
        error: ''
      };
    case CREATE_USER_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        error: action.error
      }
    case LOGOUT_SUCCESS:
      return {
        ...state,
        data: {}
      };
    case LOGOUT_FAILURE:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};
