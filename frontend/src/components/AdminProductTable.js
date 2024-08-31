
import React, { useState } from 'react';

import { MdModeEdit  } from "react-icons/md";
import { MdCheckCircle, MdCancel } from 'react-icons/md';
import displayKIPCurrency from '../helpers/displayCurrency';
import AdminEditProduct from './AdminEditProduct';

const AllProductTable = ({
    data,
    fetchdata

}) => {
    const [editProduct, setEditProduct] = useState(null); // Store the product being edited

    return (
      <>
        <tr key={data._id} className="border border-gray-200">
          <td className='border border-gray-200 p-2'>
            <img
              src={data?.productImage[0]}
              alt={data.productName}
              className="h-20 w-20 object-cover"
            />
          </td>
          <td className="border border-gray-200 p-2 truncate max-w-xs">{data?.productName}</td>
          <td className='border border-gray-200 p-2'>{data?.category}</td>
          <td className='border border-gray-200 p-2'>{displayKIPCurrency(data.sellingPrice)}</td>
          <td className='border border-gray-200 p-2'>{data?.quantity}</td>
          <td className='border border-gray-200 p-2'>
  {data?.available ? <MdCheckCircle className="text-green-500" /> : <MdCancel className="text-red-500" />}
</td>

          <td className='border border-gray-200 p-2'>
            <div className='w-fit ml-auto p-2 bg-green-100
               hover:bg-green-600 rounded-full hover:text-white cursor-pointer'
              onClick={() => setEditProduct(data)}
            >
              <MdModeEdit />
            </div>
          </td>
        </tr>
  
        {/* Edit Product Modal */}
        {editProduct && (
          <AdminEditProduct
            productData={editProduct}
            onClose={() => setEditProduct(null)}
            fetchdata={fetchdata}
          />
        )}
      </>
    );
};


export default AllProductTable;


