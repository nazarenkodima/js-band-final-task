import { MAIN_URL } from './config';

export const api = {
  get token() {
    return localStorage.getItem('token');
  },

  auth: {
    signin(username) {
      return fetch(`${MAIN_URL}/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(username),
      });
    },
  },
  books: {
    fetch() {
      return fetch(`${MAIN_URL}/books`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${api.token}`,
        },
      });
    },
    viewBook(id) {
      return fetch(`${MAIN_URL}/books/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${api.token}`,
        },
      });
    },
  },
  cart: {
    purchase(id) {
      return fetch(`${MAIN_URL}/purchase`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${api.token}`,
        },
        body: JSON.stringify(id),
      });
    },
  },
};
