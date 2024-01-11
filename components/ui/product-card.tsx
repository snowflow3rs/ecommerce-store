'use client';

import { Product } from '@/types';
import Image from 'next/image';
import React, { MouseEventHandler } from 'react';
import IconButton from './icon-button';
import { Expand, ShoppingCart } from 'lucide-react';
import Currency from './currency';
import { useRouter } from 'next/navigation';
import usePreviewModal from '@/hooks/use-preview-modal';
import useCart from '@/hooks/use-cart';
import z from 'zod';
import toast from 'react-hot-toast';

interface ProductCardProps {
    data: Product;
}
const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
    const previewModal = usePreviewModal();
    const router = useRouter();
    const cart = useCart();
    const quantitySchema = z.object({
        quantity: z
            .number()
            .int({ message: 'Decimal is not allowed' })
            .min(1, { message: 'Quantity must be at least 1' })
            .max(1000, { message: 'Quantity can be more than 1000' }),
    });
    const handleClick = () => {
        router.push(`/product/${data?.id}`);
    };

    const onPreview: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.stopPropagation();
        previewModal.onOpen(data);
    };

    const addCart: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.stopPropagation();
        const res = quantitySchema.safeParse({ quantity: 1 });
        let order = {
            ...data,
            orderQuantity: 1,
        };

        if (!res.success) {
            toast.error(res.error.issues[0].message);
        } else if (1 > data.quantity) {
            toast.error('Sorry, we dont have that much');
        } else {
            cart.addItem(order);
        }
    };
    return (
        <div onClick={handleClick} className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4">
            <div className=" aspect-square rounded-xl bg-gray-100 relative">
                <Image
                    src={data?.images?.[0]?.url}
                    alt=" Images"
                    fill
                    className="  aspect-square object-cover rounded-md"
                />
                <div className=" opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
                    <div className="flex gap-x-6 justify-center">
                        <IconButton onClick={onPreview} icon={<Expand size={20} className="text-gray-600" />} />
                        <IconButton onClick={addCart} icon={<ShoppingCart size={20} className="text-gray-600" />} />
                    </div>
                </div>
            </div>

            <div>
                <p className="font-semibold text-lg text-black">{data.name}</p>
                <p className="font-sm text-gray-500">{data.category?.name}</p>
            </div>
            <div className="flex items-center justify-between">
                <Currency value={data?.price} />
            </div>
        </div>
    );
};

export default ProductCard;
