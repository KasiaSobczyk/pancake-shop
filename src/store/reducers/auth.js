import * as actions from '../actions/actions';
import { reducerHelper } from '../helper';

const initialState = {
  id: null,
  token: null,
  loading: false,
  error: null,
};

const authInit = (state, action) => {
  return reducerHelper(state, { loading: true, error: null });
};

const authFailure = (state, action) => {
  return reducerHelper(state, { loading: false, error: action.error });
};

const authLogout = (state, action) => {
  return reducerHelper(state, { id: null, token: null });
};

const authSuccess = (state, action) => {
  return reducerHelper(state, {
    id: action.id,
    token: action.token,
    loading: false,
    error: null,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.AUTH_INIT: return authInit(state, action);
    case actions.AUTH_FAILURE: return authFailure(state, action);
    case actions.AUTH_SUCCESS: return authSuccess(state, action);
    case actions.AUTH_LOGOUT: return authLogout(state, action);
    default: return state;
  }
};

export default reducer;
