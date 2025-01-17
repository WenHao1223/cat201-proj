import { OrderInterface } from "@interfaces/API/UserInterface";
import handleApiCall from "@utils/handleApiCall";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import AsyncImage from "@components/AsyncImage";

const Admin: React.FC = () => {
    const [orderStatus, setOrderStatus] = useState<string>("Ordered");
    const [selectedColor, setSelectedColor] = useState<string>("Red");
    const [selectedSize, setSelectedSize] = useState<string>("Medium");
    const [selectedTab, setSelectedTab] = useState<string>("Tab 1");

    const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setOrderStatus(event.target.value);
    };

    const handleColorChange = (color: string) => {
        setSelectedColor(color);
    };

    const handleSizeChange = (size: string) => {
        setSelectedSize(size);
    };

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

    const orderQuantity = (productName: string) => {
        Swal.fire({
            title: `Order Quantity for ${productName}`,
            input: 'number',
            inputAttributes: {
                min: 1,
                step: 1
            },
            showCancelButton: true,
            confirmButtonText: 'Order',
            showLoaderOnConfirm: true,
            preConfirm: (quantity) => {
                // Handle the order quantity logic here
                console.log(`Ordered ${quantity} of ${productName}`);
            }
        });
    };

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="relative top-12">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        {selectedTab === "Tab 1" ? "Review Order Status" : "Order Product"}
                    </h1>
                    <div role="tablist" className="tabs tabs-lifted mt-12">
                        <input
                            type="radio"
                            name="my_tabs_2"
                            role="tab"
                            className="tab"
                            aria-label="Tab 1"
                            defaultChecked
                            onClick={() => setSelectedTab("Tab 1")}
                        />
                        <div role="tabpanel" className="tab-content bg-white border-base-300 rounded-box p-6">
                            {selectedTab === "Tab 1" && <div>table content1</div>}
                        </div>

                        <input
                            type="radio"
                            name="my_tabs_2"
                            role="tab"
                            className="tab"
                            aria-label="Tab 2"
                            onClick={() => setSelectedTab("Tab 2")}
                        />
                        <div role="tabpanel" className="tab-content bg-white border-base-300 rounded-box p-6">
                            <ul role="list" className="divide-y divide-gray-200 text-sm font-medium text-gray-900">
                                <li className="bg-gray-50 px-4 py-6 sm:p-6 lg:p-8 rounded-lg shadow-md flex items-start space-x-4 py-6 border-b border-gray-200 relative">
                                    <img src="https://placeholder.pics/svg/300x300" alt="Product 1" className="h-20 w-20 flex-none rounded-md object-cover object-center" />
                                    <div className="flex-auto space-y-1" style={{ textAlign: 'left' }}>
                                        <h3 className="font-bold">B001</h3>
                                        <h3>Product 1</h3>
                                        <select value={selectedColor} onChange={(e) => handleColorChange(e.target.value)} className="px-2 py-1 bg-gray-300 text-black rounded">
                                            <option value="Red">Red</option>
                                            <option value="Blue">Blue</option>
                                            <option value="Green">Green</option>
                                        </select>
                                        <select value={selectedSize} onChange={(e) => handleSizeChange(e.target.value)} className="px-2 py-1 bg-gray-300 text-black rounded">
                                            <option value="Small">Small</option>
                                            <option value="Medium">Medium</option>
                                            <option value="Large">Large</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <p className="text-gray-900">Stock On Hand: 20</p>
                                    </div>
                                    <button
                                        onClick={() => orderQuantity('Product 1')}
                                        className="absolute bottom-4 right-4 px-4 py-2 bg-blue-500 text-white rounded"
                                    >
                                        Order Quantity
                                    </button>
                                </li>
                                <li className="bg-gray-50 px-4 py-6 sm:p-6 lg:p-8 rounded-lg shadow-md flex items-start space-x-4 py-6 border-b border-gray-200 relative">
                                    <img src="https://placeholder.pics/svg/300x300" alt="Product 2" className="h-20 w-20 flex-none rounded-md object-cover object-center" />
                                    <div className="flex-auto space-y-1" style={{ textAlign: 'left' }}>
                                        <h3 className="font-bold">B001</h3>
                                        <h3>Product 2</h3>
                                        <select value={selectedColor} onChange={(e) => handleColorChange(e.target.value)} className="px-2 py-1 bg-gray-300 text-black rounded">
                                            <option value="Red">Red</option>
                                            <option value="Blue">Blue</option>
                                            <option value="Green">Green</option>
                                        </select>
                                        <select value={selectedSize} onChange={(e) => handleSizeChange(e.target.value)} className="px-2 py-1 bg-gray-300 text-black rounded">
                                            <option value="Small">Small</option>
                                            <option value="Medium">Medium</option>
                                            <option value="Large">Large</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <p className="text-gray-900">Stock On Hand: 15</p>
                                    </div>
                                    <button
                                        onClick={() => orderQuantity('Product 2')}
                                        className="absolute bottom-4 right-4 px-4 py-2 bg-blue-500 text-white rounded"
                                    >
                                        Order Quantity
                                    </button>
                                </li>
                                <li className="bg-gray-50 px-4 py-6 sm:p-6 lg:p-8 rounded-lg shadow-md flex items-start space-x-4 py-6 border-b border-gray-200 relative">
                                    <img src="https://placeholder.pics/svg/300x300" alt="Product 3" className="h-20 w-20 flex-none rounded-md object-cover object-center" />
                                    <div className="flex-auto space-y-1" style={{ textAlign: 'left' }}>
                                    <h3 className="font-bold">B001</h3>
                                        <h3>Product 3</h3>
                                        <select value={selectedColor} onChange={(e) => handleColorChange(e.target.value)} className="px-2 py-1 bg-gray-300 text-black rounded">
                                            <option value="Red">Red</option>
                                            <option value="Blue">Blue</option>
                                            <option value="Green">Green</option>
                                        </select>
                                        <select value={selectedSize} onChange={(e) => handleSizeChange(e.target.value)} className="px-2 py-1 bg-gray-300 text-black rounded">
                                            <option value="Small">Small</option>
                                            <option value="Medium">Medium</option>
                                            <option value="Large">Large</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <p className="text-gray-900">Stock On Hand: 10</p>
                                    </div>
                                    <button
                                        onClick={() => orderQuantity('Product 3')}
                                        className="absolute bottom-4 right-4 px-4 py-2 bg-blue-500 text-white rounded"
                                    >
                                        Order Quantity
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;