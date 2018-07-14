import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ConfirmEmailMessage from "../messages/ConfirmEmailMessage";
import { allBooksSelector } from '../../reducers/books';
import AddBooks from '../ctas/AddBooks';

const DashboardPage = ({ isConfirmed, books }) => (
  <div>
    {!isConfirmed && <ConfirmEmailMessage />}
    {books.length === 0 && <AddBooks />}
  </div>
);

DashboardPage.propTypes = {
  isConfirmed: PropTypes.bool.isRequired,
  books: PropTypes.shape({
    title: PropTypes.string.isRequired
  }).isRequired
};

function mapStateToProps(state) {
  return {
    isConfirmed: !!state.user.confirmed,
    books: allBooksSelector(state)
  };
}

export default connect(mapStateToProps)(DashboardPage);
