import * as actions from './actions';

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
  return {
    type: actions.AUTH_FAILURE,
    error: err,
  };
};

export const auth = (email, password, isAuth) => {
  return {
    type: actions.AUTH_USER,
    email: email,
    password: password,
    isAuth: isAuth,
  };
};

export const setRedirect = (url) => {
  return {
    type: actions.SET_REDIRECT_PATH,
    path: url,
  };
};

export const logout = () => {
  return {
    type: actions.AUTH_LOGOUT_INIT,
  };
};

export const logoutSuccess = () => {
  return {
    type: actions.AUTH_LOGOUT,
  };
};

export const checkAuthState = () => {
  return {
    type: actions.AUTH_CHECK_STATE,
  };
};

export const checkExpiryTime = (authTime) => {
  return {
    type: actions.AUTH_TIMEOUT,
    authTime: authTime,
  };
};
