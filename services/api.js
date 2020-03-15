import axios from 'axios';
import { server } from './../settings';

// Set config defaults when creating the instance
const _axios = axios.create({
    baseURL: server
});

let jwt;
export const setJwt = (jwtToken) => {
    jwt = jwtToken;
    _axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
};
export const jwtIsPresent = () => !!jwt;

export const _get = (endpoint, { query } = {}) => {
    query = query? "?"+query : "";
    console.log(`GET: ${endpoint}${query}`);
    return _axios.get(`${endpoint}${query}`).then(r=> r.data);
};

export const _post = (endpoint, { query="", body } = {}) => {
    query = query? "?"+query : "";
    console.log(`POST: ${endpoint}${query} and body = ${JSON.stringify(body)}`);
    return _axios.post(`${endpoint}${query}`, body).then(r=> r.data);
};

export const _delete = (endpoint, { query="" } = {}) => {
    query = query? "?"+query : "";
    console.log(`DELETE: ${endpoint}${query}`);
    return _axios.delete(`${endpoint}${query}`).then(r=> r.data);
};

