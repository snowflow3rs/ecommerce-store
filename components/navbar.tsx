import Link from 'next/link';

import Container from '@/components/ui/container';

import MainNav from './ui/main-nav';
import getCategories from '@/actions/get-categories';
import NavBarAction from './ui/navbar-actions';
import getProducts from '@/actions/get-products';
import ProductSearch from './search-bar';
import SearchBar from './search-bar';

const Navbar = async () => {
    const categories = await getCategories();
    const products = await getProducts({});

    return (
        <div className="border-b">
            <Container>
                <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
                    <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2">
                        <p className="font-bold text-xl">Laconic</p>
                    </Link>

                    <MainNav data={categories} />

                    <SearchBar items={products} />
                    <NavBarAction />
                </div>
            </Container>
        </div>
    );
};

export default Navbar;
