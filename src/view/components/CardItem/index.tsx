// Core
import React, { FC } from 'react';

// Tools
import { cn } from '@/tools/lib/utils';

// Elements
import { Button, Image, ImagePropTypes } from '@/view/elements';

// Styles
import S from './styles.module.css';
import { Icons } from '../Icons';

// Types
interface ImageOfCardItemPropTypes extends Pick<ImagePropTypes, 'src' | 'alt'> {
}

interface PropTypes extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    firstImage: ImageOfCardItemPropTypes;
    secondImage: ImageOfCardItemPropTypes;
    name: string;
    price: number;
    onClickEditItem: () => void;
}

export const CardItem: FC<PropTypes> = ({
    className,
    firstImage,
    secondImage,
    name,
    price,
    onClickEditItem,
    ...props
}) => {
    return (
        <div
            className = { cn(`${S.root} flex flex-col gap-1 relative
                sb:gap-3`, className) }
            { ...props }>


            <Button
                className = 'absolute top-0 right-0 z-[1] w-auto p-3'
                variant = 'outline'
                onClick = { onClickEditItem }>
                <Icons.EditItem />
            </Button>

            <div className = { `${S.images_container} relative overflow-hidden` }>
                <Image
                    alt = { firstImage.alt }
                    className = { `${S.first_image} w-full h-full` }
                    src = { firstImage.src }
                />
                <Image
                    alt = { secondImage.alt }
                    className = { `${S.second_image} w-full h-full` }
                    src = { secondImage.src }
                />
                bb
            </div>

            <div className = 'flex flex-col gap-1'>
                <p
                    className = { S.title }>
                    {name}
                </p>
                <span className = { S.price }>
                    {`${price} ₴`}
                </span>
            </div>

        </div>
    );
};
