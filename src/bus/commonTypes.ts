// Types
export type IsLoading = boolean;
export type Error = {
    message: string;
};

export type SetIsLoading<T = string> = {
    type: T;
    value: IsLoading;
}


export type State<TIsLoadings> = { // TIsLoadings = Record<string, IsLoading>
    isLoadings: TIsLoadings;
    error: null | Error;
}
