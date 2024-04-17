import React, { useState } from 'react';
import { brands, categories, sizes, convertImageToBase64 } from '../../utils/constant';
import { useForm } from 'react-hook-form';
import ImageUploader from './ImageUploader';
import { useDispatch } from 'react-redux';
import { createProductAsync } from '../product-list/productSlice';

const CreateProductForm = () => {
  const dispatch = useDispatch();

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
    formState: { errors },
  } = useForm();

  const handleFormSumbit = async (data) => {
    data = await convertAllImgToB64(data);
    data = converStringToNumber(data);
    dispatch(createProductAsync(data));
    reset();

    setImagesAndPreview();
  };

  const convertAllImgToB64 = async (data) => {
    const thumbnailB64 = await convertImageToBase64(data?.imageSrc[0]);
    const image1B64 = await convertImageToBase64(data?.image1[0]);
    const image2B64 = await convertImageToBase64(data?.image2[0]);
    const image3B64 = await convertImageToBase64(data?.image3[0]);
    const image4B64 = await convertImageToBase64(data?.image4[0]);

    data.imageSrc = thumbnailB64;
    data.image1 = image1B64;
    data.image2 = image2B64;
    data.image3 = image3B64;
    data.image4 = image4B64;

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

  const converStringToNumber = (data) => {
    data.price = Number(data.price);
    data.discount = Number(data.discount);
    data.stock = Number(data.stock);

    return data;
  };

  const setImagesAndPreview = () => {
    // reset images
    setImage1(null);
    setImage2(null);
    setImage3(null);
    setImage4(null);
    setImageSrc(null);

    setPreviewImageSrc(false);
    setPreviewImage1(false);
    setPreviewImage2(false);
    setPreviewImage3(false);
    setPreviewImage4(false);
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
      <form onSubmit={handleSubmit((data) => handleFormSumbit(data))}>
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
                <ImageUploader
                  previewImage={previewImageSrc}
                  setPreviewImage={setPreviewImageSrc}
                  image={imageSrc}
                  setImage={setImageSrc}
                  label="imageSrc"
                  renderImage={renderImage}
                  register={register}
                />
                <p className="text-red-500 font-semibold text-sm">{errors?.imageSrc?.message}</p>
              </div>

              {/* cover photos */}
              <div className="sm:col-span-full grid grid-cols-1 sm:grid-cols-6 gap-4">
                <div className="col-span-full text-base font-semibold">Add product images</div>
                <div className="col-span-3">
                  <ImageUploader
                    previewImage={previewImage1}
                    setPreviewImage={setPreviewImage1}
                    image={image1}
                    setImage={setImage1}
                    label="image1"
                    renderImage={renderImage}
                    register={register}
                  />
                  <p className="text-red-500 font-semibold text-sm">{errors?.image1?.message}</p>
                </div>

                <div className="col-span-3">
                  <ImageUploader
                    previewImage={previewImage2}
                    setPreviewImage={setPreviewImage2}
                    image={image2}
                    setImage={setImage2}
                    label="image2"
                    renderImage={renderImage}
                    register={register}
                  />
                  <p className="text-red-500 font-semibold text-sm">{errors?.image2?.message}</p>
                </div>

                <div className="col-span-3">
                  <ImageUploader
                    previewImage={previewImage3}
                    setPreviewImage={setPreviewImage3}
                    image={image3}
                    setImage={setImage3}
                    label="image3"
                    renderImage={renderImage}
                    register={register}
                  />
                  <p className="text-red-500 font-semibold text-sm">{errors?.image3?.message}</p>
                </div>

                <div className="col-span-3">
                  <ImageUploader
                    previewImage={previewImage4}
                    setPreviewImage={setPreviewImage4}
                    image={image4}
                    setImage={setImage4}
                    label="image4"
                    renderImage={renderImage}
                    register={register}
                  />
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
          <button onClick={() => setImagesAndPreview()} type="reset" className="text-sm font-semibold leading-6 ">
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
