import * as actions from './actions';
import axios from 'axios';

const base = 'https://identitytoolkit.googleapis.com/v1/accounts:';
const key = '?key=AIzaSyB6ALB6ktWzd59D5rECC_2boQw8SbcTHWk';

export const authInit = () => {
  return {
    type: actions.AUTH_INIT,
  };
};

export const authSuccess = (id, token) => {
  return {
    type: actions.AUTH_SUCCESS,
    id: id,
    token: token,
  };
};

export const authFailure = (err) => {
  console.log('[action] ', err);
  return {
    type: actions.AUTH_FAILURE,
    error: err,
  };
};

export const auth = (email, password, isAuth) => {
  return (dispatch) => {
    dispatch(authInit());
    const user = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    const urlSignUp = base + 'signUp' + key;
    const urlSignIn = base + 'signInWithPassword' + key;
    let url = isAuth ? urlSignIn : urlSignUp;
    axios
      .post(url, user)
      .then((res) => {
        const expTime = new Date(new Date().getTime() + res.data.expiresIn * 1000);
        localStorage.setItem('token', res.data.idToken);
        localStorage.setItem('userId', res.data.locald);
        localStorage.setItem('expirationDate', expTime);
        dispatch(authSuccess(res.data.locald, res.data.idToken));
        dispatch(checkExpiryTime(res.data.expiresIn));
      })
      .catch((err) => {
        dispatch(authFailure(err.response.data.error));
      });
  };
};

export const setRedirect = (url) => {
  return {
    type: actions.SET_REDIRECT_PATH,
    path: url,
  };
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('localId');
  localStorage.removeItem('expirationDate');
  return {
    type: actions.AUTH_LOGOUT,
  };
};

export const checkAuthState = () => {
  return (dispatch) => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {
      const expTime = new Date(localStorage.getItem('expirationDate'));
      if ((expTime) => new Date()) {
        const user = localStorage.getItem('userId');
        dispatch(authSuccess(token, user));
        dispatch(checkExpiryTime((expTime.getTime() - new Date().getTime()) / 1000));
      } else {
        dispatch(logout());
      }
    }
  };
};

export const checkExpiryTime = (authTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, authTime * 1000);
  };
};
