import React, { useState } from 'react';
import { CgClose } from "react-icons/cg";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast } from 'react-toastify';
import productCategory from '../helpers/productCategory';
import uploadImage from '../helpers/uploadImage';
import DisplayImage from './DisplayImage';
import SummaryApi from '../common';
import Swal from 'sweetalert2';

const AdminEditProduct = ({ onClose, productData, fetchdata }) => {
  const [data, setData] = useState({
    ...productData,
    productName: productData?.productName,
    brandName: productData?.brandName,
    category: productData?.category,
    productImage: productData?.productImage || [],
    description: productData?.description,
    price: productData?.price,
    sellingPrice: productData?.sellingPrice,
    quantity: productData?.quantity,
    available: productData?.available,
  });

  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
    const uploadImageCloudinary = await uploadImage(file);

    setData((prev) => ({
      ...prev,
      productImage: [...prev.productImage, uploadImageCloudinary.url]
    }));
  };

  const handleDeleteProductImage = (index) => {
    const newProductImage = [...data.productImage];
    newProductImage.splice(index, 1);

    setData((prev) => ({
      ...prev,
      productImage: newProductImage
    }));
  };

  const handleDescriptionChange = (value) => {
    setData((prev) => ({
      ...prev,
      description: value,
    }));
  };



const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch(SummaryApi.updateProduct.url, {
      method: SummaryApi.updateProduct.method,
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const responseData = await response.json();

    if (response.ok && responseData.success) {
      Swal.fire({
        title: 'Success!',
        text: responseData.message,
        icon: 'success',
        timer: 2000, // Auto-close after 2 seconds
        showConfirmButton: false, // Hide the confirm button
        willClose: () => {
          onClose(); // Close the modal or perform any other action
          fetchdata(); // Fetch the updated product data
        }
      });
    } else {
      Swal.fire({
        title: 'Error!',
        text: responseData.message || "Failed to update the product.",
        icon: 'error',
        timer: 2000, // Auto-close after 2 seconds
        showConfirmButton: false // Hide the confirm button
      });
    }
  } catch (error) {
    console.error("Update product error:", error);
    Swal.fire({
      title: 'Error!',
      text: "An error occurred while updating the product.",
      icon: 'error',
      timer: 2000, // Auto-close after 2 seconds
      showConfirmButton: false // Hide the confirm button
    });
  }
};


  const handleDeleteProduct = async () => {
    const productId = data._id;
  
    if (!productId) {
      console.error("Product ID is not available.");
      toast.error("Product ID is not available.");
      return;
    }
  
    // Show confirmation dialog using SweetAlert2
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });
  
    if (result.isConfirmed) {
      try {
        const response = await fetch(`${SummaryApi.deleteProduct.url}/${productId}`, {
          method: SummaryApi.deleteProduct.method,
          credentials: 'include',
          headers: {
            "Content-Type": "application/json"
          }
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const responseData = await response.json();
        if (responseData.success) {
          Swal.fire({
            title: 'Deleted!',
            text: 'Your product has been deleted.',
            icon: 'success',
            timer: 2000, // Auto-close after 2 seconds
            showConfirmButton: false, // Hide the confirm button
            willClose: () => {
              onClose(); // Close the modal or perform any other action
              fetchdata(); // Fetch the updated product data
            }
          });
        } else {
          throw new Error(responseData.message || "Unknown error");
        }
      } catch (error) {
        console.error("Delete product error:", error.message || error);
        Swal.fire({
          title: 'Error!',
          text: `Error deleting product: ${error.message || "Unknown error"}`,
          icon: 'error',
          timer: 2000, // Auto-close after 2 seconds
          showConfirmButton: false // Hide the confirm button
        });
      }
    }
  };
  return (
    <div className='fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
      <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>
        <div className='flex justify-between items-center pb-3'>
          <h2 className='font-bold text-lg'>Edit Product</h2>
          <div className='w-fit ml-auto text-2xl hover:text-yellow-600 cursor-pointer' onClick={onClose}>
            <CgClose />
          </div>
        </div>

        <form className='grid p-4 gap-2 overflow-y-scroll h-full pb-5' onSubmit={handleSubmit}>
          <label htmlFor='productName'>Product Name :</label>
          <input
            type='text'
            id='productName'
            placeholder='enter product name'
            name='productName'
            value={data.productName}
            onChange={handleOnChange}
            className='p-2 bg-slate-100 border rounded'
            required
          />

          <label htmlFor='brandName' className='mt-3'>Brand Name :</label>
          <input
            type='text'
            id='brandName'
            placeholder='enter brand name'
            value={data.brandName}
            name='brandName'
            onChange={handleOnChange}
            className='p-2 bg-slate-100 border rounded'
            required
          />

          <label htmlFor='category' className='mt-3'>Category :</label>
          <select
            required
            value={data.category}
            name='category'
            onChange={handleOnChange}
            className='p-2 bg-slate-100 border rounded'
          >
            <option value="">Select Category</option>
            {productCategory.map((el, index) => (
              <option value={el.value} key={el.value + index}>{el.label}</option>
            ))}
          </select>

          <label htmlFor='productImage' className='mt-3'>Product Image :</label>
          <label htmlFor='uploadImageInput'>
            <div className='p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer'>
              <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
                <span className='text-4xl'><FaCloudUploadAlt /></span>
                <p className='text-sm'>Upload Product Image</p>
                <input type='file' id='uploadImageInput' className='hidden' onChange={handleUploadProduct} />
              </div>
            </div>
          </label>

          <div>
            {data?.productImage[0] ? (
              <div className='flex items-center gap-2'>
                {data.productImage.map((el, index) => (
                  <div className='relative group' key={index}>
                    <img
                      src={el}
                      alt={el}
                      width={80}
                      height={80}
                      className='bg-slate-100 border cursor-pointer'
                      onClick={() => {
                        setOpenFullScreenImage(true);
                        setFullScreenImage(el);
                      }}
                    />
                    <div className='absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer' onClick={() => handleDeleteProductImage(index)}>
                      <MdDelete />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className='text-slate-500 text-sm'>No image uploaded</p>
            )}
          </div>

          <label htmlFor='description' className='mt-3'>Description :</label>
          <ReactQuill theme='snow' value={data.description} onChange={handleDescriptionChange} />

          <label htmlFor='price' className='mt-3'>Price :</label>
          <input
            type='text'
            id='price'
            placeholder='enter product price'
            value={data.price}
            name='price'
            onChange={handleOnChange}
            className='p-2 bg-slate-100 border rounded'
            required
          />

          <label htmlFor='sellingPrice' className='mt-3'>Selling Price :</label>
          <input
            type='text'
            id='sellingPrice'
            placeholder='enter product selling price'
            value={data.sellingPrice}
            name='sellingPrice'
            onChange={handleOnChange}
            className='p-2 bg-slate-100 border rounded'
            required
          />

          <label htmlFor='quantity' className='mt-3'>Quantity :</label>
          <input
            type='text'
            id='quantity'
            placeholder='enter product quantity'
            value={data.quantity}
            name='quantity'
            onChange={handleOnChange}
            className='p-2 bg-slate-100 border rounded'
            required
          />

          {/* Available toggle */}
          <label className='mt-3 flex items-center'>
            <input
              type='checkbox'
              checked={data.available}
              onChange={(e) => setData(prev => ({ ...prev, available: e.target.checked }))}
              className='mr-2'
            />
            Available
          </label>
          <button type='submit' className='bg-yellow-600 hover:bg-yellow-700 text-white p-2 rounded mt-4'>Update Product</button>
          <button type='button' onClick={handleDeleteProduct} className='bg-red-600 hover:bg-red-700 text-white p-2 rounded mt-4'>Delete Product</button>
        </form>
      </div>

      {openFullScreenImage && (
        <DisplayImage url={fullScreenImage} onClose={() => setOpenFullScreenImage(false)} />
      )}
    </div>
  );
};
export default AdminEditProduct;
