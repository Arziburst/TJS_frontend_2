// Core
import React, { FC, useEffect } from 'react';
import { toast } from 'react-toastify';

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
    onClickAddItemGalleryToManagementHandler: (event: any, image: ImageType) => void;
    selectedImages: (string | undefined)[];
    classNameTrigger?: string;
}

export const ModalAddImages: FC<PropTypes> = ({
    onClickAddItemGalleryToManagementHandler,
    selectedImages,
    classNameTrigger,
}) => {
    const {
        gallery: { gallery, isLoadings },
        onChangeInputGallery,
        fetchGallery,
        fetchDeleteItemOfGallery,
    } = useGallery();

    const onClickDeleteItemGalleryHandler = (event: any, image: ImageType) => {
        // eslint-disable-next-line no-alert
        const isConfirmed = window.confirm('ПОДТВЕРДИТЕ ПОЛНОЕ УДАЛЕНИЕ!');
        if (isConfirmed) {
            fetchDeleteItemOfGallery(image.public_id);
        }
    };

    const onClickAllItemsGalleryHandler = () => {
        // eslint-disable-next-line no-alert
        const isConfirmed = window.confirm('ПОДТВЕРДИТЕ ПОЛНОЕ УДАЛЕНИЕ!');
        if (isConfirmed) {
            if (gallery) {
                const Ids = gallery.map((image) => image.public_id);
                Ids.forEach((id) => {
                    fetchDeleteItemOfGallery(id);
                });
            } else {
                toast.error('Ошибка удаления');
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
                    Add images from the Gallery
                </Button>
            </Dialog.DialogTrigger>
            <Dialog.DialogContent className = 'max-h-screen overflow-x-scroll'>
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
                            Delete all images
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
                                    isLoading = { image.public_id === isLoadings.delete }
                                    variant = 'outline'
                                    onClick = {
                                        (event: any) => onClickDeleteItemGalleryHandler(event, image)
                                    }>
                                    remove
                                </Button>
                                <Button
                                    className = { cn('w-auto border-2 border-transparent', { 'border-quinary': selectedImages.includes(image.imageUrl) }) }
                                    variant = 'default'
                                    onClick = {
                                        (event: any) => onClickAddItemGalleryToManagementHandler(event, image)
                                    }>
                                    <Image
                                        alt = { `Image by URL ${image.imageUrl}` }
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
