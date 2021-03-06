import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Dropdown } from 'semantic-ui-react';

class SearchBookForm extends Component {
    state = {
        query: '',
        loading: false,
        options: [],
        books: {}
    }

    onSearchChange = (e, data) => {
        clearTimeout(this.timer);
        this.setState({
            query: data
        });

        this.timer = setTimeout(this.fetchOptions, 1000)
    };

    onChange = (e, data) => {
        this.setState({ query: data.value })
        this.props.onBookSelect(this.state.books[data.value])
    }

    fetchOptions = () => {
        if (!this.state.query) return;
        this.setState({ loading: true });
        this.props.search(this.state.query.searchQuery).then(books => {
            const options = []
            const booksHash = {}
            books.forEach(book => {
                booksHash[book.goodreadsId] = book;
                options.push({
                    key: book.goodreadsId,
                    value: book.goodreadsId,
                    text: book.title
                });
            });
            this.setState({ loading: false, options, books: booksHash })
        })

    }

    render() {
        return (
            <Form>
                <Dropdown
                    search
                    fluid
                    placeholder="search for a book by title"
                    value={this.state.query.searchQuery}
                    onSearchChange={this.onSearchChange}
                    options={this.state.options}
                    loading={this.state.loading}
                    onChange={this.onChange}
                />
            </Form>
        );
    }
}

SearchBookForm.propTypes = {
    search: PropTypes.func.isRequired,
    onBookSelect: PropTypes.func.isRequired
}
export default SearchBookForm;