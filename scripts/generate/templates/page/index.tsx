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

const __pageName__(pascalCase): FC<PropTypes> = () => {
    return (
        <div>
            Page: __pageName__(pascalCase)
        </div>
    );
};

export default () => (
    <ErrorBoundary>
        <__pageName__(pascalCase) />
    </ErrorBoundary>
);
