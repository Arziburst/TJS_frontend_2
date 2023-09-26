// Tools
import { useDispatch, useSelector } from '../../tools/hooks'; /* Typed selector */

// Slice
import { profileActions } from './slice';

// Types
import * as commonTypes from '../commonTypes';
import * as types from './types';

// MarkerGen middleware
import { useProfileSaga } from './saga'; /* Choose one technology, Saga or Thunk */

export const useProfile = () => {
    // MarkerGen api hook
    const profileSagas = useProfileSaga();  /* Saga api hook */

    const dispatch = useDispatch();
    const profile = useSelector((state) => state.profile);

    return {
        profile,
        setProfile:            (payload: types.Profile) => dispatch(profileActions.setProfile(payload)),
        setIsLoadingOfProfile: (
            payload: types.SetIsLoadingOfProfileAction,
        ) => dispatch(profileActions.setIsLoadingOfProfile(payload)),
        setErrorOfProfile: (payload: commonTypes.Error) => dispatch(profileActions.setErrorOfProfile(payload)), // todo need???
        resetProfile:      () => dispatch(profileActions.resetProfile()),
        ...profileSagas,
    };
};
