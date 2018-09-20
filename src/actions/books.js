import api from "../api";
import { BOOKS_FETCHED, BOOK_CREATED, BOOK_DELETED } from '../types';
import { normalize } from 'normalizr';
import { bookSchema } from '../schemas';

const booksFetched = (data) => ({
    type: BOOKS_FETCHED,
    data
})

const bookCreated = (data) => ({
    type: BOOK_CREATED,
    data
})

const bookDeleted = (data) => ({
    type: BOOK_DELETED,
    data
})

export const searchBooks = query => () => api.books.searchBooks(query)
export const fetchPages = id => () => api.books.fetchPages(id)
export const fetchBooks = () => (dispatch) =>
    api.books.fetchAll().then(books => dispatch(booksFetched(normalize(books, [bookSchema]))))
export const createBook = (data) => (dispatch) =>
    api.books.create(data).then(book => dispatch(bookCreated(normalize(book, [bookSchema]))))
export const progress = (data) => () => api.books.progress(data)
export const deleteBook = (data) => (dispatch) => api.books.deleteBook(data).then(dispatch(bookDeleted(data.id)))