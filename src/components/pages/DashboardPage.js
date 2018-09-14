import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchBooks } from '../../actions/books';
import ConfirmEmailMessage from "../messages/ConfirmEmailMessage";
import { allBooksSelector } from '../../reducers/books';
import AddBooks from '../ctas/AddBooks';


class DashboardPage extends React.Component {

  componentDidMount = () => this.onInit(this.props)
  onInit = (props) => props.fetchBooks();

  render() {
    const { isConfirmed, books } = this.props;
    return (
      <div>
        {!isConfirmed && <ConfirmEmailMessage />}

        {books.length === 0 && <AddBooks />}
      </div>
    );
  }
}

DashboardPage.propTypes = {
  isConfirmed: PropTypes.bool.isRequired,
  books: PropTypes.shape({
    title: PropTypes.string.isRequired
  }).isRequired,
  fetchBooks: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    isConfirmed: !!state.user.confirmed,
    books: allBooksSelector(state)
  };
}

export default connect(mapStateToProps, { fetchBooks })(DashboardPage);
