import {_get} from './api';
import {Draw} from './draw';

const FEED = "/feed";

const mapDraws = (draws) => draws.map(d => Draw(d));

export function getFeed(page=0) {
    return _get(FEED, {
        query: `page=${page}`
    }).then(draws => draws ? mapDraws(draws) : []);
}

export function getHistory(page=0) {
    return _get(`${FEED}/history`, {
        query: `page=${page}`
    }).then(draws => draws ? mapDraws(draws) : []);
}

export function getBanners() {
    return _get(`${FEED}/banners`)
      .then(r => r ? r : [])
}