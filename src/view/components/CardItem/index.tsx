// Core
import React, { FC } from 'react';

// Tools
import { cn } from '@/tools/lib/utils';

// Components
import { Icons } from '../Icons';

// Elements
import { Button, Image, ImagePropTypes, Link, LinkPropTypes } from '@/view/elements';

// Styles
import S from './styles.module.css';

// Types
import { Profile } from '@/bus/profile/types';
interface ImageOfCardItemPropTypes extends Pick<ImagePropTypes, 'src' | 'alt'> {
}

interface PropTypes extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
    Pick<LinkPropTypes, 'to'>
{
    firstImage: ImageOfCardItemPropTypes;
    secondImage?: ImageOfCardItemPropTypes;
    name?: string;
    price: number;
    onClickEditItem: () => void;
    role: Profile['role'] | undefined;
}

export const CardItem: FC<PropTypes> = ({
    className,
    firstImage,
    secondImage,
    name,
    price,
    onClickEditItem,
    to,
    role,
    ...props
}) => {
    return (
        <div className = 'relative'>
            {role === 'admin' && (
                <Button
                    className = 'absolute top-0 right-0 z-[1] w-auto p-3'
                    variant = 'outline'
                    onClick = { onClickEditItem }>
                    <Icons.EditItem />
                </Button>
            )}

            <Link
                to = { to }
                variant = 'none'>
                <div
                    className = { cn(`${S.root} flex flex-col gap-1
                sb:gap-3`, className) }
                    { ...props }>


                    <div className = { `${S.images_container} relative overflow-hidden` }>
                        <Image
                            alt = { firstImage.alt }
                            className = { cn('w-full h-full', {
                                [ `${S.first_image}` ]: !!secondImage,
                            }) }
                            src = { firstImage.src }
                        />
                        {secondImage && (
                            <Image
                                alt = { secondImage.alt }
                                className = { `${S.second_image} w-full h-full` }
                                src = { secondImage.src }
                            />
                        )}
                    </div>

                    <div className = 'flex flex-col gap-1'>
                        {name && (
                            <p
                                className = { S.title }>
                                {name}
                            </p>
                        )}
                        <span className = { S.price }>
                            {`${price} ₴`}
                        </span>
                    </div>

                </div>
            </Link>
        </div>
    );
};
