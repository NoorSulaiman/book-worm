import api from "../api";
import { userLoggedIn } from "./auth";
import setAuthorizationHeader from "../utils/setAuthorizationHeader";

export const signup = data => dispatch =>
  api.user.signup(data).then(user => {
    localStorage.bookwormJWT = user.token;
    setAuthorizationHeader(user.token);
    dispatch(userLoggedIn(user));
  });
