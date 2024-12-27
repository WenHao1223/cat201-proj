import React from "react";
import { User } from "../../interfaces/API/UserInterface";

interface UserAPIDataProps {
    users: User[];
}

const UserAPIData: React.FC<UserAPIDataProps> = ({ users }) => {
    return (
        <div>
            <h1>User Data</h1>
            {users.map((user) => (
                <div
                    key={user.email}
                    style={{
                        border: "1px solid #ccc",
                        margin: "10px",
                        padding: "10px",
                    }}
                >
                    <h2>{user.username}</h2>
                    <p>Email: {user.email}</p>
                    <p>First Name: {user.firstName}</p>
                    <p>Last Name: {user.lastName}</p>
                    <p>Phone No: {user.phoneNo}</p>
                    <p>Gender: {user.gender === 1 ? "Male" : "Female"}</p>
                    <p>Date of Birth: {user.dob}</p>
                    <p>Nationality: {user.nationality}</p>
                    <p>Agree to Terms: {user.agreeToTerms ? "Yes" : "No"}</p>
                    <h3>Shipping Addresses</h3>
                    <ul>
                        {user.shippingAddresses &&
                        user.shippingAddresses.length > 0 ? (
                            user.shippingAddresses.map((address, index) => (
                                <li key={index}>{address}</li>
                            ))
                        ) : (
                            <li>No shipping addresses found</li>
                        )}
                    </ul>
                    <h3>Billing Addresses</h3>
                    <ul>
                        {user.billingAddresses &&
                        user.billingAddresses.length > 0 ? (
                            user.billingAddresses.map((address, index) => (
                                <li key={index}>{address}</li>
                            ))
                        ) : (
                            <li>No billing addresses found</li>
                        )}
                    </ul>
                    <h3>Payment Details</h3>
                    <ul>
                        {user.paymentDetails &&
                        user.paymentDetails.length > 0 ? (
                            user.paymentDetails.map((payment, index) => (
                                <li key={index}>
                                    Payment ID: {payment.paymentID}, Payment
                                    Method: {payment.paymentMethod}, Card
                                    Number: {payment.cardNumber}, Expiry Date:{" "}
                                    {payment.expiryDate}, CVV: {payment.cvv}
                                </li>
                            ))
                        ) : (
                            <li>No payment details found</li>
                        )}
                    </ul>
                    <h3>Cart</h3>
                    <ul>
                        {user.carts && user.carts.length > 0 ? (
                            user.carts.map((cart, index) => (
                                <li key={index}>
                                    Product ID: {cart.productID}, Quantity:{" "}
                                    {cart.quantity}, Size Index: {cart.sizeIndex}
                                    , Color Index: {cart.colorIndex}
                                </li>
                            ))
                        ) : (
                            <li>No cart items found</li>
                        )}
                    </ul>
                    <h3>Orders</h3>
                    <ul>
                        {user.orders && user.orders.length > 0 ? (
                            user.orders.map((order, index) => (
                                <li key={index}>
                                    Order ID: {order.orderID}, Shipping Address:{" "}
                                    {order.shippingAddress}, Billing Address:{" "}
                                    {order.billingAddress}, Payment ID:{" "}
                                    {order.paymentID}, Order Date:{" "}
                                    {order.orderDate}, Order Status:{" "}
                                    {order.orderStatus}
                                    <ul>
                                        {order.cartProducts &&
                                            order.cartProducts.map(
                                                (product, idx) => (
                                                    <li key={idx}>
                                                        Product ID:{" "}
                                                        {product.productID},
                                                        Quantity:{" "}
                                                        {product.quantity}, Size
                                                        Index:{" "}
                                                        {product.sizeIndex},
                                                        Color Index:{" "}
                                                        {product.colorIndex}
                                                    </li>
                                                )
                                            )}
                                    </ul>
                                </li>
                            ))
                        ) : (
                            <li>No orders found</li>
                        )}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default UserAPIData;
