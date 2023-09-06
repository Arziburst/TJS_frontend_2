// Config of API
import { API, HEADERS } from './config';

// Types
import * as types from '../bus/profile/saga/types';

export const registrationProfileFetcher = (body: types.FetchRegistrationProfileRequest) => {
    return fetch(API.PROFILE.REGISTRATION, {
        method:      'POST',
        credentials: 'include',
        headers:     {
            ...HEADERS,
        },
        body: JSON.stringify(body),
    });
};

export const LoginProfileFetcher = ({ email, password }: types.FetchLoginProfileRequest) => {
    return fetch(API.PROFILE.LOGIN, {
        method:      'POST',
        credentials: 'include',
        headers:     {
            ...HEADERS,
            Authorization: `Basic ${email}:${password}`,
        },
    });
};
