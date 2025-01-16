import { OrderInterface } from "@interfaces/API/UserInterface";
import handleApiCall from "@utils/handleApiCall";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Admin: React.FC = () => {
    const [orderStatus, setOrderStatus] = useState<string>("Ordered");
    const [orders, setOrders] = useState<OrderInterface[]>([]);
    const [error, setError] = useState<string | null>(null);

    const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setOrderStatus(event.target.value);
    };

    const viewOrders = async () => {
        await handleApiCall(
            `users/allOrders`,
            "POST",
            null,
            async (result) => {
                console.log(result)
                if ((await result.status) == "Success") {
                    setOrders(
                        result.orders.map((order: string) => JSON.parse(order))
                    );
                } else {
                    setError("\n Error viewing orders: " + result.message);
                }
            },
            (error) => setError("\n Error viewing orders: " + error)
        );
    };

    useEffect(() => {
        viewOrders();
        console.log(orders);
    }, []);

    const showOrderDetails = (orderId: number) => {
        Swal.fire({
            title: 'Order Details',
            html: `
                <div style="text-align: left;">
                    <p><strong>Order ID:</strong> ${orderId}</p>
                    <p><strong>Order Date:</strong> 2023-10-01</p>
                    <p><strong>Payment Method:</strong> Credit Card</p>
                    <p><strong>Card Number:</strong> **** **** **** 1234</p>
                    <p><strong>Order Status:</strong> <span style="color: ${orderStatus === 'Ordered' ? 'red' : 'green'}">${orderStatus}</span></p>
                </div>
                <ul role="list" class="divide-y divide-gray-200 text-sm font-medium text-gray-900">
                    <li class="flex items-start space-x-4 py-6 border-b border-gray-200">
                        <img src="https://placeholder.pics/svg/300x300" alt="Product 1" class="h-20 w-20 flex-none rounded-md object-cover object-center" />
                        <div class="flex-auto space-y-1" style="text-align: left;">
                            <h3>Product 1</h3>
                            <p class="text-gray-500">Red</p>
                            <p class="text-gray-500">Medium</p>
                        </div>
                        <div class="flex flex-col items-end">
                            <p class="text-gray-900">$20.00</p>
                            ${2 > 1 ? '<p class="text-gray-500 self-end">x2</p>' : ''}
                        </div>
                    </li>
                    <li class="flex items-start space-x-4 py-6 border-b border-gray-200">
                        <img src="https://placeholder.pics/svg/300x300" alt="Product 2" class="h-20 w-20 flex-none rounded-md object-cover object-center" />
                        <div class="flex-auto space-y-1" style="text-align: left;">
                            <h3>Product 2</h3>
                            <p class="text-gray-500">Blue</p>
                            <p class="text-gray-500">Large</p>
                        </div>
                        <div class="flex flex-col items-end">
                            <p class="text-gray-900">$15.00</p>
                            ${1 > 1 ? '<p class="text-gray-500 self-end">x1</p>' : ''}
                        </div>
                    </li>
                    <li class="flex items-start space-x-4 py-6 border-b border-gray-200">
                        <img src="https://placeholder.pics/svg/300x300" alt="Product 3" class="h-20 w-20 flex-none rounded-md object-cover object-center" />
                        <div class="flex-auto space-y-1" style="text-align: left;">
                            <h3>Product 3</h3>
                            <p class="text-gray-500">Green</p>
                            <p class="text-gray-500">Small</p>
                        </div>
                        <div class="flex flex-col items-end">
                            <p class="text-gray-900">$10.00</p>
                            ${3 > 1 ? '<p class="text-gray-500 self-end">x3</p>' : ''}
                        </div>
                    </li>
                </ul>
                <dl class="space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-gray-900">
                    <div class="flex items-center justify-between">
                        <dt class="text-gray-600">Subtotal</dt>
                        <dd>$45.00</dd>
                    </div>
                    <div class="flex items-center justify-between">
                        <dt class="text-gray-600">Shipping</dt>
                        <dd>$5.00</dd>
                    </div>
                    <div class="flex items-center justify-between">
                        <dt class="text-gray-600">Taxes</dt>
                        <dd>$4.50</dd>
                    </div>
                    <div class="flex items-center justify-between border-t border-gray-200 pt-6">
                        <dt class="text-base">Total</dt>
                        <dd class="text-base">$54.50</dd>
                    </div>
                </dl>
            `,
            showCloseButton: true,
        });
    };

    const confirmOrder = () => {
        Swal.fire({
            title: "Confirm Order?",
            html: `
                <p><strong>Billing Address:</strong> 123 Main St, Kuala Lumpur</p>
                <p><strong>Shipping Address:</strong> 123 Main St, Kuala Lumpur</p>
            `,
            showDenyButton: true,
            confirmButtonText: "Confirm",
            denyButtonText: `Cancel`,
            denyButtonColor: '#6c757d', // Grey color for the cancel button
        }).then((result) => {
            if (result.isConfirmed) {
                setOrderStatus("Delivered");
                Swal.fire("Delivered!", "", "success");
            }
        });
    };

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="relative top-12">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Administrative
                    </h1>
                    <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
                        <section aria-labelledby="order-details-heading" className="lg:col-span-7">
                            <h2 id="order-details-heading" className="sr-only">
                                Order Details
                            </h2>
                            <div className="bg-gray-50 px-4 py-6 sm:p-6 lg:p-8 rounded-lg shadow-md">
                                <p className="mb-2"><strong>Order ID:</strong> 1</p>
                                <p className="mb-2"><strong>Order Date:</strong> 2023-10-01</p>
                                <p className="mb-4"><strong>Order Status:</strong> <span style={{ color: orderStatus === 'Ordered' ? 'red' : 'green' }}>{orderStatus}</span></p>
                                <div className="mt-4 flex justify-end space-x-4">
                                    <button
                                        onClick={() => showOrderDetails(1)}
                                        className="px-4 py-2 bg-blue-500 text-white rounded"
                                    >
                                        View Order
                                    </button>
                                    {orderStatus !== "Delivered" && (
                                        <button
                                            onClick={confirmOrder}
                                            className="px-4 py-2 bg-green-500 text-white rounded"
                                        >
                                            Confirm Order
                                        </button>
                                    )}
                                </div>
                            </div>
                        </section>
                        <section aria-labelledby="order-details-heading" className="lg:col-span-7 mt-8">
                            <h2 id="order-details-heading" className="sr-only">
                                Order Details
                            </h2>
                            <div className="bg-gray-50 px-4 py-6 sm:p-6 lg:p-8 rounded-lg shadow-md">
                                <p className="mb-2"><strong>Order ID:</strong> 2</p>
                                <p className="mb-2"><strong>Order Date:</strong> 2023-10-02</p>
                                <p className="mb-4"><strong>Order Status:</strong> <span style={{ color: orderStatus === 'Ordered' ? 'red' : 'green' }}>{orderStatus}</span></p>
                                <div className="mt-4 flex justify-end space-x-4">
                                    <button
                                        onClick={() => showOrderDetails(2)}
                                        className="px-4 py-2 bg-blue-500 text-white rounded"
                                    >
                                        View Order
                                    </button>
                                    {orderStatus !== "Delivered" && (
                                        <button
                                            onClick={confirmOrder}
                                            className="px-4 py-2 bg-green-500 text-white rounded"
                                        >
                                            Confirm Order
                                        </button>
                                    )}
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;