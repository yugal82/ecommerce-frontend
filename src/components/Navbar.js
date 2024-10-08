import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  XMarkIcon,
  UserCircleIcon,
  HeartIcon,
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCartItems } from '../features/cart/cartSlice';
import { selectUserInfo } from '../features/user/userSlice';

const navigation = [
  { name: 'Login', link: '/login', user: true },
  { name: 'Signup', link: '/signup', user: true },
];
const userNavigation = [
  { name: 'Your Profile', link: '/profile' },
  { name: 'Your Orders', link: '/profile/my-orders' },
  { name: 'Sign out', link: '/logout' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Navbar = () => {
  const cartItems = useSelector(selectCartItems);
  const user = useSelector(selectUserInfo);

  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-black backdrop-filter backdrop-blur shadow-2xl">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl py-2 px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="w-full flex items-center justify-between">
                    <div className="flex-shrink-0">
                      <Link
                        to="/"
                        className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary font-bold text-2xl md:text-3xl"
                      >
                        FashionFusion
                      </Link>
                    </div>
                    <div className="relative hidden md:block">
                      <MagnifyingGlassIcon className="absolute top-2 right-1 w-5 h-5 text-gray-500" />
                      <input
                        type="text"
                        placeholder="Search items"
                        className="text-black outline-none block rounded-md border-0 py-1.5 pr-0 sm:pr-28 focus:ring-0"
                      />
                    </div>
                    {user == null && (
                      <div className="hidden md:block">
                        <div className={`ml-10 flex items-baseline space-x-4`}>
                          {navigation.map((item) => (
                            <Link
                              key={item.name}
                              to={item.link}
                              className={classNames(
                                item.current
                                  ? 'bg-black text-white'
                                  : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                'rounded-md px-3 py-2 text-sm font-medium'
                              )}
                              aria-current={item.current ? 'page' : undefined}
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                    {user?.role === 'admin' && (
                      <div className="flex">
                        <Link
                          to="/admin"
                          className="hidden sm:block text-white hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                        >
                          Admin Panel
                        </Link>
                        <Link
                          to="/admin/orders"
                          className="hidden sm:block text-white hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                        >
                          Admin Orders
                        </Link>
                      </div>
                    )}
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 w-full flex items-center md:ml-6">
                      <Link to="/wishlist">
                        <button type="button" className="relative rounded-full p-1 text-gray-400 hover:text-white">
                          <HeartIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </Link>
                      <Link to="/cart">
                        <button type="button" className="relative rounded-full p-1 text-gray-400 hover:text-white">
                          <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
                          {cartItems?.length > 0 && (
                            <span class="absolute top-0 rounded-full bg-green-50 px-1 text-xs text-green-700">
                              {cartItems?.length}
                            </span>
                          )}
                        </button>
                      </Link>

                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-black text-sm">
                            <UserCircleIcon className="h-8 w-8 rounded-full bg-white" />
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
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg">
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <Link
                                    to={item.link}
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-sm text-gray-700'
                                    )}
                                  >
                                    {item.name}
                                  </Link>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="relative py-2 inline-flex items-center justify-center rounded-md bg-black p-2 text-gray-100 hover:text-white">
                      {open ? (
                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden bg-black">
                <div className="relative px-2">
                  <MagnifyingGlassIcon className="absolute top-2 right-4 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search items"
                    className="w-full bg-transparent text-primary outline-none block rounded-md border border-gray-500 py-1.5 pr-0 sm:pr-28 focus:ring-0 focus:border-primary"
                  />
                </div>

                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {user == null && (
                    <div>
                      {navigation.map((item, idx) => (
                        <Link key={idx} to={item?.link}>
                          <Disclosure.Button
                            key={item.name}
                            as="div"
                            className={classNames(
                              item.current
                                ? 'bg-gray-900 text-white'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                              'block rounded-md px-3 py-2 text-base font-medium'
                            )}
                            aria-current={item.current ? 'page' : undefined}
                          >
                            {item.name}
                          </Disclosure.Button>
                        </Link>
                      ))}
                    </div>
                  )}
                  {user?.role === 'admin' && (
                    <>
                      <Link
                        to="/admin"
                        className="sm:hidden text-gray-300 hover:bg-gray-700 hover:text-white inline-block rounded-md p-3 text-base font-medium"
                      >
                        Admin Panel
                      </Link>
                      <Link
                        to="/admin/orders"
                        className="sm:hidden text-gray-300 hover:bg-gray-700 hover:text-white inline-block rounded-md p-3 text-base font-medium"
                      >
                        Admin Orders
                      </Link>
                    </>
                  )}
                </div>
                <div className="border-t border-gray-700 pb-3 pt-4">
                  <div className="flex items-center justify-between px-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <UserCircleIcon className="h-8 w-8 rounded-full bg-white" />
                      </div>
                      <div className="ml-3">
                        <div className="text-base font-medium leading-none text-white">{user?.name}</div>
                        <div className="text-sm font-medium leading-none text-gray-400">{user?.email}</div>
                      </div>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="relative ml-auto flex-shrink-0 rounded-full p-1 text-gray-400 hover:text-white"
                      >
                        <Link to="/wishlist">
                          <HeartIcon className="h-6 w-6" aria-hidden="true" />
                        </Link>
                      </button>
                      <button
                        type="button"
                        className="relative ml-auto flex-shrink-0 rounded-full p-1 text-gray-400 hover:text-white"
                      >
                        <Link to="/cart">
                          {cartItems?.length > 0 && (
                            <span class="absolute top-0 rounded-full bg-green-50 px-1 text-xs text-green-700">
                              {cartItems?.length}
                            </span>
                          )}
                          <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
                        </Link>
                      </button>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    {userNavigation.map((item) => (
                      <Link key={item.name} to={item.link}>
                        <Disclosure.Button
                          as="div"
                          className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                        >
                          {item.name}
                        </Disclosure.Button>
                      </Link>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </>
  );
};

export default Navbar;
