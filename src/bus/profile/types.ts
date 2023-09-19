// Core
import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';

// Types
import * as commonTypes from '../commonTypes';

// Types of Entities
export type Profile = {
    email: string;
    name: string,
    phone: string,
    role: string,
}

// State
export type IsLoadings = 'profile' | 'logout';
export interface ProfileState extends commonTypes.State<Record<IsLoadings, commonTypes.IsLoading>> {
    profile: null | Profile
}

// Actions
export type SetIsLoadingOfProfileAction = commonTypes.SetIsLoading<IsLoadings>

// Contracts
export type BaseContact<T = any> = CaseReducer<ProfileState, PayloadAction<T>>

export type SetIsLoadingOfProfileContact = BaseContact<SetIsLoadingOfProfileAction>;
