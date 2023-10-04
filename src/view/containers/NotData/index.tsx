// Core
import React, { FC } from 'react';

// Types
interface PropTypes extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    count?: number;
    isLoading: boolean;
}

export const NotData: FC<PropTypes> = ({
    children,
    count = 1,
    isLoading,
    ...props
}) => {
    const childCount = React.Children.count(children);

    if (isLoading) {
        return (
            <div>
                Loading...
            </div>
        );
    }

    if (childCount < count) {
        return (
            <div>
                Not Data
            </div>
        );
    }

    return (
        <div { ...props }>
            {children}
        </div>
    );
};
