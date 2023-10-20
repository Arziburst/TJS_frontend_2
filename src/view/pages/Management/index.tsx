// Core
import React, { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLocation, useNavigate, useParams } from 'react-router';

// Init
import { CATEGORIES_ITEMS } from '@/init';

// Tools
import { cn } from '@/tools/lib/utils';

// Bus
import { useGallery } from '@/bus/gallery';
import { useProducts } from '@/bus/products';

// Book
import { PARAMS_VALUES } from '@/view/routes/book';

// Components
import {
    ErrorBoundary,
    Form,
    Icons,
    Select,
} from '@/view/components';

// Elements
import {
    Button,
    FormTitle,
    Image,
    Input,
    Switch,
    Textarea,
} from '@/view/elements';

// Styles
import S from './styles.module.css';

// Static
import { validationForm, defaultValues, minLengthImages } from './static';
import { ModalAddImages } from './ModalAddImages';

// Types
import { Image as ImageType } from '@/bus/gallery/types';

type PropTypes = {
    /* type props here */
}

const Management: FC<PropTypes> = () => {
    const { id } = useParams<PARAMS_VALUES.ID>();
    const navigate = useNavigate();
    const location = useLocation();

    const isModeEdit = !!id;

    const { fetchGallery } = useGallery();
    const {
        products: { currentProduct, isLoadings },
        fetchProduct,
        fetchCreateNewProduct,
        fetchDeleteProduct,
        fetchEditProduct,
    } = useProducts();

    const form = useForm({
        resolver:      yupResolver(validationForm),
        defaultValues: isModeEdit ? currentProduct || defaultValues : defaultValues,
    });

    const { images } = form.getValues();
    form.watch('images');

    const isValidateInputImages = images.length >= minLengthImages;

    const onClickAddItemGalleryToManagementHandler = (event: any, image: ImageType) => {
        const oldImages = form.getValues().images;

        if (!oldImages.includes(image.imageUrl)) {
            const result = oldImages.length > 0 ? [ ...oldImages, image.imageUrl ] : [ image.imageUrl ];
            form.setValue('images', result, { shouldDirty: true, shouldTouch: true, shouldValidate: true });

            return;
        }

        form.setValue('images', oldImages.filter((img) => img !== image.imageUrl), { shouldDirty: true, shouldTouch: true });
    };

    const onClickDeleteItemHandler = (_id?: string) => {
        if (_id) {
            fetchDeleteProduct({
                _id,
                navigate,
            });
        }
    };

    const onClickDeleteImageFromProductHandler = (src: ImageType['imageUrl']) => {
        if (isValidateInputImages) {
            const newImages = images.filter((oldSrc) => oldSrc !== src);
            form.setValue('images', newImages);
        }
    };

    // const onSubmit = (values: typeof defaultValues) => {
    const onSubmit = (values: any) => { // todo how to remove any ???
        if (isModeEdit && currentProduct) {
            fetchEditProduct({
                _id:           currentProduct._id,
                editedProduct: values,
            });

            return;
        }

        fetchCreateNewProduct({
            ...values,
            reset: form.reset,
        });
    };

    useEffect(() => {
        fetchGallery();
        id && fetchProduct(id);
    }, []);

    useEffect(() => {
        currentProduct && form.reset({
            available:   currentProduct.available,
            description: currentProduct.description,
            discount:    currentProduct.discount,
            images:      currentProduct.images,
            price:       currentProduct.price,
            title:       currentProduct.title,
            type:        currentProduct.type,
            weight:      currentProduct.weight,
        });
    }, [ currentProduct ]);

    useEffect(() => {
        if (!isModeEdit) {
            form.reset(defaultValues);
        }
    }, [ location ]);

    return (
        <div>
            <Form.Root { ...form }>
                <FormTitle className = 'text-center'>
                    Please enter product information.
                </FormTitle>
                <form
                    className = { S.grid }
                    onSubmit = { form.handleSubmit(onSubmit) }>
                    <Form.FormField
                        control = { form.control }
                        name = 'title'
                        render = { ({ field, fieldState }) => (
                            <Form.FormItem style = {{ gridArea: field.name }}>
                                <Form.FormLabel>
                                    Enter title:
                                </Form.FormLabel>
                                <Form.FormControl>
                                    <Input
                                        isValidate = { fieldState.invalid }
                                        placeholder = 'Enter some data...'
                                        { ...field }
                                    />
                                </Form.FormControl>
                                <Form.FormMessage />
                            </Form.FormItem>
                        ) }
                    />
                    <Form.FormField
                        control = { form.control }
                        name = 'type'
                        render = { ({ field }) => (
                            <Form.FormItem style = {{ gridArea: field.name }}>
                                <Form.FormLabel>
                                    Choose the correct type for the product:
                                </Form.FormLabel>
                                <Select.Root
                                    defaultValue = { field.value }
                                    onValueChange = { field.onChange }>
                                    <Form.FormControl>
                                        <Select.SelectTrigger
                                            variant = 'outline'>
                                            <Select.SelectValue>
                                                <span className = 'capitalize'>
                                                    {field.value}
                                                </span>
                                            </Select.SelectValue>
                                        </Select.SelectTrigger>
                                    </Form.FormControl>
                                    <Select.SelectContent
                                        variant = 'shadow'>
                                        {CATEGORIES_ITEMS.map((item) => (
                                            <Select.SelectItem
                                                className = 'capitalize'
                                                key = { item }
                                                value = { item }
                                                variant = 'contain'>
                                                {item}
                                            </Select.SelectItem>
                                        ))}
                                    </Select.SelectContent>
                                </Select.Root>
                                <Form.FormMessage />
                            </Form.FormItem>
                        ) }
                    />
                    <Form.FormField
                        control = { form.control }
                        name = 'description'
                        render = { ({ field, fieldState }) => (
                            <Form.FormItem style = {{ gridArea: field.name }}>
                                <Form.FormLabel>
                                    Enter description:
                                </Form.FormLabel>
                                <Form.FormControl>
                                    <Textarea
                                        { ...field }
                                        isValidate = { fieldState.invalid }
                                        placeholder = 'Enter some data...'
                                    />
                                </Form.FormControl>
                                <Form.FormMessage />
                            </Form.FormItem>
                        ) }
                    />
                    <Form.FormField
                        control = { form.control }
                        name = 'weight'
                        render = { ({ field, fieldState }) => (
                            <Form.FormItem style = {{ gridArea: field.name }}>
                                <Form.FormLabel>
                                    Enter the product weight in grams:
                                </Form.FormLabel>
                                <Form.FormControl>
                                    <Input
                                        isValidate = { fieldState.invalid }
                                        placeholder = 'Enter some data...'
                                        type = 'number'
                                        { ...field }
                                    />
                                </Form.FormControl>
                                <Form.FormMessage />
                            </Form.FormItem>
                        ) }
                    />
                    <Form.FormField
                        control = { form.control }
                        name = 'price'
                        render = { ({ field, fieldState }) => (
                            <Form.FormItem style = {{ gridArea: field.name }}>
                                <Form.FormLabel>
                                    Enter product price in UAH/₴:
                                </Form.FormLabel>
                                <Form.FormControl>
                                    <Input
                                        isValidate = { fieldState.invalid }
                                        placeholder = 'Enter some data...'
                                        type = 'number'
                                        { ...field }
                                    />
                                </Form.FormControl>
                                <Form.FormMessage />
                            </Form.FormItem>
                        ) }
                    />
                    <Form.FormField
                        control = { form.control }
                        name = 'discount'
                        render = { ({ field, fieldState }) => (
                            <Form.FormItem style = {{ gridArea: field.name }}>
                                <Form.FormLabel>
                                    Enter discount %:
                                </Form.FormLabel>
                                <Form.FormControl>
                                    <Input
                                        isValidate = { fieldState.invalid }
                                        placeholder = 'Enter some data...'
                                        type = 'number'
                                        { ...field }
                                    />
                                </Form.FormControl>
                                <Form.FormMessage />
                            </Form.FormItem>
                        ) }
                    />
                    <Form.FormField
                        control = { form.control }
                        name = 'available'
                        render = { ({ field }) => (
                            <Form.FormItem style = {{ gridArea: field.name }}>
                                <Form.FormLabel className = 'block'>
                                    Product available:
                                </Form.FormLabel>
                                <Switch
                                    checked = { field.value }
                                    onCheckedChange = { field.onChange }>
                                    {field.value ? 'Availability' : 'Non-availability'}
                                </Switch>
                                <Form.FormMessage />
                            </Form.FormItem>
                        ) }
                    />
                    <div
                        className = { cn('overflow-auto', { 'flex flex-wrap [&_*]:h-[132px] gap-3 max-sb:justify-center': isValidateInputImages }) }
                        style = {{ gridArea: 'images' }}>
                        <Form.FormField
                            control = { form.control }
                            name = 'images'
                            render = { ({ fieldState }) => (
                                <Form.FormItem>
                                    <Form.FormControl>
                                        <ModalAddImages
                                            classNameTrigger = { cn({ 'border-quaternary text-quaternary': fieldState.invalid }) }
                                            selectedImages = { images }
                                            onClickAddItemGalleryToManagementHandler = {
                                                onClickAddItemGalleryToManagementHandler
                                            }
                                        />
                                    </Form.FormControl>
                                    <Form.FormMessage />
                                </Form.FormItem>
                            ) }
                        />
                        {isValidateInputImages && images.map((src) => src && (
                            <Button
                                className = { `group w-auto relative border-2 border-transparent overflow-hidden
                                    hover:border-quaternary hover:opacity-100
                                    after:absolute-center after:w-full after:h-full content-['1'] after:bg-secondary` }
                                key = { src }
                                type = 'button'
                                variant = 'default'
                                onClick = { () => onClickDeleteImageFromProductHandler(src) }>
                                <Icons.DeleteItem
                                    className = { `h-[80px] absolute-center stroke-quaternary opacity-0 transition
                                    group-hover:opacity-100` }
                                    height = '80'
                                />
                                <Image
                                    alt = ''
                                    className = 'aspect-square'
                                    src = { src }
                                />
                            </Button>
                        ))}
                    </div>
                    {isModeEdit && (
                        <Button
                            className = 'max-w-[300px]'
                            isLoading = { isLoadings.delete }
                            style = {{ gridArea: 'delete' }}
                            type = 'button'
                            variant = 'outline'
                            onClick = { () => onClickDeleteItemHandler(currentProduct?._id) }>
                            Delete
                        </Button>
                    )}
                    <Button
                        className = 'max-w-[300px]'
                        isLoading = { isLoadings.create }
                        style = {{ gridArea: 'submit' }}
                        type = 'submit'
                        variant = 'contain'>
                        {isModeEdit ? 'Edit' : 'Create'}
                    </Button>
                </form>
            </Form.Root>
        </div>
    );
};

export default () => (
    <ErrorBoundary>
        <Management />
    </ErrorBoundary>
);
