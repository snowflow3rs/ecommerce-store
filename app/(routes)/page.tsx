import getBillboards from '@/actions/get-billboards';
import getProducts from '@/actions/get-products';
import Billboard from '@/components/billboard';
import ProductList from '@/components/product-list';
import Container from '@/components/ui/container';
import React from 'react';
export const revalidate = 0;
const HomePage = async () => {
    const products = await getProducts({ isFeatured: true });
    const billboards = await getBillboards('7d2172ca-299c-418d-b3ce-6b41f1ee5706');

    return (
        <Container>
            <div className="space-y-10 pb-10">
                <Billboard data={billboards} />
                <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
                    <ProductList title="Featured Products" items={products} />
                </div>
            </div>
        </Container>
    );
};

export default HomePage;
