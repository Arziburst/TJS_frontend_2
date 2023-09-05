// Types
export type IsLoading = boolean;
export type Error = {
    message: string;
};


export type State = {
    isLoading: IsLoading;
    error: null | Error;
}

export const commonInitialState: State = {
    isLoading: false,
    error:     null,
};
