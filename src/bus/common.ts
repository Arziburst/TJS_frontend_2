// Types
import * as commonTypes from './commonTypes';

export const commonInitialState: Omit<commonTypes.State<{}>, 'isLoadings'> = { // todo need ????
    error: null,
};

export const setIsLoading = (
    state: any,
    action: any,
) => ({
    ...state,
    isLoadings: {
        ...state.isLoadings,
        [ action.payload.type ]: action.payload.value,
    },
});
