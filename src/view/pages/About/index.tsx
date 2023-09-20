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

const About: FC<PropTypes> = () => {
    return (
        <div>
            Page: About
        </div>
    );
};

export default () => (
    <ErrorBoundary>
        <About />
    </ErrorBoundary>
);
