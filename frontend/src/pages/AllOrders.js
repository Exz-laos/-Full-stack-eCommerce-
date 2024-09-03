import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import moment from 'moment';
import Swal from 'sweetalert2';
import { FaEye } from "react-icons/fa";

const AllOrders = () => {
    const [allOrders, setAllOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null); // State to store the selected order

    const fetchAllOrders = async () => {
        try {
            const response = await fetch(SummaryApi.allOrders.url, {
                method: SummaryApi.allOrders.method,
                credentials: 'include',
            });
            const data = await response.json();

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

    const handleViewDetails = (order) => {
        setSelectedOrder(order); // Set the selected order
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
                                <FaEye className="cursor-pointer" onClick={() => handleViewDetails(order)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedOrder && (
                <div className="modal">
                    <h2>Order Details</h2>
                    <p><strong>Name:</strong> {selectedOrder.customerName} {selectedOrder.customerSurname}</p>
                    <p><strong>Phone:</strong> {selectedOrder.customerPhone}</p>
                    <p><strong>Whatsapp:</strong> {selectedOrder.customerWhatsapp}</p>
                    <p><strong>Shipping Choice:</strong> {selectedOrder.shippingChoiceName}</p>
                    <p><strong>Payment Date:</strong> {moment(selectedOrder.payDate).format('L')}</p>
                    <p><strong>Payment Time:</strong> {selectedOrder.payTime}</p>
                    <p><strong>Status:</strong> {displayStatusText(selectedOrder.status)}</p>
                    <p><strong>Note:</strong> {selectedOrder.note}</p>
                    <p><strong>Cart Items:</strong> {selectedOrder.cartItems.length}</p>
                    {/* Additional details can be added here */}
                    <button onClick={() => setSelectedOrder(null)}>Close</button>
                </div>
            )}
        </div>
    );
};

export default AllOrders;
