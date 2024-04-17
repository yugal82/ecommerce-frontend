import React, { useEffect, useState } from 'react';
import { Disclosure } from '@headlessui/react';
import { MinusIcon, PlusIcon } from '@heroicons/react/20/solid';

const FilterSidebar = ({ filters, getProductsByFiltersAsync, dispatch }) => {
  const [queryFilters, setQueryFilters] = useState({});

  const handleFilters = (e, section, option) => {
    const isChecked = e.target.checked;
    let newFilters = { ...queryFilters };
    if (isChecked) {
      newFilters[section.id] = option;
    } else {
      delete newFilters[section.id];
    }
    setQueryFilters(newFilters);
    dispatch(getProductsByFiltersAsync(newFilters));
  };

  useEffect(() => {
    dispatch(getProductsByFiltersAsync(queryFilters));
  }, [dispatch, queryFilters]);

  return (
    <form className="hidden lg:block w-3/12">
      {filters.map((section) => (
        <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
          {({ open }) => (
            <>
              <h3 className="-my-3 flow-root">
                <Disclosure.Button className="flex w-full items-center justify-between py-3 text-sm">
                  <span className="font-medium text-white">{section.name}</span>
                  <span className="ml-6 flex items-center">
                    {open ? (
                      <MinusIcon className="h-5 w-5 text-white hover:text-gray-300" aria-hidden="true" />
                    ) : (
                      <PlusIcon className="h-5 w-5 text-white hover:text-gray-300" aria-hidden="true" />
                    )}
                  </span>
                </Disclosure.Button>
              </h3>
              <Disclosure.Panel className="pt-6">
                <div className="space-y-4">
                  {section.options.map((option, optionIdx) => (
                    <div key={optionIdx} className="flex items-center">
                      <input
                        id={`filter-${section.id}-${optionIdx}`}
                        name={`${section.id}[]`}
                        defaultValue={option}
                        type="checkbox"
                        onClick={(e) => handleFilters(e, section, option)}
                        className="h-4 w-4 rounded border-gray-300 text-primary"
                      />
                      <label
                        htmlFor={`filter-${section.id}-${optionIdx}`}
                        className="capitalize ml-3 text-sm text-white"
                      >
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
    </form>
  );
};

export default FilterSidebar;
