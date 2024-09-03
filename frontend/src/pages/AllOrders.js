import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import moment from 'moment';
import Swal from 'sweetalert2';
import { FaEye } from "react-icons/fa";

const AllOrders = () => {
    const [allOrders, setAllOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null); // For storing the selected order details
    const [openOrderDetail, setOpenOrderDetail] = useState(false);
   

    // const fetchAllOrders = async () => {
    //     try {
    //         const response = await fetch(SummaryApi.allOrders.url, {
    //             method: SummaryApi.allOrders.method,
    //             credentials: 'include',
    //         });
    //         const data = await response.json();

    //         if (data.success) {
    //             setAllOrders(data.data);
    //         } else {
    //             toast.error(data.message);
    //         }
    //     } catch (error) {
    //         toast.error("Failed to fetch orders. Please try again.");
    //     }
    // };
    const fetchAllOrders = async () => {
        try {
            const response = await fetch(SummaryApi.allOrders.url, {
                method: SummaryApi.allOrders.method,
                credentials: 'include',
            });
            const data = await response.json();
    
            console.log(data);  // Check if cartItems are populated correctly
    
            if (data.success) {
                setAllOrders(data.data);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Failed to fetch orders. Please try again.");
        }
    };
    



    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            const response = await fetch(SummaryApi.updateOrderStatus.url(orderId, newStatus), {
                method: SummaryApi.updateOrderStatus.method,
                credentials: 'include',
            });
            const data = await response.json();

            if (data.success) {
                setAllOrders(prevOrders =>
                    prevOrders.map(order =>
                        order._id === orderId ? { ...order, status: newStatus } : order
                    )
                );
            } else {
                toast.error(data.message || "Failed to update order status.");
            }
        } catch (error) {
            toast.error("Failed to update order status. Please try again.");
        }
    };

    const handlePay = async (orderId) => {
        try {
            const result = await Swal.fire({
                title: 'Confirm Payment',
                text: 'You received payment and verified your information',
                icon: 'question',
                showCancelButton: true,
                showConfirmButton: true
            });

            if (result.isConfirmed) {
                await updateOrderStatus(orderId, 'pay');
            }
        } catch (e) {
            Swal.fire({
                title: 'Error',
                text: e.message,
                icon: 'error'
            });
        }
    };

    const handleSend = async (orderId) => {
        try {
            const result = await Swal.fire({
                title: 'Confirm Shipping',
                text: 'You want to mark this order as shipped',
                icon: 'question',
                showCancelButton: true,
                showConfirmButton: true
            });

            if (result.isConfirmed) {
                await updateOrderStatus(orderId, 'send');
            }
        } catch (e) {
            Swal.fire({
                title: 'Error',
                text: e.message,
                icon: 'error'
            });
        }
    };

    const handleCancel = async (orderId) => {
        try {
            const result = await Swal.fire({
                title: 'Confirm Cancel',
                text: 'You want to cancel this order',
                icon: 'question',
                showCancelButton: true,
                showConfirmButton: true
            });

            if (result.isConfirmed) {
                await updateOrderStatus(orderId, 'cancel');
            }
        } catch (e) {
            Swal.fire({
                title: 'Error',
                text: e.message,
                icon: 'error'
            });
        }
    };

    const handleReset = async (orderId) => {
        try {
            const result = await Swal.fire({
                title: 'Confirm Reset',
                text: 'You want to reset this order status to "wait"',
                icon: 'question',
                showCancelButton: true,
                showConfirmButton: true
            });

            if (result.isConfirmed) {
                await updateOrderStatus(orderId, 'wait');
            }
        } catch (e) {
            Swal.fire({
                title: 'Error',
                text: e.message,
                icon: 'error'
            });
        }
    };

    const displayStatusText = (status) => {
        if (status === 'wait') {
            return <div className="lao-text bg-yellow-200 rounded-full">ກຳລັງຖ້າກວດສອບ..!</div>;
        }
        if (status === 'pay') {
            return <div className="lao-text bg-green-500 rounded-full">ຢືນຢັນການໂອນ</div>;
        }
        if (status === 'send') {
            return <div className="lao-text bg-blue-200 rounded-full">Shipped successfully</div>;
        }
        if (status === 'cancel') {
            return <div className="lao-text bg-red-500 rounded-full">ຍົກເລີກແລ້ວ</div>;
        }
        return <div className="badge bg-secondary">Unknown</div>;
    };

    const handleSeeOrderDetail = (order) => {
        console.log(order); // Check if cartItems are present and populated
        setSelectedOrder(order);
        setOpenOrderDetail(true);
    };
    

  

    useEffect(() => {
        fetchAllOrders();
    }, []);

    return (
        <div className='bg-white pb-4'>
            <table className='w-full userTable'>
                <thead>
                    <tr className='bg-black text-white'>
                        <th>Name</th>
                        <th>Whatsapp</th>
                        <th>Paid Date</th>
                        <th>Paid Time</th>
                        <th>Status</th>
                        <th>Actions</th>
                        <th>Detail</th>
                    </tr>
                </thead>
                <tbody>
                    {allOrders.map((order) => (
                        <tr key={order._id}>
                            <td>{order.customerName + " " + order.customerSurname}</td>
                            <td>{order.customerWhatsapp}</td>
                            <td>{moment(order.payDate).format('L')}</td>
                            <td>{order.payTime}</td>
                            <td>{displayStatusText(order.status)}</td>
                            <td>
                                <button
                                    className='bg-yellow-100 p-2 rounded-full cursor-pointer hover:bg-yellow-500'
                                    onClick={() => handleReset(order._id)}
                                    disabled={order.status === 'wait'}>
                                    Reset to Wait
                                </button>
                                <button
                                    className='bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500'
                                    onClick={() => handlePay(order._id)}
                                    disabled={order.status !== 'wait'}>
                                    ຢືນຢັນການໂອນ
                                </button>
                                <button
                                    className='bg-blue-100 p-2 rounded-full cursor-pointer hover:bg-blue-500'
                                    onClick={() => handleSend(order._id)}
                                    disabled={order.status !== 'pay'}>
                                    Mark as Shipped
                                </button>
                                <button
                                    className='bg-red-100 p-2 rounded-full cursor-pointer hover:bg-red-500'
                                    onClick={() => handleCancel(order._id)}
                                    disabled={order.status === 'cancel'}>
                                    Cancel Order
                                </button>
                            </td>
                            <td>
                                <FaEye className="cursor-pointer" onClick={() => handleSeeOrderDetail(order)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

 {/* Order Detail Modal */}
 {openOrderDetail && selectedOrder && (
                <div className="order-details-modal">
                    <h2>Order Details for {selectedOrder.customerName} {selectedOrder.customerSurname}</h2>
                    <p>Whatsapp: {selectedOrder.customerWhatsapp}</p>
                    <p>Pay Date: {moment(selectedOrder.payDate).format('L')}</p>
                    <p>Pay Time: {selectedOrder.payTime}</p>
                    <p>Status: {displayStatusText(selectedOrder.status)}</p>
                    <h3>Cart Items</h3>
                    <ul>
                        {selectedOrder.cartItems && selectedOrder.cartItems.length > 0 ? (
                            selectedOrder.cartItems.map((item, index) => (
                                <li key={index}>
                                    <p>Product Name: {item.productId.productName}</p>
                                    <p>Quantity: {item.quantity}</p>
                                    <p>Price: {item.productId.price}</p>
                                </li>
                            ))
                        ) : (
                            <p>No items found in the cart.</p>
                        )}
                    </ul>
                    <button onClick={() => setOpenOrderDetail(false)}>Close</button>
                </div>
            )}



        </div>
    );
};

export default AllOrders;