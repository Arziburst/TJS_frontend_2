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

const Cart: FC<PropTypes> = () => {
    return (
        <div>
            Page: Cart
        </div>
    );
};

export default () => (
    <ErrorBoundary>
        <Cart />
    </ErrorBoundary>
);
