import { _get } from './api';

const endpoint = "/draw";

export function getDraw(id){
    return _get(`${endpoint}/${id}`, {})
}

export function getWinner(id) {
    return _get(`${endpoint}/${id}/winner`, {})
}