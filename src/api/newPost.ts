// Config of API
import { API } from './config';

// Types
import * as types from '../bus/newPost/saga/types';

export const getCitiesNewPostFetcher = (payload: types.FetchCitiesNewPostRequest) => {
    return fetch(API.NEW_POST, {
        method: 'POST',
        body:   JSON.stringify({
            apiKey:           process.env.API_KEY_NEW_POST,
            modelName:        'Address',
            calledMethod:     'getCities',
            Page:             '1',
            Limit:            '100',
            methodProperties: {
                FindByString: payload,
            },
        }),
    });
};

export const getWarehousesNewPostFetcher = (payload: types.FetchWarehousesNewPostRequest) => {
    return fetch(API.NEW_POST, {
        method: 'POST',
        body:   JSON.stringify({
            apiKey:           process.env.API_KEY_NEW_POST,
            modelName:        'Address',
            calledMethod:     'getWarehouses',
            methodProperties: {
                CityName: payload.cityName,
                // CityRef:  payload.cityRef,
                Page:     '1',
                Limit:    '100',
                Language: 'UA',
            },
        }),
    });
};
