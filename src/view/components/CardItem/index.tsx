// Core
import React, { FC } from 'react';

// Tools
import { cn } from '@/tools/lib/utils';

// Elements
import { Image, ImagePropTypes } from '@/view/elements';

// Styles
import S from './styles.module.css';

// Types
interface ImageOfCardItemPropTypes extends Pick<ImagePropTypes, 'src' | 'alt'> {
}

interface PropTypes extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    firstImage: ImageOfCardItemPropTypes;
    secondImage: ImageOfCardItemPropTypes;
    name: string;
    price: number;
}

export const CardItem: FC<PropTypes> = ({
    className,
    firstImage,
    secondImage,
    name,
    price,
    ...props
}) => {
    return (
        <div
            className = { cn(`${S.root} flex flex-col gap-1 
                sb:gap-3`, className) }
            { ...props }>

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
