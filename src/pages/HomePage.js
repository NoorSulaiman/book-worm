import React from "react";
import PropTypes from "prop-types";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions/auth";
import "./styles/homepage.css";

const guestID =
  Math.random()
    .toString(36)
    .substring(2, 15) +
  Math.random()
    .toString(36)
    .substring(2, 15);
const guestCredentials = {
  email: `guest${guestID}@guest.com`,
  password: guestID
};

const HomePage = props => {
  const { isAuthenticated, logout, guestLogin } = props;

  return (
    <div id="homePageContainer">
      <h1 id="appTitle">Book Worm</h1>
      {isAuthenticated ? (
        <Button id="logout" onClick={() => logout()}>
          Logout
        </Button>
      ) : (
        <div id="loginLinksContainer">
          <Button as={Link} className="navLink" to="/login">
            Login
          </Button>
          <Button as={Link} className="navLink" to="/signup">
            Sign Up
          </Button>
          <Button
            onClick={() =>
              guestLogin(guestCredentials).then(() =>
                props.history.push("/dashboard")
              )
            }
            as={Link}
            className="navLink"
            to="/"
          >
            Try the app!
          </Button>
        </div>
      )}
      <p id="description">
        This app is for book lovers.<br /> It uses Goodreads API for books
        search.<br />
        Users can add books to there favorites <br /> and track the reading
        progress.
      </p>
    </div>
  );
};

HomePage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  guestLogin: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.token
  };
}

export default connect(mapStateToProps, {
  logout: actions.logout,
  guestLogin: actions.guestLogin
})(HomePage);
