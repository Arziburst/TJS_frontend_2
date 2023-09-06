// Core
import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';

// Types
import * as commonTypes from '../commonTypes';

// Types of Entities
export type Profile = Array<any>

// State
export type IsLoadings = 'profile';
export interface ProfileState extends commonTypes.State<Record<IsLoadings, commonTypes.IsLoading>> {
    profile: null | Profile
}

// Actions
export type SetIsLoadingOfProfileAction = commonTypes.SetIsLoading<IsLoadings>

// Contracts
export type BaseContact<T = any> = CaseReducer<ProfileState, PayloadAction<T>>

export type SetIsLoadingOfProfileContact = BaseContact<SetIsLoadingOfProfileAction>;
