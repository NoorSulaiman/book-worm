import React, { Component } from "react";
import PropTypes from "prop-types";
import { Segment } from "semantic-ui-react";
import { connect } from "react-redux";
import { searchBooks, fetchPages, createBook } from "../../actions/books";
import SearchBookForm from "../forms/SearchBookForm";
import BookForm from "../forms/BookForm";

class NewBookPage extends Component {
  state = {
    book: null
  };

  onBookSelect = book => {
    this.setState({ book });
    this.props
      .fetchPages(book.goodreadsId)
      .then(res => res.data.pages)
      .then(pages => this.setState({ book: { ...book, pages } }));
  };

  search = query => this.props.searchBooks(query);

  addBook = book =>
    this.props
      .createBook(book)
      .then(() => this.props.history.push("/dashboard"));

  render() {
    return (
      <Segment>
        <h1>Add book to your collection</h1>
        <SearchBookForm search={this.search} onBookSelect={this.onBookSelect} />
        {this.state.book && (
          <BookForm submit={this.addBook} book={this.state.book} />
        )}
      </Segment>
    );
  }
}

NewBookPage.propTypes = {
  searchBooks: PropTypes.func.isRequired,
  createBook: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }),
  fetchPages: PropTypes.func.isRequired
};

export default connect(null, { searchBooks, fetchPages, createBook })(
  NewBookPage
);
