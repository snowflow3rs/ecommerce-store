import getBillboards from '@/actions/get-billboards';
import getProducts from '@/actions/get-products';
import Billboard from '@/components/billboard';
import ProductList from '@/components/product-list';
import Container from '@/components/ui/container';
import React from 'react';
export const revalidate = 0;
const HomePage = async () => {
    const products = await getProducts({ isFeatured: true });
    const billboards = await getBillboards('9dff3fbe-962f-49ed-998f-3892cf519587');

    return (
        <>
            <Billboard data={billboards} />
            <Container>
                <div className="space-y-10 pb-10">
                    <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
                        <ProductList title="Featured Products" items={products} />
                    </div>
                </div>
            </Container>
        </>
    );
};

export default HomePage;
