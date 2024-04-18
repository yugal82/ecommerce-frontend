import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteItemFromCartAsync, selectCartItems, updateCartAsync } from './cartSlice';
import { discountedPrice } from '../../utils/constant';

const Cart = ({ isCheckout }) => {
  // here the quantity of the product is hardcoded. Once the user increases the quantity, we are not handling that API yet. But while implementing, again watch 'Cart Add/Update/Remove items' section of the tutorial.

  const dispatch = useDispatch();
  const cartProducts = useSelector(selectCartItems);
  const totalAmount = cartProducts.reduce(
    (amount, product) => discountedPrice(product?.item) * product?.quantity + amount,
    0
  );

  const onQuantityChange = (e, product) => {
    dispatch(updateCartAsync({ ...product, quantity: +e.target.value }));
  };

  return (
    <div className="w-full px-8">
      {cartProducts.length === 0 ? (
        <div className="py-6 text-white h-screen">
          <div className="flex items-center justify-center text-xl font-semibold">
            <h2>The cart is empty. Nothing to show here!</h2>
          </div>
          <Link className="flex items-center justify-center underline" to="/">
            Click here to explore products
          </Link>
        </div>
      ) : (
        <div className="">
          <div className="px-4 py-6 sm:px-6">
            <div className="flex items-start justify-between">
              <h2 className="text-lg font-medium text-white">Shopping cart</h2>
            </div>

            <div className="mt-8">
              <div className="flow-root">
                <ul className="-my-6 divide-y divide-gray-200">
                  {cartProducts.map((product) => (
                    <li key={product.item.id} className="flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={product.item.imageSrc}
                          alt="product"
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-white">
                            <h3>
                              <span>{product.item.name}</span>
                            </h3>
                            <p className="ml-4">${discountedPrice(product.item)}</p>
                          </div>
                          {/* <p className="mt-1 text-sm text-white">{product.item.color}</p> */}
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <div className="text-gray-500">
                            <label htmlFor="quantity" className="text-sm font-medium leading-6 text-gray-400">
                              Quantity:
                            </label>
                            <select
                              onChange={(e) => onQuantityChange(e, product)}
                              className="ml-2 text-xs py-1 px-6 mt-1"
                              value={product.quantity}
                            >
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                            </select>
                          </div>

                          <div className="flex">
                            <button
                              onClick={() => {
                                dispatch(deleteItemFromCartAsync(product.id));
                              }}
                              type="button"
                              className="font-medium text-red-700 hover:scale-105"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between text-base font-medium text-white">
              <p>Subtotal</p>
              <p>${totalAmount}</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
            <div className="mt-6 flex items-center justify-end">
              {!isCheckout && (
                <Link
                  to="/checkout"
                  className="rounded-md border border-transparent bg-primary px-6 py-3 text-base font-semibold text-white shadow-sm"
                >
                  Checkout
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
