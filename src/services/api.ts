import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.25.46'
    // baseURL: 'http://104.197.151.215'
});

export { api };