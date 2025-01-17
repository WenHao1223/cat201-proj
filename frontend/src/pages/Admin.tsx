import { OrderInterface } from "@interfaces/API/UserInterface";
import handleApiCall from "@utils/handleApiCall";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import AsyncImage from "@components/AsyncImage";

const Admin: React.FC = () => {
    const [orders, setOrders] = useState<OrderInterface[]>([]);
    const [specificOrder, setSpecificOrder] = useState<OrderInterface | null>(
        null
    );
    const [shippingTotal, setShippingTotal] = useState<number>(0);
    const [taxTotal, setTaxTotal] = useState<number>(0);

    const [orderStatus, setOrderStatus] = useState<string>("Ordered");
    const [selectedColor, setSelectedColor] = useState<string>("Red");
    const [selectedSize, setSelectedSize] = useState<string>("Medium");
    const [selectedTab, setSelectedTab] = useState<string>("Tab 1");

    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (
            specificOrder?.cartProducts &&
            specificOrder?.cartProducts.length > 0
        ) {
            if (
                specificOrder?.orderTotal < 150 &&
                specificOrder?.orderTotal > 0
            ) {
                setShippingTotal(5);
            }
            if (
                specificOrder?.orderTotal >= 150 ||
                specificOrder?.orderTotal === 0
            ) {
                setShippingTotal(0);
            }
            setTaxTotal(specificOrder?.orderTotal * 0.06);
        }
    }, [specificOrder]);

    const viewOrders = async () => {
        await handleApiCall(
            `users/allOrders`,
            "POST",
            null,
            async (result) => {
                console.log(result);
                if ((await result.status) == "Success") {
                    console.log(result.orders);
                    setOrders(result.orders);
                } else {
                    setError("\n Error viewing orders: " + result.message);
                }
            },
            (error) => setError("\n Error viewing orders: " + error)
        );
    };

    const viewSpecificOrder = async (orderID: number, email: string) => {
        await handleApiCall(
            `users/orders/${orderID}?email=${email}`,
            "GET",
            null,
            async (result) => {
                if ((await result.status) == "Success") {
                    console.log(JSON.parse(result.order[0]));
                    setSpecificOrder(JSON.parse(result.order[0]));
                } else {
                    setError(
                        "\n Error viewing specific order: " + result.message
                    );
                }
            },
            (error) => setError("\n Error viewing specific order: " + error)
        );
    };

    const handleStatusChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setOrderStatus(event.target.value);
    };

    const handleColorChange = (color: string) => {
        setSelectedColor(color);
    };

    const handleSizeChange = (size: string) => {
        setSelectedSize(size);
    };

    useEffect(() => {
        viewOrders();
    }, []);

    const showOrderDetails = async (order: OrderInterface) => {
        await viewSpecificOrder(order.orderID, order.email!);
        if (!specificOrder) return;

        Swal.fire({
            title: "Order Details",
            html: `
                <div style="text-align: left;">
                    <p><strong>Order ID:</strong> ${order.orderID}</p>
                    <p><strong>Order Date:</strong> ${order.orderDate}</p>
                    <p><strong>Order Status:</strong> <span style="color: ${
                        order.orderStatus === "Ordered"
                            ? "red"
                            : order.orderStatus === "Cancelled"
                            ? "gray"
                            : "green"
                    }">${order.orderStatus}</span></p>
                </div>
                <ul role="list" class="divide-y divide-gray-200 text-sm font-medium text-gray-900">
                    ${order.cartProducts
                        .map(
                            (product, index) => `
                        <li class="flex items-start space-x-4 py-6 border-b border-gray-200">
                            <div id="async-image-${index}" class="h-20 w-20 flex-none rounded-md object-cover object-center"></div>
                            <div class="flex-auto space-y-1" style="text-align: left;">
                                <h3>${product.name}</h3>
                                <p class="text-gray-500">${product.color}</p>
                                <p class="text-gray-500">${product.size}</p>
                            </div>
                            <div class="flex flex-col items-end">
                                <p class="text-gray-900">RM ${product.price.toFixed(
                                    2
                                )}</p>
                                ${
                                    product.quantity > 1
                                        ? `<p class="text-gray-500 self-end">x${product.quantity}</p>`
                                        : ""
                                }
                            </div>
                        </li>
                    `
                        )
                        .join("")}
                </ul>
                <dl class="space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-gray-900">
                    <div class="flex items-center justify-between">
                        <dt class="text-gray-600">Subtotal</dt>
                        <dd>RM ${order.orderTotal.toFixed(2)}</dd>
                    </div>
                    <div class="flex items-center justify-between">
                        <dt class="text-gray-600">Shipping</dt>
                        <dd>RM ${shippingTotal.toFixed(2)}</dd>
                    </div>
                    <div class="flex items-center justify-between">
                        <dt class="text-gray-600">Taxes</dt>
                        <dd>RM ${taxTotal.toFixed(2)}</dd>
                    </div>
                    <div class="flex items-center justify-between border-t border-gray-200 pt-6">
                        <dt class="text-base">Total</dt>
                        <dd class="text-base">RM ${(
                            order.orderTotal +
                            shippingTotal +
                            taxTotal
                        ).toFixed(2)}</dd>
                    </div>
                </dl>
            `,
            showCloseButton: true,
            didOpen: () => {
                order.cartProducts.forEach((product, index) => {
                    const container = document.getElementById(
                        `async-image-${index}`
                    );
                    if (container) {
                        const imgElement = document.createElement("img");
                        import(
                            `../assets/images/${
                                product.productID
                            }/${product.color
                                .toLowerCase()
                                .replace(" ", "")}-${0}.webp`
                        )
                            .then((module) => {
                                imgElement.src = module.default;
                            })
                            .catch((error) => {
                                console.error("Error loading image:", error);
                            });
                        imgElement.alt = product.name;
                        imgElement.className =
                            "h-20 w-20 flex-none rounded-md object-cover object-center";
                        container.appendChild(imgElement);
                    }
                });
            },
        });
    };

    const confirmOrder = (order: OrderInterface) => {
        Swal.fire({
            title: "Confirm Order?",
            html: `
                <p><strong>Billing Address:</strong> ${order.billingAddress}</p>
                <p><strong>Shipping Address:</strong> ${order.shippingAddress}</p>
            `,
            showDenyButton: true,
            confirmButtonText: "Confirm",
            denyButtonText: `Cancel`,
            denyButtonColor: "#6c757d", // Grey color for the cancel button
        }).then(async (result) => {
            if (result.isConfirmed) {
                await handleApiCall(
                    `users/orders/deliver`,
                    "PUT",
                    {
                        email: order?.email,
                        orderID: order?.orderID,
                    },
                    async (result) => {
                        if ((await result.status) == "Success") {
                            console.log(result.orders);
                            viewOrders();
                        } else {
                            setError(
                                "\n Error cancelling order: " + result.message
                            );
                        }
                    },
                    (error) => setError("\n Error cancelling order: " + error)
                );
            }
        });
    };

    const orderQuantity = (productName: string) => {
        Swal.fire({
            title: `Order Quantity for ${productName}`,
            html: `
                <input type="number" id="quantity" class="swal2-input" min="1" step="1">
            `,
            showCancelButton: true,
            confirmButtonText: "Order",
            showLoaderOnConfirm: true,
            preConfirm: () => {
                const quantity = (
                    document.getElementById("quantity") as HTMLInputElement
                ).value;
                // Handle the order quantity logic here
                console.log(`Ordered ${quantity} of ${productName}`);
            },
        });
    };

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="relative top-12">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        {selectedTab === "Tab 1"
                            ? "Review Order Status"
                            : "Order Product"}
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
                        <div
                            role="tabpanel"
                            className="tab-content bg-white border-base-300 rounded-box p-6"
                        >
                            {selectedTab === "Tab 1" && (
                                <div>
                                    {orders.map((order) => (
                                        <section
                                            key={order.orderID}
                                            aria-labelledby="order-details-heading"
                                            className="lg:col-span-7 mb-6"
                                        >
                                            <h2
                                                id="order-details-heading"
                                                className="sr-only"
                                            >
                                                Order Details
                                            </h2>
                                            <div className="bg-gray-50 px-4 py-6 sm:p-6 lg:p-8 rounded-lg shadow-md">
                                                <p className="mb-2">
                                                    <strong>Order ID:</strong>{" "}
                                                    {order.orderID}
                                                </p>
                                                <p className="mb-2">
                                                    <strong>Order Date:</strong>{" "}
                                                    {order.orderDate}
                                                </p>
                                                <p className="mb-4">
                                                    <strong>
                                                        Order Status:
                                                    </strong>{" "}
                                                    <span
                                                        style={{
                                                            color:
                                                                order.orderStatus ===
                                                                "Ordered"
                                                                    ? "red"
                                                                    : order.orderStatus ===
                                                                      "Cancelled"
                                                                    ? "gray"
                                                                    : "green",
                                                        }}
                                                    >
                                                        {order.orderStatus}
                                                    </span>
                                                </p>
                                                <div className="mt-4 flex justify-end space-x-4">
                                                    <button
                                                        onClick={() =>
                                                            showOrderDetails(
                                                                order
                                                            )
                                                        }
                                                        className="px-4 py-2 bg-blue-500 text-white rounded"
                                                    >
                                                        View Order
                                                    </button>
                                                    {order.orderStatus ===
                                                        "Ordered" && (
                                                        <button
                                                            onClick={() =>
                                                                confirmOrder(
                                                                    order
                                                                )
                                                            }
                                                            className="px-4 py-2 bg-green-500 text-white rounded"
                                                        >
                                                            Confirm Order
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </section>
                                    ))}
                                </div>
                            )}
                        </div>

                        <input
                            type="radio"
                            name="my_tabs_2"
                            role="tab"
                            className="tab"
                            aria-label="Tab 2"
                            onClick={() => setSelectedTab("Tab 2")}
                        />
                        <div
                            role="tabpanel"
                            className="tab-content bg-white border-base-300 rounded-box p-6"
                        >
                            <ul
                                role="list"
                                className="divide-y divide-gray-200 text-sm font-medium text-gray-900"
                            >
                                <li className="bg-gray-50 px-4 py-6 sm:p-6 lg:p-8 rounded-lg shadow-md flex items-start space-x-4 border-b border-gray-200 relative">
                                    <img
                                        src="https://placeholder.pics/svg/300x300"
                                        alt="Product 1"
                                        className="h-20 w-20 flex-none rounded-md object-cover object-center"
                                    />
                                    <div
                                        className="flex-auto space-y-1"
                                        style={{ textAlign: "left" }}
                                    >
                                        <h3 className="font-bold">B001</h3>
                                        <h3>Product 1</h3>
                                        <select
                                            value={selectedColor}
                                            onChange={(e) =>
                                                handleColorChange(
                                                    e.target.value
                                                )
                                            }
                                            className="px-2 py-1 bg-gray-300 text-black rounded"
                                        >
                                            <option value="Red">Red</option>
                                            <option value="Blue">Blue</option>
                                            <option value="Green">Green</option>
                                        </select>
                                        <select
                                            value={selectedSize}
                                            onChange={(e) =>
                                                handleSizeChange(e.target.value)
                                            }
                                            className="px-2 py-1 bg-gray-300 text-black rounded"
                                        >
                                            <option value="Small">Small</option>
                                            <option value="Medium">
                                                Medium
                                            </option>
                                            <option value="Large">Large</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <p className="text-gray-900">
                                            Stock On Hand: 20
                                        </p>
                                    </div>
                                    <button
                                        onClick={() =>
                                            orderQuantity("Product 1")
                                        }
                                        className="absolute bottom-4 right-4 px-4 py-2 bg-blue-500 text-white rounded"
                                    >
                                        Order Quantity
                                    </button>
                                </li>
                                <li className="bg-gray-50 px-4 py-6 sm:p-6 lg:p-8 rounded-lg shadow-md flex items-start space-x-4 border-b border-gray-200 relative">
                                    <img
                                        src="https://placeholder.pics/svg/300x300"
                                        alt="Product 2"
                                        className="h-20 w-20 flex-none rounded-md object-cover object-center"
                                    />
                                    <div
                                        className="flex-auto space-y-1"
                                        style={{ textAlign: "left" }}
                                    >
                                        <h3 className="font-bold">B001</h3>
                                        <h3>Product 2</h3>
                                        <select
                                            value={selectedColor}
                                            onChange={(e) =>
                                                handleColorChange(
                                                    e.target.value
                                                )
                                            }
                                            className="px-2 py-1 bg-gray-300 text-black rounded"
                                        >
                                            <option value="Red">Red</option>
                                            <option value="Blue">Blue</option>
                                            <option value="Green">Green</option>
                                        </select>
                                        <select
                                            value={selectedSize}
                                            onChange={(e) =>
                                                handleSizeChange(e.target.value)
                                            }
                                            className="px-2 py-1 bg-gray-300 text-black rounded"
                                        >
                                            <option value="Small">Small</option>
                                            <option value="Medium">
                                                Medium
                                            </option>
                                            <option value="Large">Large</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <p className="text-gray-900">
                                            Stock On Hand: 15
                                        </p>
                                    </div>
                                    <button
                                        onClick={() =>
                                            orderQuantity("Product 2")
                                        }
                                        className="absolute bottom-4 right-4 px-4 py-2 bg-blue-500 text-white rounded"
                                    >
                                        Order Quantity
                                    </button>
                                </li>
                                <li className="bg-gray-50 px-4 py-6 sm:p-6 lg:p-8 rounded-lg shadow-md flex items-start space-x-4 border-b border-gray-200 relative">
                                    <img
                                        src="https://placeholder.pics/svg/300x300"
                                        alt="Product 3"
                                        className="h-20 w-20 flex-none rounded-md object-cover object-center"
                                    />
                                    <div
                                        className="flex-auto space-y-1"
                                        style={{ textAlign: "left" }}
                                    >
                                        <h3 className="font-bold">B001</h3>
                                        <h3>Product 3</h3>
                                        <select
                                            value={selectedColor}
                                            onChange={(e) =>
                                                handleColorChange(
                                                    e.target.value
                                                )
                                            }
                                            className="px-2 py-1 bg-gray-300 text-black rounded"
                                        >
                                            <option value="Red">Red</option>
                                            <option value="Blue">Blue</option>
                                            <option value="Green">Green</option>
                                        </select>
                                        <select
                                            value={selectedSize}
                                            onChange={(e) =>
                                                handleSizeChange(e.target.value)
                                            }
                                            className="px-2 py-1 bg-gray-300 text-black rounded"
                                        >
                                            <option value="Small">Small</option>
                                            <option value="Medium">
                                                Medium
                                            </option>
                                            <option value="Large">Large</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <p className="text-gray-900">
                                            Stock On Hand: 10
                                        </p>
                                    </div>
                                    <button
                                        onClick={() =>
                                            orderQuantity("Product 3")
                                        }
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
