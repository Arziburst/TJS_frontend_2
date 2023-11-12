// Core
import { UseFormReset } from 'react-hook-form/dist/types';

// Types
export type IsLoading = boolean;
export type Error = {
    message: string;
    statusCode: number;
};

export type SetIsLoading<T = string, V = IsLoading> = {
    type: T;
    value: V;
}


export type State<TIsLoadings> = { // TIsLoadings = Record<string, IsLoading>
    isLoadings: TIsLoadings;
    error: null | Error;
}

export type ResetForm = {
    reset: UseFormReset<any>; // todo remove any
}
