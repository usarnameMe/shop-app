import { SET_AUTHENTICATING, SET_AUTH_STATUS } from '../actions/authActions';

const initialState = {
  isAuthenticating: false,
  authStatus: null
};

export default function authReducer(state = initialState, action: any) {
  switch (action.type) {
    case SET_AUTHENTICATING:
      return {
        ...state,
        isAuthenticating: action.payload
      };
    case SET_AUTH_STATUS:
      return {
        ...state,
        authStatus: action.payload
      };
    default:
      return state;
  }
}
