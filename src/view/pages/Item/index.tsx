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

const Item: FC<PropTypes> = () => {
    return (
        <div>
            Page: Item
        </div>
    );
};

export default () => (
    <ErrorBoundary>
        <Item />
    </ErrorBoundary>
);
