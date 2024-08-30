// import React, { useEffect, useState } from 'react'
// import SummaryApi from '../common'
// import { toast } from 'react-toastify'
// import { MdModeEdit } from "react-icons/md";
// import displayKIPCurrency from '../helpers/displayCurrency';
// import AdminEditProduct from './AdminEditProduct';

// const AllProductTable = ({
//     data,
//     fetchdata

// }) => {
  
//     const [editProduct,setEditProduct] = useState(false)
//     const [allProduct,setAllProduct] = useState([])



    
//     const fetchAllUsers = async() =>{
//         const fetchData = await fetch(SummaryApi.allProduct.url,{
//             method : SummaryApi.allProduct.method,
//             credentials : 'include'
//         })

//         const dataResponse = await fetchData.json()

//         if(dataResponse.success){
//             setAllProduct(dataResponse.data)
//         }

//         if(dataResponse.error){
//             toast.error(dataResponse.message)
//         }


//     }

//     useEffect(()=>{
//         fetchAllUsers(0)
//     },[])

//   return (
//     <div className='bg-white pb-4'>
//         <table  className='w-full userTable'>
//             <thead>
//                 <tr className='bg-black text-white'>
//                     <th>Sr.</th>
//                     <th>image</th>
//                     <th>name</th>
//                     <th>category</th>
//                     <th>sell</th>
//                     <th>quantity</th>
//                     <th>edit</th>
//                 </tr>
//             </thead>
//             <tbody >
//                 {
//                     allProduct.map((el,index) => {
//                         return(
//                             <tr >
//                                 <td>{index+1}</td>
//                                 <td className='w-24 h-24 p-2'>
//                                     <img 
//                                         src={el?.productImage[0]} 
//                                         alt={el.productName} 
//                                         className="h-20 w-20 object-cover"
//                                     />
//                                 </td>
//                                 <td className="w-2 px-1 truncate max-w-xs">{el?.productName}</td>
//                                 <td>{el?.category}</td>
//                                 <td>{displayKIPCurrency(el.sellingPrice)}</td>
//                                 <td>{el?.quantity}</td>
//                                 <td>
//                                 <div className='w-fit ml-auto p-2 bg-green-100
//                                  hover:bg-green-600 rounded-full hover:text-white cursor-pointer'
//                                  onClick={()=>setEditProduct(true)} >
//                                 <MdModeEdit/>
//                                 </div>
//                                 {
//                                     editProduct && (
//                                         <AdminEditProduct
//                                          productData={data} onClose={()=>setEditProduct(false)} 
//                                           fetchdata={fetchdata}/>
//                                     )
//                                 }
//                                 </td>
//                             </tr>
//                         )
//                     })
//                 }
//             </tbody>
//         </table>


//     </div>
//   )
// }

// export default AllProductTable


import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { MdModeEdit } from "react-icons/md";
import displayKIPCurrency from '../helpers/displayCurrency';
import AdminEditProduct from './AdminEditProduct';

const AllProductTable = ({}) => {
    const [editProduct, setEditProduct] = useState(null); // Store the product being edited
    const [allProduct, setAllProduct] = useState([]);

    const fetchdata = async () => {
        try {
            const fetchData = await fetch(SummaryApi.allProduct.url, {
                method: SummaryApi.allProduct.method,
                credentials: 'include'
            });

            const dataResponse = await fetchData.json();

            if (dataResponse.success) {
                setAllProduct(dataResponse.data);
            } else {
                toast.error(dataResponse.message);
            }
        } catch (error) {
            toast.error("Failed to fetch products.");
        }
    };

    useEffect(() => {
        fetchdata(); // Fetch data on component mount
    }, []);

    return (
        <div className='flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll'>
            <table className='w-full userTable'>
                <thead>
                    <tr className='bg-black text-white'>
                        <th>Sr.</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Sell</th>
                        <th>Quantity</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {allProduct.map((el, index) => (
                        <tr key={el._id}>
                            <td>{index + 1}</td>
                            <td className='w-24 h-24 p-2'>
                                <img
                                    src={el?.productImage[0]}
                                    alt={el.productName}
                                    className="h-20 w-20 object-cover"
                                />
                            </td>
                            <td className="w-2 px-1 truncate max-w-xs">{el?.productName}</td>
                            <td>{el?.category}</td>
                            <td>{displayKIPCurrency(el.sellingPrice)}</td>
                            <td>{el?.quantity}</td>
                            <td>
                                <div className='w-fit ml-auto p-2 bg-green-100
                                 hover:bg-green-600 rounded-full hover:text-white cursor-pointer'
                                    onClick={() => setEditProduct(el)}
                                >
                                    <MdModeEdit />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {editProduct && (
                <AdminEditProduct
                    productData={editProduct}
                    onClose={() => setEditProduct(null)}
                    fetchdata={fetchdata} // Pass the fetchdata function
                />
            )}
        </div>
    );
};

export default AllProductTable;


