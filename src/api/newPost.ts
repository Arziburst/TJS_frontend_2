// Config of API
import { API } from './config';

// Types
import * as types from '../bus/newPost/saga/types';

export const getCitiesNewPostCartFetcher = (payload: types.FetchCitiesNewPostRequest) => {
    return fetch(API.NEW_POST, {
        method: 'POST',
        body:   JSON.stringify({
            apiKey:           process.env.API_KEY_NEW_POST,
            modelName:        'Address',
            calledMethod:     'getCities',
            Limit:            100,
            Page:             1,
            methodProperties: {
                FindByString: payload,
            },
        }),
    });
};
