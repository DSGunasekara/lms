import { GET_USER, LOGIN, LOGOUT } from '../constants/constant';
import * as api from '../api/index.js';

//getting workshops
export const login = (credentials) => async (dispatch) => {
  try {
    const res = await api.login(credentials);
    dispatch({ type: LOGIN, payload: res.data });
    return {...res};
  } catch (error) {
    console.log('login error' + error);
    return {...error}
  }
};

export const getUser = () => (dispatch) => {
  try {
    dispatch({ type: GET_USER });
  } catch (error) {
    console.error(error);
  }
};

export const register = (user) => async (dispatch) => {
  try {
    const res = await api.register(user);
    return {...res}
  } catch (error) {
    console.error(error);
    return {...error}
  }
};

export const logout = () => (dispatch) => {
  try {
    dispatch({type: LOGOUT})
  } catch (error) {
    console.error(error);
  }
}
