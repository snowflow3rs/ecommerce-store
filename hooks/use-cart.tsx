import { create } from 'zustand';
import { toast } from 'react-hot-toast';
import { persist, createJSONStorage } from 'zustand/middleware';

import { Product } from '@/types';

export interface CartOrder extends Product {
    orderQuantity: number;
}
interface CartStore {
    items: CartOrder[];
    addItem: (data: CartOrder) => void;
    removeItem: (id: string) => void;
    removeAll: () => void;
}

const useCart = create(
    persist<CartStore>(
        (set, get) => ({
            items: [],
            addItem: (data: CartOrder) => {
                const currentItems: CartOrder[] = get().items;
                const existingItem: CartOrder | undefined = currentItems.find((item) => item.id === data.id);
                const availabelStock: number = data.quantity - (existingItem ? existingItem.orderQuantity : 0);
                if (existingItem) {
                    if (availabelStock >= data.orderQuantity) {
                        existingItem.orderQuantity += data.orderQuantity;
                        set({ items: [...currentItems] });
                        toast.success(`Added ${data.orderQuantity} to the existing products.`);
                    } else if (availabelStock > 0) {
                        existingItem.orderQuantity += availabelStock;
                        set({ items: [...currentItems] });
                        toast.success(
                            `Added ${addEventListener} to the existing products, Maximum availabel stock reached`,
                        );
                    } else {
                        toast.error('All availabel quantity already in cart');
                    }
                } else {
                    set({ items: [...currentItems, data] });
                    toast.success('Item added to cart.');
                }
            },
            removeItem: (id: string) => {
                set({ items: [...get().items.filter((item) => item.id !== id)] });
                toast.success('Item removed from cart.');
            },
            removeAll: () => set({ items: [] }),
        }),
        {
            name: 'cart-storage',
            storage: createJSONStorage(() => localStorage),
        },
    ),
);

export default useCart;
