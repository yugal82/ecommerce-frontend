import React from 'react';

const InputField = ({ label, inputType, name, id, divClass, autoComplete }) => {
  return (
    <div className={divClass}>
      <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-white">
        {label}
      </label>
      <div className="mt-2">
        <input
          type={inputType}
          name={name}
          id={id}
          autoComplete={autoComplete}
          className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  );
};

export default InputField;
