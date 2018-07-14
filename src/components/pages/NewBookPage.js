import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { searchBooks } from '../../actions/books';
import SearchBookForm from '../forms/SearchBookForm';
import BookForm from '../forms/BookForm';

class NewBookPage extends Component {
    state = {
        book: null
    };

    onBookSelect = book => this.setState({ book });

    search = query => this.props.searchBooks(query);

    addBook = () => console.log('hi');

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
    searchBooks: PropTypes.func.isRequired
};

export default connect(null, { searchBooks })(NewBookPage);