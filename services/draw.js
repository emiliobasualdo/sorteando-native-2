import { _get } from './api';

const endpoint = "/draw";

export function getDraw(id){
    return _get(`${endpoint}/${id}`)
      .then(draw => Draw(draw))
}


export function getWinner(id, withRetry= true) {
    return _get(`${endpoint}/${id}/winner`);
}

export function Draw(draw) {
  draw.end_date = new Date(draw.end_date);
  return draw;
}