// Core
import React, { FC, useEffect } from 'react';
import { toast } from 'react-toastify';
import { TFunction } from 'i18next';

// Tools
import { cn } from '@/tools/lib/utils';

// Bus
import { useGallery } from '@/bus/gallery';

// Components
import { Dialog } from '@/view/components';

// Elements
import {
    Button,
    Image,
} from '@/view/elements';

// Types
import { Image as ImageType } from '@/bus/gallery/types';

type PropTypes = {
    isLoading: boolean;
    t: TFunction;
    onClickAddItemGalleryToManagementHandler: (event: any, image: ImageType) => void;
    selectedImages: (string | undefined)[];
    classNameTrigger?: string;
}

export const ModalAddImages: FC<PropTypes> = ({
    isLoading,
    t,
    onClickAddItemGalleryToManagementHandler,
    selectedImages,
    classNameTrigger,
}) => {
    const {
        gallery: { gallery },
        onChangeInputGallery,
        fetchGallery,
        fetchDeleteItemOfGallery,
    } = useGallery();

    const onClickDeleteItemGalleryHandler = (event: any, image: ImageType) => {
        // eslint-disable-next-line no-alert
        const isConfirmed = window.confirm(t('pages.management.confirmCompleteDeletion'));
        if (isConfirmed) {
            fetchDeleteItemOfGallery(image.public_id);
        }
    };

    const onClickAllItemsGalleryHandler = () => {
        // eslint-disable-next-line no-alert
        const isConfirmed = window.confirm(t('pages.management.confirmCompleteDeletion'));
        if (isConfirmed) {
            if (gallery) {
                const Ids = gallery.map((image) => image.public_id);
                Ids.forEach((id) => {
                    fetchDeleteItemOfGallery(id);
                });
            } else {
                toast.error(t('pages.management.uninstallError'));
            }
        }
    };

    useEffect(() => {
        fetchGallery();
    }, []);

    return (
        <Dialog.Root>
            <Dialog.DialogTrigger
                asChild
                className = { cn('min-h-[132px] p-[20px]', { 'w-auto aspect-square': selectedImages.length > 0 }, classNameTrigger) }>
                <Button variant = 'outline'>
                    {t('pages.management.buttonAddImageFromGallery')}
                </Button>
            </Dialog.DialogTrigger>
            <Dialog.DialogContent className = 'max-h-screen overflow-x-auto'>
                <Dialog.DialogHeader>
                    <div>
                        <input
                            multiple
                            type = 'file'
                            onChange = { onChangeInputGallery }
                        />
                        {/* todo Альфа, может плоховато работать!!! */}
                        <Button
                            className = 'w-auto p-2'
                            title = 'Альфа, может плоховато работать!!!'
                            onClick = { onClickAllItemsGalleryHandler }>
                            {t('pages.management.buttonDeleteAllImages')}
                        </Button>
                    </div>
                </Dialog.DialogHeader>
                <Dialog.DialogFooter>
                    <div className = 'flex flex-wrap gap-3'>
                        {gallery?.map((image) => (
                            <div
                                className = 'relative flex flex-col gap-1'
                                key = { image.public_id }>
                                <Button
                                    className = 'w-auto'
                                    isLoading = { isLoading }
                                    variant = 'outline'
                                    onClick = {
                                        (event: any) => onClickDeleteItemGalleryHandler(event, image)
                                    }>
                                    {t('buttons.remove')}
                                </Button>
                                <Button
                                    className = { cn('w-auto border-2 border-transparent', { 'border-quinary': selectedImages.includes(image.imageUrl) }) }
                                    variant = 'default'
                                    onClick = {
                                        (event: any) => onClickAddItemGalleryToManagementHandler(event, image)
                                    }>
                                    <Image
                                        alt = { t('altImages.imageByURL', { url: image.imageUrl }) }
                                        className = 'h-24 aspect-square'
                                        src = { image.imageUrl }
                                    />
                                </Button>
                            </div>
                        ))}
                    </div>
                </Dialog.DialogFooter>
            </Dialog.DialogContent>
        </Dialog.Root>
    );
};
