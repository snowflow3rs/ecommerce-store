'use client';

import { useState } from 'react';
import { Check, Search, X } from 'lucide-react';
import { Dialog } from '@headlessui/react';

import IconButton from '@/components/ui/icon-button';
import { Product } from '@/types';

import { Input } from './ui/input';
import { Separator } from './ui/separator';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import useDebounce from '@/hooks/use-debounce';

interface SearchBarProps {
    items: Product[];
}

const SearchBar: React.FC<SearchBarProps> = ({ items }) => {
    const onOpen = () => setOpen(true);
    const onClose = () => setOpen(false);

    const params = useParams();
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedSearchQuery = useDebounce(searchQuery, 500);
    const filteredItems = items.filter((item) => item.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()));

    const formattedItems = filteredItems.map((item) => ({
        label: item.name,
        value: item.id,
        images: item.images,
    }));

    const displayedItems = formattedItems.slice(0, 4);

    const currentProduct = formattedItems.find((item) => item.value === params.productId);
    const onProductSelect = (product: { value: string; label: string }) => {
        setOpen(false);
        router.push(`/product/${product.value}`);
    };
    return (
        <>
            <Search size={20} onClick={onOpen} className="flex items-center gap-x-2 shadow-sm hover: cursor-pointer " />

            <Dialog open={open} as="div" className="relative z-40 " onClose={onClose}>
                {/* Background color and opacity */}
                <div className="fixed inset-0 bg-black bg-opacity-50" />

                {/* Dialog position */}
                <div className="fixed top-0 left-0 right-0 z-40 flex">
                    <Dialog.Panel className="relative ml-auto flex h-full w-full flex-col overflow-y-auto bg-white   shadow-xl  ">
                        {/* Close button */}
                        <div className="flex items-center justify-between px-4 ">
                            <div></div>

                            <div className=" relative">
                                <Search
                                    size={20}
                                    className="cursor-pointer absolute top-[24px] left-[8px] z-10 text-black"
                                />

                                <input
                                    className=" pl-10 bg-gray-50 relative lg:w-[720px] mt-4 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                    placeholder="Search products..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <IconButton icon={<X size={15} />} onClick={onClose} />
                        </div>
                        <Separator className="my-3" />
                        <div className=" border-t lg:grid lg:grid-cols-6 ">
                            <div className="lg:col-span-3  px-[48px] py-[58px] ">
                                <div className="grid grid-cols-2 gap-4 justify-between">
                                    <div className="flex flex-col">
                                        <h2 className=" text-[12px] pb-6 font-light transition-colors text-neutral-500 hover:text-black">
                                            WOMEN CLOTHES
                                        </h2>

                                        <p className=" text-black pb-6 text-[14px]">Shirt</p>
                                        <p className=" text-black pb-6 text-[14px]">Phone Case</p>
                                        <p className=" text-black pb-6 text-[14px]">All Fashion Accessories</p>
                                        <p className=" text-black pb-6 text-[14px]">
                                            All Multi-Purpose Bags and Leather Accessories
                                        </p>
                                    </div>
                                    <div className="flex flex-col">
                                        <h2 className="text-[12px] pb-6 font-light transition-colors text-neutral-500 hover:text-black">
                                            SOUTHERN CLOTHES
                                        </h2>
                                        <p className=" text-black pb-6 text-[14px]">All Bag</p>
                                        <p className=" text-black pb-6 text-[14px]">All Shoes</p>
                                        <p className=" text-black pb-6 text-[14px]">Backpack</p>
                                        <p className=" text-black pb-6 text-[14px]">
                                            All Multi-Purpose Bags and Leather Accessories
                                        </p>
                                    </div>
                                    <div>
                                        <h2 className="text-[10px] font-semibold pb-6  transition-colors text-neutral-500 hover:text-black">
                                            MAGAZINE
                                        </h2>
                                    </div>
                                    <div></div>
                                    <div className="flex items-center">
                                        <Image className="rounded" src="/1.jpg" alt="" width={116} height={65} />
                                        <div className=" ml-3">
                                            <h4 className=" text-black">Cruise 2024 Collection</h4>
                                            <p className=" text-black"> May 19 - Fashion show</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center ">
                                        <Image className="rounded" src="/2.jpg" alt="" width={116} height={65} />
                                        <div className=" ml-3">
                                            <h4 className=" text-black  w-[288px]">
                                                Show of the Spring-Summer 2024 men`s Collection
                                            </h4>
                                            <p className=" text-black"> June 16 - Fashion show</p>
                                        </div>
                                    </div>
                                </div>
                                <div></div>
                            </div>
                            <div className="lg:col-span-3 border-l  px-[48px] py-[58px]">
                                <div className="flex justify-center flex-col">
                                    <h2 className=" text-[12px] mt-[-5px] pb-6 font-light transition-colors text-neutral-500 hover:text-black">
                                        PRODUCTS
                                    </h2>
                                    <div className=" grid grid-cols-2 gap-7  mt-2     ">
                                        {displayedItems.map((product) => (
                                            <div
                                                key={product.value}
                                                onClick={() => onProductSelect(product)}
                                                className="flex items-center cursor-pointer"
                                            >
                                                <Image
                                                    className="rounded"
                                                    src={product?.images?.[0]?.url}
                                                    alt="Product image"
                                                    width={100}
                                                    height={100}
                                                />
                                                <div className=" ml-5">
                                                    <h4 className=" text-black pr-4"> {product.label}</h4>
                                                    <Check
                                                        className={cn(
                                                            'ml-auto h-4 w-4',
                                                            currentProduct?.value === product.value
                                                                ? 'opacity-100'
                                                                : 'opacity-0',
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </>
    );
};

export default SearchBar;
