import react from "react";

import { OrderInterface } from "@interfaces/API/UserInterface";

interface OrdersAddServletProps {
    orders: OrderInterface[];
    newOrder: OrderInterface;
    addToOrderStatus: boolean;
}

const OrdersAddServlet: React.FC<OrdersAddServletProps> = ({
    orders,
    newOrder,
    addToOrderStatus,
}) => {
    return (
        <div>
            <div>
                <h2>Add to Order</h2>
                <h3>Added Order</h3>
                <div
                    style={{
                        border: "1px solid #ccc",
                        padding: "10px",
                        margin: "10px 10px 20px",
                    }}
                >
                    <p>Order ID: {newOrder.orderID}</p>
                    <p>Order Date: {newOrder.orderDate}</p>
                    <p>Shipping Address: {newOrder.shippingAddress}</p>
                    <p>Billing Address: {newOrder.billingAddress}</p>
                    <p>Payment Method: {newOrder.payment.paymentMethod}</p>
                    <p>Card Number: {newOrder.payment.cardNumber}</p>
                    <p>Order Status: {newOrder.orderStatus}</p>
                    <h3>Products</h3>
                    {newOrder.cartProducts.map((product, index) => (
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
                            <p>Size Index: {product.sizeIndex}</p>
                            <p>Color Index: {product.colorIndex}</p>
                            <p>Size: {product.size}</p>
                            <p>Color: {product.color}</p>
                        </div>
                    ))}
                </div>
                <hr />
                <p>
                    Add to order status:{" "}
                    {addToOrderStatus ? "Success" : "Failure"}
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

export default OrdersAddServlet;
