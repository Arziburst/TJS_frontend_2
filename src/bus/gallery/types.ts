// Core
import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';

// Types
import * as commonTypes from '../commonTypes';

export type Image = {
    public_id: string;
    imageUrl: string;
};
export type Gallery = Array<Image>

// State
export type IsLoadings = 'gallery';
type IsLoadingsAdditional = 'delete';


type IsLoadingsAdditionalObject = {
    delete: commonTypes.IsLoading | string
}
export interface GalleryState extends commonTypes.State<
Record<IsLoadings, commonTypes.IsLoading> & IsLoadingsAdditionalObject> {
    gallery: null | Gallery
}

// Actions
export type SetIsLoadingOfGalleryAction = commonTypes.SetIsLoading<
IsLoadings | IsLoadingsAdditional, commonTypes.IsLoading | string>


// Contracts
export type BaseContact<T = any> = CaseReducer<GalleryState, PayloadAction<T>>

export type SetIsLoadingOfGalleryContact = BaseContact<SetIsLoadingOfGalleryAction>;
