import React, { useState, Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon, FunnelIcon } from '@heroicons/react/20/solid';
import ProductsGrid from './ProductsGrid';
import FilterSidebar from '../../../components/Sidebar/FilterSidebar';
import FilterSidebarMobile from '../../../components/Sidebar/FilterSidebarMobile';
import {
  getProductsByFiltersAsync,
  selectAllProducts,
  getProductsBySortFilterAsync,
  selectProductStatus,
} from '../productSlice';
import { categories, brands } from '../../../utils/constant';
import Loader from '../../../components/Loader';

const sortOptions = [
  { name: 'Best Rating', sort: 'rating', order: 'desc', current: false },
  { name: 'Price: Low to High', sort: 'price', order: 'asc', current: false },
  { name: 'Price: High to Low', sort: 'price', order: 'desc', current: false },
];

const filters = [
  // {
  //   id: 'color',
  //   name: 'Color',
  //   options: colors,
  // },
  {
    id: 'category',
    name: 'Category',
    options: categories,
  },
  {
    id: 'brand',
    name: 'Brands',
    options: brands,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const ProductList = () => {
  // redux states and dispatch
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const status = useSelector(selectProductStatus);

  // states
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const handleSortFilterClick = (e, option) => {
    dispatch(getProductsBySortFilterAsync(option));
  };

  useEffect(() => {
    dispatch(getProductsByFiltersAsync());
  }, [dispatch]);

  return (
    <div className="">
      <div>
        {/* Mobile filter dialog */}
        <FilterSidebarMobile
          filters={filters}
          mobileFiltersOpen={mobileFiltersOpen}
          setMobileFiltersOpen={setMobileFiltersOpen}
          getProductsByFiltersAsync={getProductsByFiltersAsync}
          dispatch={dispatch}
        />
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-end border-b border-gray-200 py-10">
            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left z-10">
                <div>
                  <Menu.Button className="group inline-flex items-center justify-center text-base font-medium text-gray-200 px-4">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <span
                              onClick={(e) => handleSortFilterClick(e, option)}
                              className={classNames(
                                option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              {option.name}
                            </span>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-200 hover:text-gray-500 sm:ml-6 lg:hidden outline-none"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>
            {status === 'loading' ? <Loader /> : null}
            <div className="w-full flex justify-center">
              {/* Filters */}
              <FilterSidebar
                filters={filters}
                getProductsByFiltersAsync={getProductsByFiltersAsync}
                dispatch={dispatch}
              />
              <ProductsGrid products={products} />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default ProductList;
