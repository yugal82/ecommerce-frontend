import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteItemFromCartAsync, selectCartItems, selectCartStatus, updateCartAsync } from './cartSlice';
import { discountedPrice } from '../../utils/constant';
import { selectLoggedInUser } from '../auth/authSlice';
import Loader from '../../components/Loader';
import { ToastContainer, toast } from 'react-toastify';

const Cart = ({ isCheckout }) => {
  const dispatch = useDispatch();
  const cartProducts = useSelector(selectCartItems);
  const totalAmount = cartProducts?.reduce(
    (amount, product) => discountedPrice(product?.productId) * product?.quantity + amount,
    0
  );

  const totalAmountWithoutDiscount = cartProducts?.reduce(
    (amount, product) => product?.productId?.price * product?.quantity + amount,
    0
  );
  const user = useSelector(selectLoggedInUser);
  const cartStatus = useSelector(selectCartStatus);

  const onQuantityChange = (e, product) => {
    const newProduct = {
      id: product.id,
      productId: product.productId.id,
      userId: product.userId.id,
      quantity: e.target.value,
    };
    dispatch(updateCartAsync({ newProduct, user }));
  };

  const renderQuantityOptionTag = (stock) => {
    let optiontags = [];
    for (let i = 1; i <= stock; i++) {
      optiontags.push(<option value={i}>{i}</option>);
    }
    return optiontags;
  };

  return (
    <div className="w-full px-8">
      <ToastContainer theme="dark" />
      {cartStatus === 'loading' && <Loader />}
      {cartProducts?.length === 0 ? (
        <div className="py-6 text-white h-screen">
          <div className="flex items-center justify-center text-xl font-semibold">
            <h2>The cart is empty. Nothing to show here!</h2>
          </div>
          <Link className="flex items-center justify-center underline" to="/">
            Click here to explore products
          </Link>
        </div>
      ) : (
        <div className="min-h-screen">
          <ToastContainer theme="dark" />
          <div className="px-4 py-6 sm:px-6">
            <div className="flex items-start justify-between">
              <h2 className="text-lg font-medium text-white">Shopping cart</h2>
            </div>

            <div className="mt-8">
              <div className="flow-root">
                <ul className="-my-6">
                  {cartProducts?.map((product) => (
                    <li key={product?.productId?.id} className="flex py-6 bg-[#191919] px-4 my-2 rounded-md">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
                        <img
                          src={product?.productId?.imageSrc}
                          alt="product"
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-white">
                            <div>
                              <span className="text-xl">{product?.productId?.name}</span>
                              <p className="text-gray-300">{product?.productId?.description.substr(0, 35)}...</p>
                            </div>
                            <div>
                              <p className="">₹{discountedPrice(product?.productId)}</p>
                              <p className="text-right line-through text-sm text-gray-300">
                                ₹{product?.productId?.price}
                              </p>
                            </div>
                          </div>
                          {/* <p className="mt-1 text-sm text-white">{product.item.color}</p> */}
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <div>
                            <div className="text-gray-500">
                              <label htmlFor="quantity" className="text-sm font-medium leading-6 text-gray-400">
                                Quantity:
                              </label>
                              <select
                                onChange={(e) => onQuantityChange(e, product)}
                                className="ml-2 text-xs py-1 px-6 mt-1 rounded-md"
                                value={product?.quantity}
                              >
                                {renderQuantityOptionTag(product?.productId?.stock)}
                              </select>
                            </div>
                            <div className="text-base text-gray-400">
                              <p>Size: {product?.size}</p>
                            </div>
                          </div>

                          <div className="flex">
                            <button
                              onClick={() => {
                                dispatch(deleteItemFromCartAsync({ id: product?.id, user }));
                                toast.success('Item successfully removed from cart.', {
                                  position: 'bottom-right',
                                  autoClose: true,
                                  delay: 3000,
                                });
                              }}
                              type="button"
                              className="text-red-700 font-bold hover:scale-105"
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
            <div className="flex justify-between text-base font-medium text-white mt-1">
              <p>Total MRP</p>
              <p>₹{totalAmountWithoutDiscount}</p>
            </div>
            <div className="flex justify-between text-base font-medium text-white mt-1">
              <p>Discount on MRP</p>
              <p className="text-primary">- ₹{totalAmountWithoutDiscount - totalAmount}</p>
            </div>
            <div className="flex justify-between text-base font-medium text-white mt-1">
              <div>
                <p>Shipping costs</p>
                <p className=" text-xs font-bold text-gray-500">No Shipping costs.</p>
              </div>
              <p>₹0</p>
            </div>
            <div className="text-xl flex justify-between font-medium text-white mt-2">
              <p>Total Amount</p>
              <p>₹{totalAmount}</p>
            </div>
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
