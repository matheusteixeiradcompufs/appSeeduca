import axios from 'axios';

const BASE_URL = 'http://192.168.0.113';

const api = axios.create({
    baseURL: BASE_URL
    // baseURL: 'http://127.0.0.1:8000'
});

export { api, BASE_URL };