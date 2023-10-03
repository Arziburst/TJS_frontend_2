// Core
import React, { FC } from 'react';

// Components
import { Select } from '@/view/components';

// Types
export type SelectShopPropTypes = {
    label: string;
    value: null | string;
    showValue: null | string;
    items: string[];
    setValue: (value: string) => void;
    placeholder?: string;
    onClick?: (item: string) => void;
}

export const SelectShop: FC<SelectShopPropTypes> = ({
    label,
    value,
    showValue,
    items,
    setValue,
    placeholder,
    onClick,
}) => {
    return (
        <div className = 'flex flex-col gap-[10px]'>
            <p className = 'text-sm text-[15px] font-secondary font-semibold opacity-50'>
                {label}
            </p>
            <Select.Root
                value = { value || '' }
                onValueChange = { setValue }>
                <Select.SelectTrigger
                    isArrow
                    className = 'capitalize'
                    variant = 'ghost'>
                    <Select.SelectValue
                        aria-label = { value || '' }
                        className = 'text=[15px]'>
                        {showValue || placeholder}
                    </Select.SelectValue>
                </Select.SelectTrigger>
                <Select.SelectContent variant = 'outline'>
                    {items.map((item) => (
                        <Select.SelectItem
                            className = 'py-2 px-3 capitalize'
                            key = { item }
                            value = { item }
                            onClick = { () => onClick && onClick(item) }>
                            {item}
                        </Select.SelectItem>
                    ))}
                </Select.SelectContent>
            </Select.Root>
        </div>
    );
};
