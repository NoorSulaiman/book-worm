import React from "react";
import PropTypes from "prop-types";
import { Card } from "semantic-ui-react";
import BookCard from "../cards/BookCard";

const BooksList = props => {
  const { books, submit, deleteBook } = props;
  const cards = () =>
    books.map(book => {
      const progress = Math.floor(book.progress / book.pages * 100);
      return (
        <BookCard
          key={book.goodreadsId}
          book={book}
          progress={progress}
          submit={submit}
          delete={deleteBook}
        />
      );
    });
  return <Card.Group>{cards()}</Card.Group>;
};

BooksList.propTypes = {
  books: PropTypes.array.isRequired,
  submit: PropTypes.func.isRequired,
  deleteBook: PropTypes.func.isRequired
};
export default BooksList;
