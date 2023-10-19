// Core
import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';

export type CityNewPost = {
    Area: string;
    AreaDescription: string;
    AreaDescriptionRu: string;
    CityID: string;
    Delivery1: string;
    Delivery2: string;
    Delivery3: string;
    Delivery4: string;
    Delivery5: string;
    Delivery6: string;
    Delivery7: string;
    Description: string;
    DescriptionRu: string;
    IsBranch: string;
    PreventEntryNewStreetsUser: string;
    Ref: string;
    SettlementType: string;
    SettlementTypeDescription: string;
    SettlementTypeDescriptionRu: string;
    SpecialCashCheck: number
}

type Department = unknown; // todo

// State
export type CitiesNewPost = Array<CityNewPost>;

export type NewPostState = {
    cities: CitiesNewPost | null;
    departments: Department | null;
}

// Contracts
export type BaseContact<T = any> = CaseReducer<NewPostState, PayloadAction<T>>
