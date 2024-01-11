'use client';
import { Product } from '@/types';
import React, { ChangeEvent, useState } from 'react';
import Currency from './currency';
import { Button } from './shadcn-button';
import { ShoppingCart } from 'lucide-react';
import useCart from '@/hooks/use-cart';
import { Input } from './input';
import z from 'zod';
import toast from 'react-hot-toast';
import ButtonCustom from './button';
interface InforProps {
    data: Product;
}
const Infor: React.FC<InforProps> = ({ data }) => {
    const cart = useCart();

    const [quantity, setQuantity] = useState(1);
    const handleQuantity = (e: ChangeEvent<HTMLInputElement>) => {
        let error = null;
        if (e.target.value === '') {
            setQuantity(0);
            error = 'Quantity cant be empty';
        } else {
            setQuantity(parseFloat(e.target.value));
        }
    };
    const quantitySchema = z.object({
        quantity: z
            .number()
            .int({ message: 'Decimal is not allowed' })
            .min(1, { message: 'Quantity must be at least 1' })
            .max(1000, { message: 'Quantity can be more than 1000' }),
    });
    const onAddToCart = () => {
        const res = quantitySchema.safeParse({ quantity: quantity });
        let order = {
            ...data,
            orderQuantity: quantity,
        };

        if (!res.success) {
            toast.error(res.error.issues[0].message);
        } else if (quantity > data.quantity) {
            toast.error('Sorry, we dont have that much');
        } else {
            cart.addItem(order);
        }
    };

    const incrementQuantity = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
    };
    const decrementQuantity = () => {
        setQuantity((prevQuantity) => prevQuantity - 1);
    };
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
            <div className="mt-3 flex items-end justify-between">
                <p className="text-2xl text-gray-900">
                    <Currency value={data?.price} />
                </p>
            </div>
            <hr className="my-4" />
            <div className="flex flex-col gap-y-6">
                <div className="flex items-center gap-x-4">
                    <h3 className="font-semibold text-black">Size:</h3>
                    <div className=" text-black">{data?.size?.value}</div>
                </div>
                <div className="flex items-center gap-x-4">
                    <h3 className="font-semibold text-black">Color:</h3>
                    <div
                        className="h-6 w-6 rounded-full border border-gray-600"
                        style={{ backgroundColor: data?.color?.value }}
                    />
                </div>
                <Button className=" flex items-center w-[80px] bg-gray-200 hover:bg-gray-300 active:bg-gray-500 shadow-md py-2 px-4 rounded">
                    <h3 className="font-semibold text-black">In Stock:</h3>
                    <div className="  text-black font-semibold ml-1">{data?.quantity}</div>
                </Button>
                <div>
                    <h3 className="font-semibold text-black">Quantity:</h3>

                    <div className="flex items-center mt-2">
                        <Button
                            disabled={quantity <= 1 ? true : false}
                            onClick={decrementQuantity}
                            variant="outline"
                            className="rounded-r-none h-10 border  border-r-0 disabled:cursor-none  disabled:pointer-events-none select-none  text-black"
                        >
                            -
                        </Button>
                        <Input
                            onChange={handleQuantity}
                            value={quantity || undefined}
                            placeholder="Quantity"
                            className="rounded-none w-24 h-10 text-center focus-visible:ring-0"
                            min={1}
                            max={1000}
                            type="number"
                        />
                        <Button
                            disabled={quantity >= data.quantity ? true : false}
                            onClick={incrementQuantity}
                            variant="outline"
                            className="rounded-l-none h-10  border border-l-0 disabled:cursor-none  disabled:pointer-events-none select-none text-black"
                        >
                            +
                        </Button>
                    </div>
                </div>
            </div>

            <div className="mt-10 flex items-center gap-x-3">
                <ButtonCustom onClick={onAddToCart} className="flex items-center gap-x-2">
                    <ShoppingCart />
                    Add to Cart
                </ButtonCustom>
            </div>
        </div>
    );
};

export default Infor;
