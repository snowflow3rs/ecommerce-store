'use client';

import { useState } from 'react';
import { ChevronRight, Menu, Plus, X } from 'lucide-react';
import { Dialog } from '@headlessui/react';

import IconButton from '@/components/ui/icon-button';
import Button from '@/components/ui/button';
import { Category } from '@/types';

import Filter from './filter';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface MobileNavBarProps {
    data: Category[];
}

const MobileNavBar: React.FC<MobileNavBarProps> = ({ data }) => {
    const [open, setOpen] = useState(false);

    const onOpen = () => setOpen(true);
    const onClose = () => setOpen(false);
    const pathname = usePathname();

    const routes = data.map((route) => ({
        href: `/category/${route.id}`,
        label: route.name,
        active: pathname === `/category/${route.id}`,
    }));

    return (
        <>
            <Menu size={20} onClick={onOpen} className="flex items-center gap-x-2 shadow-sm hover: cursor-pointer " />

            <Dialog open={open} as="div" className="relative z-40 lg:hidden" onClose={onClose}>
                {/* Background color and opacity */}
                <div className="fixed inset-0 bg-black bg-opacity-50" />

                {/* Dialog position */}
                <div className="fixed top-0 left-0  bottom-0 z-40 flex">
                    <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
                        {/* Close button */}
                        <div className="flex items-center justify-start px-4">
                            <IconButton icon={<X size={15} />} onClick={onClose} />
                        </div>

                        <div className="p-4  ">
                            <nav className=" flex flex-col items-start ">
                                {routes.map((route) => (
                                    <div
                                        onClick={onClose}
                                        className="flex items-center justify-between w-[300px] p-3"
                                        key={route.href}
                                    >
                                        <Link
                                            href={route.href}
                                            className={cn(
                                                'text-[24px] py-3 font-medium transition-colors  hover:text-black hover:underline hover:underline-offset-2 ',
                                                route.active ? 'text-black' : 'text-neutral-500',
                                            )}
                                        >
                                            {route.label}
                                        </Link>
                                        <ChevronRight size={20} />
                                    </div>
                                ))}
                            </nav>
                        </div>
                        <div className=" p-4 border-t-2">
                            <div className="p-4">
                                <h3 className=" font-semibold ">CLIENT SERVICES</h3>

                                <div className="flex flex-col mt-2">
                                    <p className="text-black py-2">Contact us</p>
                                    <p className="text-black py-2">Delivery & returns</p>
                                    <p className="text-black py-2">Find a boutique</p>
                                </div>
                            </div>
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </>
    );
};

export default MobileNavBar;
