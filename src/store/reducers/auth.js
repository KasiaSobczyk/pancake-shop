import * as actions from '../actions/actions';
import { updateObjHelper } from '../../shared/helper';

const initialState = {
  id: null,
  token: null,
  loading: false,
  error: null,
  redirectPath: '/'
};

const authInit = (state, action) => {
  return updateObjHelper(state, { loading: true, error: null });
};

const authFailure = (state, action) => {
  return updateObjHelper(state, { loading: false, error: action.error });
};

const authLogout = (state, action) => {
  return updateObjHelper(state, { id: null, token: null });
};

const authSuccess = (state, action) => {
  return updateObjHelper(state, {
    id: action.id,
    token: action.token,
    loading: false,
    error: null,
  });
};

const setRedirectPath = (state, action) => {
  return updateObjHelper(state, { redirectPath: action.path });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.AUTH_INIT: return authInit(state, action);
    case actions.AUTH_FAILURE: return authFailure(state, action);
    case actions.AUTH_SUCCESS: return authSuccess(state, action);
    case actions.AUTH_LOGOUT: return authLogout(state, action);
    case actions.SET_REDIRECT_PATH: return setRedirectPath(state, action);
    default: return state;
  }
};

export default reducer;
