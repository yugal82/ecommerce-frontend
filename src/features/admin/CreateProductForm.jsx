import React from 'react';
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid';

// {
//     "id": "1",
//     "name": "iPhone 9",
//     "description": "An apple mobile which is nothing like apple",
//     "price": 549,
//     "discountPercentage": 12.96,
//     "rating": 4.69,
//     "stock": 94,
//     "brand": "Apple",
//     "category": "smartphones",
//     "imageSrc": "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg",
//     "images": [
//       "https://cdn.dummyjson.com/product-images/1/1.jpg",
//       "https://cdn.dummyjson.com/product-images/1/2.jpg",
//       "https://cdn.dummyjson.com/product-images/1/3.jpg",
//       "https://cdn.dummyjson.com/product-images/1/4.jpg",
//       "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg"
//     ]
//   },

const CreateProductForm = () => {
  return (
    <div className="text-white mx-auto max-w-7xl py-6 sm:py-12 px-4 sm:px-16 lg:px-24">
      <form>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 ">Add Product</h2>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label htmlFor="name" className="block text-sm font-medium leading-6 ">
                  Product name
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md bg-white shadow-sm sm:max-w-md">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-2  :text-gray-400 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label htmlFor="description" className="block text-sm font-medium leading-6 ">
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5  shadow-sm :text-gray-400 sm:text-sm sm:leading-6"
                    defaultValue={''}
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="price" className="block text-sm font-medium leading-6 ">
                  Price
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="price"
                    id="price"
                    className="block w-full rounded-md border-0 py-1.5  shadow-sm  :text-gray-400 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="discount" className="block text-sm font-medium leading-6 ">
                  Discount (in %)
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="discount"
                    id="discount"
                    className="block w-full rounded-md border-0 py-1.5  shadow-sm  :text-gray-400 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="stock" className="block text-sm font-medium leading-6 ">
                  Stock
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="stock"
                    id="stock"
                    className="block w-full rounded-md border-0 py-1.5  shadow-sm  :text-gray-400 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              {/* thumbnail */}
              <div className="col-span-full">
                <span className="block text-sm font-medium leading-6 text-white">Thumbnail Image</span>
                <div className="mt-2 flex justify-center rounded-lg border-2 border-dashed border-white px-6 py-10">
                  <div className="text-center">
                    <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                    <div className="mt-4 flex text-sm leading-6 text-white">
                      <label
                        htmlFor="imageSrc"
                        className="relative cursor-pointer rounded-md bg-primary font-semibold text-white"
                      >
                        <span className="p-1">Upload a file</span>
                        <input id="imageSrc" name="imageSrc" type="file" className="sr-only" />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-white">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </div>

              {/* cover photos */}
              <div className="col-span-full -mb-8 text-base font-semibold">Add product images</div>
              <div className="col-span-3">
                <div className="mt-2 flex justify-center rounded-lg border-2 border-dashed border-white px-6 py-10">
                  <div className="text-center">
                    <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                    <div className="mt-4 flex text-sm leading-6 text-white">
                      <label
                        htmlFor="image1"
                        className="relative cursor-pointer rounded-md bg-primary font-semibold text-white"
                      >
                        <span className="p-1">Upload a file</span>
                        <input id="image1" name="image1" type="file" className="sr-only" />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-white">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </div>

              <div className="col-span-3">
                <div className="mt-2 flex justify-center rounded-lg border-2 border-dashed border-white px-6 py-10">
                  <div className="text-center">
                    <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                    <div className="mt-4 flex text-sm leading-6 text-white">
                      <label
                        htmlFor="image1"
                        className="relative cursor-pointer rounded-md bg-primary font-semibold text-white"
                      >
                        <span className="p-1">Upload a file</span>
                        <input id="image1" name="image1" type="file" className="sr-only" />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-white">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </div>

              <div className="col-span-3">
                <div className="mt-2 flex justify-center rounded-lg border-2 border-dashed border-white px-6 py-10">
                  <div className="text-center">
                    <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                    <div className="mt-4 flex text-sm leading-6 text-white">
                      <label
                        htmlFor="image3"
                        className="relative cursor-pointer rounded-md bg-primary font-semibold text-white"
                      >
                        <span className="p-1">Upload a file</span>
                        <input id="image3" name="image3" type="file" className="sr-only" />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-white">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </div>

              <div className="col-span-3">
                <div className="mt-2 flex justify-center rounded-lg border-2 border-dashed border-white px-6 py-10">
                  <div className="text-center">
                    <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                    <div className="mt-4 flex text-sm leading-6 text-white">
                      <label
                        htmlFor="image4"
                        className="relative cursor-pointer rounded-md bg-primary font-semibold text-white"
                      >
                        <span className="p-1">Upload a file</span>
                        <input id="image4" name="image4" type="file" className="sr-only" />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-white">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </div>

              {/* category */}
              <div className="sm:col-span-3">
                <label htmlFor="category" className="block text-sm font-medium leading-6 text-white">
                  Category
                </label>
                <div className="mt-2">
                  <select
                    id="category"
                    name="category"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm  sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option>Jeans</option>
                    <option>Shirt</option>
                    <option>T-shirt</option>
                    <option>Jackets</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-white pb-12">
            <div className="mt-10 space-y-10">
              <fieldset>
                <legend className="text-sm font-semibold leading-6 ">Size</legend>
                <div className="mt-6 space-y-6">
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="comments"
                        name="comments"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-primary"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label htmlFor="comments" className="font-medium ">
                        Comments
                      </label>
                    </div>
                  </div>
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="candidates"
                        name="candidates"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label htmlFor="candidates" className="font-medium ">
                        Candidates
                      </label>
                      <p className="text-black">Get notified when a candidate applies for a job.</p>
                    </div>
                  </div>
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="offers"
                        name="offers"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label htmlFor="offers" className="font-medium ">
                        Offers
                      </label>
                      <p className="text-black">Get notified when a candidate accepts or rejects an offer.</p>
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button type="button" className="text-sm font-semibold leading-6 ">
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProductForm;
