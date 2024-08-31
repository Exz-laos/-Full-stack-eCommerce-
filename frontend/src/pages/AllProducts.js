import React, { useEffect, useState } from 'react';
import UploadProduct from '../components/UploadProduct';
import SummaryApi from '../common';
import AllProductTable from '../components/AdminProductTable';

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);

  const fetchAllProduct = async () => {
    const response = await fetch(SummaryApi.allProduct.url);
    const dataResponse = await response.json();

    setAllProduct(dataResponse?.data || []);
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);

  return (
    <div>
      <div className='bg-white py-2 px-4 flex justify-between items-center'>
        <h2 className='font-bold text-lg'>All Product</h2>
        <button
          className='border-2 border-yellow-600 text-yellow-600 hover:bg-yellow-600
             hover:text-white transition-all py-1 px-3 rounded-full'
          onClick={() => setOpenUploadProduct(true)}
        >
          Upload Product
        </button>
      </div>

      {/* All product table */}
      <div className='py-4 h-[calc(100vh-190px)] overflow-y-scroll'>
        <table className='w-full border-collapse table-auto'>
          <thead>
            <tr className='bg-yellow-700 text--black'>
              <th className='border border-gray-200 p-2 w-5'>Image</th>
              <th className='border border-gray-200 p-2'>Name</th>
              <th className='border border-gray-200 p-2'>Category</th>
              <th className='border border-gray-200 p-2'>Sell</th>
              <th className='border border-gray-200 p-2'>Quantity</th>
              <th className='border border-gray-200 p-2'>status</th>
              <th className='border border-gray-200 p-2'>Edit</th>
            </tr>
          </thead>
          <tbody>
            {allProduct.map((product, index) => (
              <AllProductTable data={product} key={product._id} fetchdata={fetchAllProduct} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Upload product component */}
      {openUploadProduct && (
        <UploadProduct onClose={() => setOpenUploadProduct(false)} fetchData={fetchAllProduct} />
      )}
    </div>
  );
};

export default AllProducts;
