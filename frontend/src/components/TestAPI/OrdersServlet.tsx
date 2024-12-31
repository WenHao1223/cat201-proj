import react from "react";

import { OrderInterface } from "@interfaces/API/UserInterface";

interface OrdersServletProps {
    orders: OrderInterface[];
}

const OrdersServlet: React.FC<OrdersServletProps> = ({ orders }) => {
    return (
        <div>
            <h2>Orders</h2>
            {orders.map((order, index) => (
                <div
                    key={index}
                    style={{
                        border: "1px solid #ccc",
                        padding: "10px",
                        margin: "10px",
                    }}
                >
                    <h3>Order ID: {order.orderID}</h3>
                    <p>Order Date: {order.orderDate}</p>
                    <p>Shipping Address: {order.shippingAddress}</p>
                    <p>Billing Address: {order.billingAddress}</p>
                    <p>Payment Method: {order.payment.paymentMethod}</p>
                    <p>Card Number: {order.payment.cardNumber}</p>
                    <p>Order Status: {order.orderStatus}</p>
                    <h3>Products</h3>
                    {order.cartProducts.map((product, index) => (
                        <div
                            key={index}
                            style={{
                                border: "1px solid #ccc",
                                padding: "10px",
                                margin: "10px",
                            }}
                        >
                            <h4>{product.name}</h4>
                            <p>Price: {product.price}</p> 
                            <p>Category: {product.category}</p>
                            <p>Brand: {product.brand}</p>
                            <p>Quantity: {product.quantity}</p>
                            <p>Size: {product.size}</p>
                            <p>Color: {product.color}</p>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default OrdersServlet;
