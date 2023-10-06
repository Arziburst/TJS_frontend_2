// Core
import React, { FC } from 'react';

// Assets
import { SCREENS_NUMBER } from '@/assets';

// Tools
import { cn } from '@/tools/lib/utils';
import { useWindowWidth } from '@/tools/hooks';

// Elements
import { Button } from '@/view/elements';

// Static
import { calculateTotalPages, createPageList, ellipsis } from './static';

// Types
import { ExtendedProduct } from '@/bus/products/types';

interface PropTypes extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
{
    array: null | [] | ExtendedProduct[];
    value: number;
    limit: number;
    setValue: React.Dispatch<React.SetStateAction<number>>;
}

export const Pagination: FC<PropTypes> = ({
    value,
    limit,
    setValue,
    className,
    array,
    ...props
}) => {
    const [ width ] = useWindowWidth();

    // const maxValue = (Array.isArray(array) && array.length) || 0;
    const maxStep: number = Array.isArray(array) ? calculateTotalPages({
        array,
        limit,
    }) : 0;

    if (maxStep <= 1) {
        return null;
    }

    return (
        <div
            { ...props }
            className = { cn('flex justify-between', className) }>
            <div>
                <Button
                    disabled = { value <= 1 }
                    variant = 'default'
                    onClick = { () => setValue((prev) => prev - 1) }>
                    {'<'}
                </Button>
            </div>
            {array && width > SCREENS_NUMBER.SB && (
                <div className = 'flex gap-3'>
                    {createPageList({
                        array,
                        currentStep: value,
                        limit,
                    }).map((numberStep, index) => (
                        <Button
                            className = { cn(
                                'p-2',
                                {
                                    'text-quaternary': numberStep === value,
                                },
                            ) }
                            disabled = { numberStep === ellipsis }
                            key = { `${numberStep}-${index}` }
                            variant = 'default'
                            onClick = { () => setValue(Number(numberStep)) }>
                            {numberStep}
                        </Button>
                    ))}
                </div>
            )}
            {width < SCREENS_NUMBER.SB && (
                <div>
                    {value < 10 ? `0${value}` : value} OF {maxStep < 10 ? `0${maxStep}` : maxStep}
                </div>
            )}
            <div>
                <Button
                    disabled = { value >= maxStep }
                    variant = 'default'
                    onClick = { () => setValue((prev) => prev + 1) }>
                    {'>'}
                </Button>
            </div>
        </div>
    );
};
