import * as actions from '../actions/actions';
import reducer from './auth';

const initialState = {
  id: null,
  token: null,
  loading: false,
  error: null,
  redirectPath: '/',
};

describe('[Auth] reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should store the token upon login', () => {
    expect(reducer(initialState, { type: actions.AUTH_SUCCESS, id: 'id', token: 'token' })).toEqual(
      {
        id: 'id',
        token: 'token',
        loading: false,
        error: null,
        redirectPath: '/',
      }
    );
  });
});
