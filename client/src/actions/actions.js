import * as a from "./actionTypes";
import axiosInstance from "../fixtures/axiosInstance";
import axios from 'axios'

export const fetchRequest = () => ({
  type: a.FETCH_NEWS_REQUEST
});

export const fetchNews = () => dispatch => {
  dispatch({
    type: a.FETCH_NEWS_REQUEST
  });

  axios
    .get("/news")
    .then(response => {
      if (response.status === 200) {
        dispatch({
          type: a.FETCH_NEWS_SUCCESS,
          payload: response.data
        });
      }
    })
    .catch(error => {
      dispatch({
        type: a.FETCH_NEWS_FAILURE,
        error: error.message
      });
    });
};

export const signUp = (user, cb) => dispatch => {
  dispatch({
    type: a.CREATE_USER_REQUEST
  });

  try {
    const sendData = async () => {
      const res = await axiosInstance.post(`/users`, { ...user });
      console.log(res)
      if(res.status === 201) {
        dispatch({
          type: a.CREATE_USER_SUCCESS,
          payload: res.data
        });
        cb()
      } else if (res.status === 400) {
        dispatch({
          type: a.CREATE_USER_FAILURE,
          error: res.data
        });
      }
    };
    sendData();
  } catch (e) {
    dispatch({
      type: a.CREATE_USER_FAILURE,
      error: e
    });
  }
};

export const login = (user, cb) => dispatch => {
  dispatch({
    type: a.LOGIN_REQUEST
  });

  axiosInstance
    .post(`/users/login`, {
      ...user
    })
    .then(response => {
      if (response.status === 200) {
        dispatch({
          type: a.LOGIN_SUCCESS,
          payload: response.data
        });
        cb()
      } else if (response.status === 400) {
        console.log(response)
        dispatch({
          type: a.LOGIN_FAILURE,
          error: response.data
        });
      }
    })
    .catch(error => {
      dispatch({
        type: a.LOGIN_FAILURE,
        error
      });
    });

};

export const logout = token => dispatch => {
  try {
    const sendData = async () => {
      await axios.post(
        "/users/logout",
        {},
        {
          headers: {
            Authorization: "Bearer " + token
          }
        }
      );
      dispatch({
        type: a.LOGOUT_SUCCESS
      });
    };
    sendData();
  } catch (e) {
    dispatch({
      type: a.LOGOUT_FAILURE,
      error: e
    });
  }
};
