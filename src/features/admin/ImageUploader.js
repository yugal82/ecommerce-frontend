import React from 'react';
import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/solid';

const ImageUploader = ({
  previewImage,
  setPreviewImage,
  image,
  setImage,
  label,
  renderImage,
  register,
  setError,
  clearErrors,
}) => {
  return (
    <div className="relative mt-2 flex justify-center rounded-lg border-2 border-dashed border-white px-6 py-10">
      {previewImage && (
        <XMarkIcon
          onClick={() => {
            setImage(null);
            setPreviewImage(false);
          }}
          className="absolute top-2 right-2 w-6 cursor-pointer"
        />
      )}
      {!previewImage && (
        <div className="text-center">
          <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
          <div className="relative mt-4 flex items-center justify-center text-sm leading-6 text-white">
            <label htmlFor={label} className="relative cursor-pointer rounded-md bg-primary font-semibold text-white">
              <span className="p-1">Upload a file</span>
              <input
                {...register(label, {
                  required: 'Product must have some extra images',
                  onChange: (e) => {
                    if (e?.target?.files) {
                      if (e?.target?.files[0].size > 25 * 1024) {
                        setError(label, { type: 'manual', message: 'Image size exceeded' });
                      } else {
                        clearErrors(label);
                        setImage(e.target.files[0]);
                        setPreviewImage(true);
                      }
                    }
                  },
                })}
                id={label}
                type="file"
                className="sr-only"
              />
            </label>
          </div>
          <p className="text-xs leading-5 text-white">PNG, JPG, up to 25kb</p>
        </div>
      )}
      {previewImage && renderImage(image)}
    </div>
  );
};

export default ImageUploader;
