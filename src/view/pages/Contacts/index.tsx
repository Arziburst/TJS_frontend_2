// Core
import React, { FC } from 'react';

// Bus
// import {} from '../../../bus/'

// Components
import { ErrorBoundary } from '../../components';

// Types
type PropTypes = {
    /* type props here */
}

const Contacts: FC<PropTypes> = () => {
    return (
        <div>
            Page: Contacts
        </div>
    );
};

export default () => (
    <ErrorBoundary>
        <Contacts />
    </ErrorBoundary>
);
