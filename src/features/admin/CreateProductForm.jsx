import React, { useState } from 'react';
import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { brands, categories, sizes, convertImageToBase64 } from '../../utils/constant';
import { useForm } from 'react-hook-form';

const CreateProductForm = () => {
  //states
  const [imageSrc, setImageSrc] = useState(null);
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  const [previewImageSrc, setPreviewImageSrc] = useState(false);
  const [previewImage1, setPreviewImage1] = useState(false);
  const [previewImage2, setPreviewImage2] = useState(false);
  const [previewImage3, setPreviewImage3] = useState(false);
  const [previewImage4, setPreviewImage4] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const convertAllImgToB64 = async (data) => {
    const thumbnailB64 = await convertImageToBase64(data?.imageSrc[0]);
    const image1B64 = await convertImageToBase64(data?.image1[0]);
    const image2B64 = await convertImageToBase64(data?.image2[0]);
    if (data?.image3[0]) {
      const image3B64 = await convertImageToBase64(data?.image3[0]);
      data.image3 = image3B64;
    } else data.image3 = '';

    if (data?.image4[0]) {
      const image4B64 = await convertImageToBase64(data?.image4[0]);
      data.image4 = image4B64;
    } else data.image4 = '';

    data.imageSrc = thumbnailB64;
    data.image1 = image1B64;
    data.image2 = image2B64;

    let images = [];
    Object.keys(data).map((key) => {
      if (key.includes('image') && key !== 'imageSrc') {
        if (data[key] !== '') images.push(data[key]);

        delete data[key];
      }
    });
    data.images = images;

    return data;
  };

  const renderImage = (image) => {
    return (
      <div className="p-2">
        <img className="w-full h-full rounded-lg" src={URL.createObjectURL(image)} alt="" />
      </div>
    );
  };

  return (
    <div className="text-white mx-auto max-w-7xl py-6 sm:py-12 px-4 sm:px-16 lg:px-24">
      <form
        onSubmit={handleSubmit(async (data) => {
          // convert files to base64 to store them as strings on the backend
          data = await convertAllImgToB64(data);
          console.log(data);
          //   dispatch the create product API here
          reset({
            name: '',
            price: '',
            stock: '',
            imageSrc: null,
            image1: null,
            image2: null,
            image3: null,
            image4: null,
            discount: '',
            description: '',
            category: '',
            brand: '',
            size: '',
          });
        })}
      >
        <div className="">
          <div className="border-b border-gray-900/10 pb-6">
            <h2 className="text-xl font-semibold ">Add Product</h2>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label htmlFor="name" className="block text-sm font-medium leading-6 ">
                  Product name
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md bg-white shadow-sm sm:max-w-md">
                    <input
                      type="text"
                      {...register('name', { required: 'Product must have a name' })}
                      id="name"
                      className="block flex-1 rounded-md border-0 py-1.5 pl-2 text-black sm:text-sm sm:leading-6"
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
                    {...register('description', { required: 'Product must have a description' })}
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 shadow-sm text-black sm:text-sm sm:leading-6"
                    defaultValue={''}
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
                    {...register('price', { required: 'Product must have a price which is greater than 0', min: 1 })}
                    id="price"
                    className="block w-full rounded-md border-0 py-1.5  shadow-sm  text-black sm:text-sm sm:leading-6"
                  />
                  <p className="text-red-500 font-semibold text-sm">{errors?.price?.message}</p>
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="discount" className="block text-sm font-medium leading-6 ">
                  Discount (in %)
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    {...register('discount', {
                      required: 'Product must have a name. If no discount - then enter 0',
                      min: 0,
                      max: 100,
                    })}
                    id="discount"
                    className="block w-full rounded-md border-0 py-1.5  shadow-sm  text-black sm:text-sm sm:leading-6"
                  />
                  <p className="text-red-500 font-semibold text-sm">{errors?.discount?.message}</p>
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="stock" className="block text-sm font-medium leading-6 ">
                  Stock
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    {...register('stock', { required: 'Product must be in stock', min: 1 })}
                    id="stock"
                    className="block w-full rounded-md border-0 py-1.5  shadow-sm  text-black sm:text-sm sm:leading-6"
                  />
                  <p className="text-red-500 font-semibold text-sm">{errors?.stock?.message}</p>
                </div>
              </div>

              {/* thumbnail */}
              <div className="sm:col-span-full">
                <span className="block text-sm font-medium leading-6 text-white">Thumbnail Image</span>
                <div className="relative mt-2 flex justify-center rounded-lg border-2 border-dashed border-white px-6 py-10">
                  {previewImageSrc && (
                    <XMarkIcon
                      onClick={() => {
                        setImageSrc(null);
                        setPreviewImageSrc(false);
                      }}
                      className="absolute top-2 right-2 w-8 cursor-pointer"
                    />
                  )}
                  {!previewImageSrc && (
                    <div className="text-center">
                      <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                      <div className="mt-4 flex items-center justify-center text-sm leading-6 text-white">
                        <label
                          htmlFor="imageSrc"
                          className="relative cursor-pointer rounded-md bg-primary font-semibold text-white"
                        >
                          <span className="p-1">Upload a file</span>
                          <input
                            {...register('imageSrc', {
                              required: 'Product must have a thumbnail image',
                              onChange: (e) => {
                                if (e?.target?.files) {
                                  setImageSrc(e.target.files[0]);
                                  setPreviewImageSrc(true);
                                }
                              },
                            })}
                            id="imageSrc"
                            type="file"
                            className="sr-only"
                          />
                        </label>
                      </div>
                      <p className="text-xs leading-5 text-white">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  )}
                  {previewImageSrc && renderImage(imageSrc)}
                </div>
                <p className="text-red-500 font-semibold text-sm">{errors?.imageSrc?.message}</p>
              </div>

              {/* cover photos */}
              <div className="sm:col-span-full grid grid-cols-1 sm:grid-cols-6 gap-4">
                <div className="col-span-full text-base font-semibold">Add product images</div>
                <div className="col-span-3">
                  <div className="relative mt-2 flex justify-center rounded-lg border-2 border-dashed border-white px-6 py-10">
                    {previewImage1 && (
                      <XMarkIcon
                        onClick={() => {
                          setImage1(null);
                          setPreviewImage1(false);
                        }}
                        className="absolute top-2 right-2 w-6 cursor-pointer"
                      />
                    )}
                    {!previewImage1 && (
                      <div className="text-center">
                        <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                        <div className="relative mt-4 flex items-center justify-center text-sm leading-6 text-white">
                          <label
                            htmlFor="image1"
                            className="relative cursor-pointer rounded-md bg-primary font-semibold text-white"
                          >
                            <span className="p-1">Upload a file</span>
                            <input
                              {...register('image1', {
                                required: 'Product must have some extra images',
                                onChange: (e) => {
                                  if (e?.target?.files) {
                                    setImage1(e.target.files[0]);
                                    setPreviewImage1(true);
                                  }
                                },
                              })}
                              id="image1"
                              type="file"
                              className="sr-only"
                            />
                          </label>
                        </div>
                        <p className="text-xs leading-5 text-white">PNG, JPG, GIF up to 10MB</p>
                      </div>
                    )}
                    {previewImage1 && renderImage(image1)}
                  </div>
                  <p className="text-red-500 font-semibold text-sm">{errors?.image1?.message}</p>
                </div>

                <div className="col-span-3">
                  <div className="relative mt-2 flex justify-center rounded-lg border-2 border-dashed border-white px-6 py-10">
                    {previewImage2 && (
                      <XMarkIcon
                        onClick={() => {
                          setImage2(null);
                          setPreviewImage2(false);
                        }}
                        className="absolute top-2 right-2 w-6 cursor-pointer"
                      />
                    )}
                    {!previewImage2 && (
                      <div className="text-center">
                        <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                        <div className="relative mt-4 flex items-center justify-center text-sm leading-6 text-white">
                          <label
                            htmlFor="image2"
                            className="relative cursor-pointer rounded-md bg-primary font-semibold text-white"
                          >
                            <span className="p-1">Upload a file</span>
                            <input
                              {...register('image2', {
                                required: 'Product must have some extra images',
                                onChange: (e) => {
                                  if (e?.target?.files) {
                                    setImage2(e.target.files[0]);
                                    setPreviewImage2(true);
                                  }
                                },
                              })}
                              id="image2"
                              type="file"
                              className="sr-only"
                            />
                          </label>
                        </div>
                        <p className="text-xs leading-5 text-white">PNG, JPG, GIF up to 10MB</p>
                      </div>
                    )}
                    {previewImage2 && renderImage(image2)}
                  </div>
                  <p className="text-red-500 font-semibold text-sm">{errors?.image2?.message}</p>
                </div>

                <div className="col-span-3">
                  <div className="relative mt-2 flex justify-center rounded-lg border-2 border-dashed border-white px-6 py-10">
                    {previewImage3 && (
                      <XMarkIcon
                        onClick={() => {
                          setImage3(null);
                          setPreviewImage3(false);
                        }}
                        className="absolute top-2 right-2 w-6 cursor-pointer"
                      />
                    )}
                    {!previewImage3 && (
                      <div className="text-center">
                        <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                        <div className="relative mt-4 flex items-center justify-center text-sm leading-6 text-white">
                          <label
                            htmlFor="image3"
                            className="relative cursor-pointer rounded-md bg-primary font-semibold text-white"
                          >
                            <span className="p-1">Upload a file</span>
                            <input
                              {...register('image3', {
                                required: 'Product must have some extra images',
                                onChange: (e) => {
                                  if (e?.target?.files) {
                                    setImage3(e.target.files[0]);
                                    setPreviewImage3(true);
                                  }
                                },
                              })}
                              id="image3"
                              type="file"
                              className="sr-only"
                            />
                          </label>
                        </div>
                        <p className="text-xs leading-5 text-white">PNG, JPG, GIF up to 10MB</p>
                      </div>
                    )}
                    {previewImage3 && renderImage(image3)}
                  </div>
                  <p className="text-red-500 font-semibold text-sm">{errors?.image3?.message}</p>
                </div>

                <div className="col-span-3">
                  <div className="relative mt-2 flex justify-center rounded-lg border-2 border-dashed border-white px-6 py-10">
                    {previewImage4 && (
                      <XMarkIcon
                        onClick={() => {
                          setImage4(null);
                          setPreviewImage4(false);
                        }}
                        className="absolute top-2 right-2 w-6 cursor-pointer"
                      />
                    )}
                    {!previewImage4 && (
                      <div className="text-center">
                        <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                        <div className="relative mt-4 flex items-center justify-center text-sm leading-6 text-white">
                          <label
                            htmlFor="image4"
                            className="relative cursor-pointer rounded-md bg-primary font-semibold text-white"
                          >
                            <span className="p-1">Upload a file</span>
                            <input
                              {...register('image4', {
                                required: 'Product must have some extra images',
                                onChange: (e) => {
                                  if (e?.target?.files) {
                                    setImage4(e.target.files[0]);
                                    setPreviewImage4(true);
                                  }
                                },
                              })}
                              id="image4"
                              type="file"
                              className="sr-only"
                            />
                          </label>
                        </div>
                        <p className="text-xs leading-5 text-white">PNG, JPG, GIF up to 10MB</p>
                      </div>
                    )}
                    {previewImage4 && renderImage(image4)}
                  </div>
                  <p className="text-red-500 font-semibold text-sm">{errors?.image4?.message}</p>
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
                    {...register('category', { required: 'Product must be in any of the categories' })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm  sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option></option>
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
                    {...register('brand', { required: 'Product must be of some kind of brand' })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm  sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option></option>
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
                        id="size"
                        {...register('size', { required: 'Product must have size' })}
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-primary"
                        value={size}
                      />
                      <label htmlFor="size" className="font-medium ml-2">
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

export default CreateProductForm;
