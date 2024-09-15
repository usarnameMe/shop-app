export const SET_AUTHENTICATING = 'SET_AUTHENTICATING';
export const SET_AUTH_STATUS = 'SET_AUTH_STATUS';

export const setAuthenticating = (isAuthenticating: boolean) => ({
  type: SET_AUTHENTICATING,
  payload: isAuthenticating
});

export const setAuthStatus = (status: { success: boolean; message: string } | null) => ({
  type: SET_AUTH_STATUS,
  payload: status
});
