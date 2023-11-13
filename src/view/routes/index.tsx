// Core
import React, { FC, Suspense } from 'react';
import { Loader2 } from 'lucide-react';

// Routes
import { Public } from './Public';
import { Private } from './Private';

// Bus
import { useTogglesRedux } from '../../bus/client/toggles';

export const Routes: FC = () => {
    const { togglesRedux: { isLoggedIn }} = useTogglesRedux();

    return (
        <Suspense fallback = {
            <div className = 'flex justify-center items-center'>
                <Loader2 className = 'mr-2 h-1/3 w-1/3 min-h-[50px] min-w-[50px] animate-spin stroke-quaternary' />
            </div>
        }>
            {
                isLoggedIn
                    ? <Private />
                    : <Public />
            }
        </Suspense>
    );
};
