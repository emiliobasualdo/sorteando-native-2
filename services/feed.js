import {_get} from './api';

const FEED = "/feed";

export function getFeed({page} = {page:0}) {
    return _get(FEED, {
        query: `page=${page}`
    }).then(r => r ? r : {draws: []});
}

export function getBanners() {
    return _get(`${FEED}/banners`, {})
}