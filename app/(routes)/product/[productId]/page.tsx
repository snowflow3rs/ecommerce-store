import getProducts from '@/actions/get-products';
import getProductsId from '@/actions/get-productsId';
import Gallery from '@/components/gallery';
import ProductList from '@/components/product-list';
import Container from '@/components/ui/container';
import Infor from '@/components/ui/infor';
import { shuffleArray } from '@/lib/utils';
import React from 'react';
interface ProductPageProps {
    params: {
        productId: string;
    };
}
export const revalidate = 0;
const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
    const product = await getProductsId(params.productId);
    const suggestedProducts = await getProducts({
        categoryId: product?.category?.id,
    });
    const realtedItems = suggestedProducts.slice(0, 4);
    return (
        <div className="">
            <Container>
                <div className="px-4 py-10 sm:px-6 lg:px-8">
                    <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
                        <Gallery images={product.images} />

                        <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                            <Infor data={product} />
                        </div>
                    </div>
                    <hr className="my-10" />

                    <ProductList title="Related Items" items={realtedItems} />
                </div>
            </Container>
        </div>
    );
};

export default ProductPage;
