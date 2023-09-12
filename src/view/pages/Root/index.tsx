// Core
import React, { FC } from 'react';

// Components
import { ErrorBoundary } from '../../components';

// Elements
import { HelloBurst } from '@/view/elements';

// Styles
import { Container } from './styles';

const Root: FC = () => {
    return (
        <Container>
            {/* <Button variant = 'ghost'>default</Button> */}
            {/*
            <Button variant = 'destructive'>destructive</Button>
            <Button variant = 'outline'>outline</Button>
            <Button variant = 'secondary'>secondary</Button>
            <Button variant = 'ghost'>ghost</Button>
            <Button variant = 'link'>link</Button> */}
            <div className = 'p-4'>
                <div className = 'h-hull'>1</div>
            </div>
            <HelloBurst />
        </Container>
    );
};

export default () => (
    <ErrorBoundary>
        <Root />
    </ErrorBoundary>
);
