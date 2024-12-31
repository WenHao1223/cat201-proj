import react from "react";

import { OrderInterface } from "@interfaces/API/UserInterface";

interface OrdersCancelServletProps {
    orders: OrderInterface[];
    orderToCancel: OrderInterface;
    orderToCancelStatus: boolean;
}

const OrdersCancelServlet: React.FC<OrdersCancelServletProps> = ({
    orders,
    orderToCancel,
    orderToCancelStatus,
}) => {
    return (
        <div>
            <div>
                <h2>Cancel Order</h2>
                <h3>Cancelled Order</h3>
                <div
                    style={{
                        border: "1px solid #ccc",
                        padding: "10px",
                        margin: "10px 10px 20px",
                    }}
                >
                    <p>Order ID: {orderToCancel.orderID}</p>
                    <p>Order Date: {orderToCancel.orderDate}</p>
                    <p>Shipping Address: {orderToCancel.shippingAddress}</p>
                    <p>Billing Address: {orderToCancel.billingAddress}</p>
                    <p>Payment Method: {orderToCancel.payment.paymentMethod}</p>
                    <p>Card Number: {orderToCancel.payment.cardNumber}</p>
                    <p>Order Status: {orderToCancel.orderStatus}</p>
                    <h3>Products</h3>
                    {orderToCancel.cartProducts.map((product, index) => (
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
                <hr />
                <p>
                    Order to cancel status:{" "}
                    {orderToCancelStatus ? "Success" : "Failure"}
                </p>
            </div>
            <h1>Orders</h1>
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
                    <p>Order Total: RM {order.orderTotal}</p>
                </div>
            ))}
        </div>
    );
};

export default OrdersCancelServlet;
