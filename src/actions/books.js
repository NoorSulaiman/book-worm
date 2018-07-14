import api from "../api";

export const searchBooks = query => () => api.books.searchBooks(query)