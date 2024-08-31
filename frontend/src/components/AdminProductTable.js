
import React, { useState } from 'react';

import { MdModeEdit } from "react-icons/md";
import displayKIPCurrency from '../helpers/displayCurrency';
import AdminEditProduct from './AdminEditProduct';

const AllProductTable = ({
    data,
    fetchdata

}) => {
    const [editProduct, setEditProduct] = useState(null); // Store the product being edited

  return (
    <>
      <tr key={data._id}>
        <td className='w-24 h-24 p-2'>
          <img
            src={data?.productImage[0]}
            alt={data.productName}
            className="h-20 w-20 object-cover"
          />
        </td>
        <td className="w-2 px-1 truncate max-w-xs">{data?.productName}</td>
        <td>{data?.category}</td>
        <td>{displayKIPCurrency(data.sellingPrice)}</td>
        <td>{data?.quantity}</td>
        <td>
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


