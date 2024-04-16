import React from 'react';
import AdminProductCard from './AdminProductCard';
import { Link } from 'react-router-dom';

const AdminProductsGrid = ({ products }) => {
  return (
    /* Product grid */
    <div className="w-full lg:col-span-3">
      <div className="">
        <div className="px-4 py-8 sm:px-6 sm:py-6 lg:px-8">
          <Link to="/admin/create-product" className="text-white bg-primary p-2 font-semibold rounded">
            Add new product
          </Link>
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 mt-6">
            {products.map((product, idx) => (
              <div key={product.id}>
                <Link key={idx} to={`/admin/product-details/${product?.id}`} state={{ product }}>
                  <AdminProductCard product={product} />
                </Link>
                <div className="py-2 mt-1">
                  <button className="text-white bg-primary px-2 py-1 rounded text-sm font-semibold">
                    Edit product
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProductsGrid;
