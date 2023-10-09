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

// Styles
import S from './styles.module.css';

// Types
import { ExtendedProduct } from '@/bus/products/types';
import { Icons } from '../Icons';

interface PropTypes extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
{
    array: null | [] | ExtendedProduct[];
    value: number;
    limit: number;
    setValue: React.Dispatch<React.SetStateAction<number>>;
    onClickDesktopNumber?: () => void;
}

export const Pagination: FC<PropTypes> = ({
    value,
    limit,
    setValue,
    className,
    array,
    onClickDesktopNumber,
    ...props
}) => {
    const [ width ] = useWindowWidth();

    const maxStep: number = Array.isArray(array) ? calculateTotalPages({
        array,
        limit,
    }) : 0;

    const onClickDesktopNumberHandler = (numberStep: string | number) => {
        setValue(Number(numberStep));
        onClickDesktopNumber && onClickDesktopNumber();
    };

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
                    <Icons.Arrow className = 'rotate-180' />
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
                            onClick = { () => onClickDesktopNumberHandler(numberStep) }>
                            <span className = { S.text }>
                                {numberStep}
                            </span>
                        </Button>
                    ))}
                </div>
            )}
            {width < SCREENS_NUMBER.SB && (
                <p className = { S.text }>
                    <span className = 'text-quaternary'>{value < 10 ? `0${value}` : value}</span> OF {maxStep < 10 ? `0${maxStep}` : maxStep}
                </p>
            )}
            <div>
                <Button
                    disabled = { value >= maxStep }
                    variant = 'default'
                    onClick = { () => setValue((prev) => prev + 1) }>
                    <Icons.Arrow />
                </Button>
            </div>
        </div>
    );
};
