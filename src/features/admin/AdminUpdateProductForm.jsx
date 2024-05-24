import React from 'react';
import { brands, categories, sizes } from '../../utils/constant';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import { useLocation, useNavigate } from 'react-router-dom';
import { updateProductAsync } from '../product-list/productSlice';

const AdminUpdateProductForm = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const updateProductDetails = (data) => {
    data = converStringToNumber(data);
    const newProduct = { ...data, id: state?.product?.id };
    // newProduct.sizes = convertSizesToNumber(newProduct.sizes);
    dispatch(updateProductAsync(newProduct));
    alert.success('Product updated successfully');
    navigate('/admin');
  };

  // const convertSizesToNumber = (sizes) => {
  //   return sizes.map((size) => Number(size));
  // };

  const converStringToNumber = (data) => {
    data.price = Number(data.price);
    data.discountPercentage = Number(data.discountPercentage);
    data.stock = Number(data.stock);

    return data;
  };

  return (
    <div className="text-white mx-auto max-w-7xl py-6 sm:py-12 px-4 sm:px-16 lg:px-24">
      <form
        onSubmit={handleSubmit((data) => {
          if (data?.sizes === false) data.sizes = [];
          updateProductDetails(data);
        })}
      >
        <div className="">
          <div className="border-b border-gray-900/10 pb-6">
            <h2 className="text-xl font-semibold ">Update Product</h2>
            {state?.product?.deleted && (
              <p className="mt-4 text-red-700 font-semibold">
                <span>The product is deleted</span>

                <button
                  onClick={() => {
                    dispatch(updateProductAsync({ id: state?.product?.id, deleted: false }));
                    alert.success('Product restored successfully');
                    navigate('/admin');
                  }}
                  type="click"
                  className="rounded-md text-white bg-red-700 ml-2 p-2 text-xs"
                >
                  Restore product
                </button>
              </p>
            )}
            {state?.product?.stock === 0 && <p className="mt-4 text-red-700 font-semibold">Product out of stock</p>}
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label htmlFor="name" className="block text-sm font-medium leading-6 ">
                  Product name
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md bg-white shadow-sm sm:max-w-md">
                    <input
                      type="text"
                      {...register('name')}
                      id="name"
                      className="block flex-1 rounded-md border-0 py-1.5 pl-2 text-black sm:text-sm sm:leading-6"
                      defaultValue={state?.product?.name}
                    />
                  </div>
                  <p className="text-red-500 font-semibold text-sm">{errors?.name?.message}</p>
                </div>
              </div>

              <div className="col-span-full">
                <label htmlFor="description" className="block text-sm font-medium leading-6 ">
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    {...register('description')}
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 shadow-sm text-black sm:text-sm sm:leading-6"
                    defaultValue={state?.product?.description}
                  />
                  <p className="text-red-500 font-semibold text-sm">{errors?.description?.message}</p>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="price" className="block text-sm font-medium leading-6 ">
                  Price
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    {...register('price', { min: 1 })}
                    id="price"
                    className="block w-full rounded-md border-0 py-1.5  shadow-sm  text-black sm:text-sm sm:leading-6"
                    defaultValue={state?.product?.price}
                  />
                  <p className="text-red-500 font-semibold text-sm">{errors?.price?.message}</p>
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="discountPercentage" className="block text-sm font-medium leading-6 ">
                  Discount (in %)
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    {...register('discountPercentage', {
                      min: 0,
                      max: 100,
                    })}
                    id="discountPercentage"
                    className="block w-full rounded-md border-0 py-1.5  shadow-sm  text-black sm:text-sm sm:leading-6"
                    defaultValue={state?.product?.discountPercentage}
                  />
                  <p className="text-red-500 font-semibold text-sm">{errors?.discountPercentage?.message}</p>
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="stock" className="block text-sm font-medium leading-6 ">
                  Stock
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    {...register('stock', { min: 1 })}
                    id="stock"
                    className="block w-full rounded-md border-0 py-1.5  shadow-sm  text-black sm:text-sm sm:leading-6"
                    defaultValue={state?.product?.stock}
                  />
                  <p className="text-red-500 font-semibold text-sm">{errors?.stock?.message}</p>
                </div>
              </div>

              {/* category */}
              <div className="sm:col-span-2">
                <label htmlFor="category" className="block text-sm font-medium leading-6 text-white">
                  Category
                </label>
                <div className="mt-2">
                  <select
                    id="category"
                    {...register('category')}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm  sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option>{state?.product?.category}</option>
                    {categories?.map((category) => (
                      <option key={category}>{category}</option>
                    ))}
                  </select>
                  <p className="text-red-500 font-semibold text-sm">{errors?.category?.message}</p>
                </div>
              </div>

              {/* brands */}
              <div className="sm:col-span-2">
                <label htmlFor="brand" className="block text-sm font-medium leading-6 text-white">
                  Brands
                </label>
                <div className="mt-2">
                  <select
                    id="brand"
                    {...register('brand')}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm  sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option>{state?.product?.brand}</option>
                    {brands?.map((brand) => (
                      <option key={brand}>{brand}</option>
                    ))}
                  </select>
                  <p className="text-red-500 font-semibold text-sm">{errors?.brand?.message}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-white pb-12">
            <div className="">
              <fieldset>
                <legend className="text-sm font-semibold leading-6 ">Size</legend>
                <div className="flex items-center justify-start flex-wrap">
                  {sizes?.map((size) => (
                    <div key={size} className="flex h-6 items-center mx-2">
                      <input
                        id="sizes"
                        {...register('sizes')}
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-primary"
                        value={size}
                      />
                      <label htmlFor="sizes" className="font-medium ml-2">
                        {size}
                      </label>
                    </div>
                  ))}
                </div>
                <p className="text-red-500 font-semibold text-sm">{errors?.size?.message}</p>
                <p className="mt-2 text-sm text-gray-300">
                  Please select the appropriate sizes. (For jeans the sizes start from 28, while for Shirts/T-shirts,
                  sizes start from 36)
                </p>
              </fieldset>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button type="reset" className="text-sm font-semibold leading-6 ">
            Cancel
          </button>
          <button type="submit" className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminUpdateProductForm;
