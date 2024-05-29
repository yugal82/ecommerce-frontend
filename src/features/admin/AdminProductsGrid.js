import React from 'react';
import AdminProductCard from './AdminProductCard';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteProductAsync } from '../product-list/productSlice';
import { ToastContainer, toast } from 'react-toastify';

const AdminProductsGrid = ({ products }) => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const handleDelete = (product) => {
    const selectedProduct = { ...product };
    selectedProduct.deleted = true;
    dispatch(deleteProductAsync(selectedProduct));
    toast.success('product deleted successfully', { position: 'bottom-right', autoClose: true, delay: 3000 });
    window.location.reload();
  };

  return (
    /* Product grid */
    <div className="w-full lg:col-span-3">
      <ToastContainer theme="dark" />
      <div className="">
        <div className="px-4 py-8 sm:px-6 sm:py-6 lg:px-8">
          <Link to="/admin/create-product" className="text-white bg-primary p-2 font-semibold rounded">
            Add new product
          </Link>
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 mt-6">
            {products.map((product, idx) => (
              <div key={product?.id}>
                <Link key={idx} to={`/admin/product-details/${product?.id}`} state={{ product }}>
                  <AdminProductCard product={product} />
                </Link>
                {product?.deleted && <div className="text-sm text-red-700 font-bold">Product is deleted</div>}
                {product?.stock === 0 && <div className="text-sm text-red-700 font-bold">Out of Stock</div>}
                <div className="mt-2 flex items-center justify-between">
                  <Link
                    to={`/admin/update-product/${product?.id}`}
                    state={{ product: product }}
                    className="text-white bg-primary px-2 py-1 rounded text-xs font-semibold"
                  >
                    Edit product
                  </Link>
                  {!product?.deleted && (
                    <button
                      onClick={() => handleDelete(product)}
                      className="text-white bg-red-700 px-2 py-1 rounded text-xs font-semibold"
                    >
                      Delete product
                    </button>
                  )}
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
