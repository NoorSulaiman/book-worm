import React from 'react';
import { Card } from 'semantic-ui-react';
import BookCard from './BookCard';

class BooksList extends React.Component {

    cards = () => this.props.books.map(book => {
        let progress = Math.floor(book.progress / book.pages * 100);
        return <BookCard
            key={book.goodreadsId}
            book={book}
            progress={progress}
            submit={this.props.submit}
            delete={this.props.deleteBook}
        />
    })
    render() {
        return (
            <Card.Group>
                {this.cards()}
            </Card.Group>
        );
    }
};


export default BooksList;