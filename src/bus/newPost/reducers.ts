// Types
import * as types from './types';

export const setCitiesNewPost: types.BaseContact<types.NewPostState['cities']> = (state, action) => {
    return {
        ...state,
        cities: action.payload,
    };
};
