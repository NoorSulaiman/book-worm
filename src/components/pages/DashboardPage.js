import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchBooks, progress, deleteBook } from '../../actions/books';
import ConfirmEmailMessage from "../messages/ConfirmEmailMessage";
import { allBooksSelector } from '../../reducers/books';
import AddBooks from '../ctas/AddBooks';
import BooksList from '../templates/BooksList';


class DashboardPage extends React.Component {

  componentDidMount = () => {
    this.onInit(this.props)
  }


  onInit = (props) => props.fetchBooks();

  submit = (data) => this.props.progress(data).then(() => this.onInit(this.props))

  deleteBook = (data) => this.props.deleteBook(data).then(setTimeout(() => this.onInit(this.props), 300))



  render() {
    const { isConfirmed, books } = this.props;



    return (
      <div>

        {!isConfirmed && <ConfirmEmailMessage />}

        {books.length === 0 ? <AddBooks /> : <BooksList
          books={books}
          submit={this.submit}
          deleteBook={this.deleteBook}
        />
        }
      </div >
    );
  }
}

DashboardPage.propTypes = {
  isConfirmed: PropTypes.bool.isRequired,
  books: PropTypes.array.isRequired,
  fetchBooks: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    isConfirmed: !!state.user.confirmed,
    books: allBooksSelector(state)
  };
}

export default connect(mapStateToProps, { fetchBooks, progress, deleteBook })(DashboardPage);
