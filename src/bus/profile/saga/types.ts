// Types
import * as types from '../types';

// Registration
export type FetchRegistrationProfileRequest = unknown;
export type FetchRegistrationProfileResponse = unknown;

// Login
export type FetchLoginProfileRequest = {
    email: string;
    password: string;
};
export type FetchLoginProfileResponse = unknown;
