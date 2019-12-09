import { MAIN_URL } from './config';

export const api = {
    get token () {
        return localStorage.getItem('token');
    },

    auth: {
        signin (username) {
            return fetch(`${MAIN_URL}/signin`, {
                method:  'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(username),
            });
        },
        authenticate () {
            return fetch(`${MAIN_URL}/user/login`, {
                method:  'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: this.token }),
            });
        },
    }
};
