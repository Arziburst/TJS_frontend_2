// Core
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

// Tools
import { cn } from '@/tools/lib/utils';

// Elements
import { Button, Image, ImagePropTypes } from '@/view/elements';

// Styles
const variants = cva(
    `flex gap-[12px]
        sm:flex-col`,
    {
        variants: {
            variant: {
                big:   'sm:max-w-[160px] sb:max-w-[200px]',
                small: 'sb:max-w-[300px]',
            },
        },
        defaultVariants: {
            variant: 'small',
        },
    },
);

// Types
import { ExtendedProduct } from '@/bus/products/types';

export interface PropTypes
    extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof variants>, Pick<ImagePropTypes, 'src' | 'alt'> {
    product: ExtendedProduct;
    onClickRemove?: (product: ExtendedProduct) => void;
}

export const CardCart: React.FC<PropTypes> = ({
    className,
    variant,
    src,
    alt,
    product,
    onClickRemove,
    ...props
}) => {
    return (
        <div
            className = { cn(variants({ variant, className })) }
            { ...props }>
            <Image
                alt = { alt }
                className = { cn('rounded-[4px] aspect-square', {
                    'w-[120px] sm:w-[160px] sb:w-[200px]': variant === 'big',
                    'w-[80px]':                            variant === 'small',
                }) }
                src = { src }
            />
            <div className = 'grow flex flex-col gap-[8px]'>
                <h3 className = { cn(
                    'font-secondary font-bold tracking-[20%]',
                    {
                        'text-sm leading-[16px]': variant === 'big',
                        'text-xs leading-[18px]': variant === 'small',
                    },
                ) }>
                    {product.title}
                </h3>
                <div className = { cn('flex justify-between') }>
                    <p className = { cn(
                        'text-sm text-quaternary',
                    ) }>
                        {product.price} ₴
                    </p>
                    {variant === 'big' && (
                        <Button
                            className = 'w-auto text-xs text-quaternary underline hover:no-underline'
                            variant = 'default'
                            onClick = { () => onClickRemove && onClickRemove(product) }>
                            Remove
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};
