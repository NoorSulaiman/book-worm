import { createSelector } from 'reselect';
import { BOOKS_FETCHED, BOOK_CREATED, BOOK_DELETED } from '../types';
export default function books(state = {}, action = {}) {
    switch (action.type) {
        case BOOKS_FETCHED:
        case BOOK_CREATED:
            return { ...state, ...action.data.entities.books }
        case BOOK_DELETED:
            const id = action.data;
            delete state[id];
            return state;
        // return state.filter(book => book.goodreadsID !== bookId)
        default: return state;
    }
}

// Selectors

export const booksSelector = state => state.books;

export const allBooksSelector = createSelector(booksSelector, booksHash => Object.values(booksHash));