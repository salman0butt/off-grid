import axios from 'axios';
import store from '../store';

const http = axios.create({
    baseURL: window.location.origin,
    headers: {
        'Content-Type': 'application/json'
    },
});

const token = localStorage.getItem('token') || '';
http.defaults.headers.common['Authorization'] = token;

http.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && [401].includes(error.response.status) ) {
            // Handle 401 response here
            handleTokenExpiration();
        }
        return Promise.reject(error);
    }
);

function handleTokenExpiration() {
    store.dispatch('logout');
}



export default http;
