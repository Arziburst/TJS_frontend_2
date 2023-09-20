// Core
import React, { FC } from 'react';

// Components
import { ErrorBoundary } from '../../components';

// Elements

// Styles

const Root: FC = () => {
    return (
        <div>
            1
        </div>
    );
};

export default () => (
    <ErrorBoundary>
        <Root />
    </ErrorBoundary>
);
