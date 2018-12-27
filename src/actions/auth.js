import { USER_LOGGED_IN, USER_LOGGED_OUT } from "../types";
import api from "../api";
import setAuthorizationHeader from "../utils/setAuthorizationHeader";

export const userLoggedIn = user => ({
  type: USER_LOGGED_IN,
  user
});

export const userLoggedOut = () => ({
  type: USER_LOGGED_OUT
});

export const guestLogin = credentials => dispatch =>
  api.user.guestLogin(credentials).then(guest => {
    localStorage.bookwormJWT = guest.token;
    setAuthorizationHeader(guest.token);
    dispatch(userLoggedIn(guest));

    setTimeout(() => {
      localStorage.removeItem("bookwormJWT");
      setAuthorizationHeader();
      dispatch(userLoggedOut());
    }, 10 * 60 * 1000);
  });

export const login = credentials => dispatch =>
  api.user.login(credentials).then(user => {
    localStorage.bookwormJWT = user.token;
    setAuthorizationHeader(user.token);
    dispatch(userLoggedIn(user));
  });

export const logout = () => dispatch => {
  localStorage.removeItem("bookwormJWT");
  setAuthorizationHeader();
  dispatch(userLoggedOut());
};

export const confirm = token => dispatch =>
  api.user.confirm(token).then(user => {
    localStorage.bookwormJWT = user.token;
    dispatch(userLoggedIn(user));
  });

export const reconfirm = email => () => api.user.reconfirm(email);

export const resetPasswordRequest = data => () =>
  api.user.resetPasswordRequest(data.email);

export const validateToken = token => () => api.user.validateToken(token);

export const updatePassword = data => () => api.user.updatePassword(data);
