import {
  FETCH_NEWS_SUCCESS,
  FETCH_NEWS_REQUEST,
  FETCH_NEWS_FAILURE
} from "../actions/actionTypes";

const initialState = {
  isFetching: false,
  data: [],
  error: null
};
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NEWS_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case FETCH_NEWS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.payload
      };
    case FETCH_NEWS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    default:
      return state;
  }
};
