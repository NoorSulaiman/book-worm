import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SignupForm from "../components/forms/SignupForm";
import { signup } from "../actions/users";

const SignupPage = props => {
  const submit = data =>
    props.signup(data).then(() => props.history.push("/dashboard"));

  return (
    <div id="signupPageContainer">
      <h1>Signup</h1>
      <SignupForm submit={submit} />
    </div>
  );
};

SignupPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  signup: PropTypes.func.isRequired
};

export default connect(null, { signup })(SignupPage);
