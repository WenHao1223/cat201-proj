import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import SamplePage1 from "./pages/SamplePage1";
import SamplePage2 from "./pages/SamplePage2";

// Define the type for the data object

interface User {
    username: string;
    email: string;
    password: string;
    nationality: string;
    firstName: string;
    lastName: string;
    phoneNo: string;
    gender: number;
    dob: string;
    agreeToTerms: boolean;
    shippingAddresses?: string[];
    billingAddresses?: string[];
    paymentDetails?: Payment[];
    carts?: Cart[];
    orders?: Order[];
}

interface Payment {
    paymentID: number;
    paymentMethod: string;
    cardNumber: string;
    expiryDate: string;
    cvv: string;
}

interface Cart {
    productID: string;
    quantity: number;
    sizeIndex: number;
    colorIndex: number;
}

interface Order {
    orderID: number;
    shippingAddress: string;
    billingAddress: string;
    paymentID: number;
    orderDate: string;
    orderStatus: string;
    cartProducts?: Cart[];
}

const App: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Fetch data from the backend when the component is mounted
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:9090/api/test"); // Adjust URL as necessary
                const result: User[] = await response.json();
                setUsers(result);
            } catch (err) {
                setError("Error fetching data: " + (err as Error).message);
            }
        };

        fetchData();
    }, []); // Empty dependency array ensures the effect runs once on component mount

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <Router>
            <div>
                <h1>Welcome to Vite with React!</h1>
                <button
                    onClick={() => {
                        const fetchData = async () => {
                            try {
                                const response = await fetch(
                                    "http://localhost:9090/api/test?name=NewName&value=456"
                                ); // Adjust URL as necessary
                                const result: User[] = await response.json();
                                setUsers(result);
                            } catch (err) {
                                setError(
                                    "Please start the backend server as well.\nRefer to README.md in backend folder as well.\n Error fetching data: " +
                                        (err as Error).message
                                );
                            }
                        };
                        fetchData();
                    }}
                >
                    Fetch Data
                </button>
                {users.length > 0 ? (
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
                                <p>
                                    Gender:{" "}
                                    {user.gender === 1 ? "Male" : "Female"}
                                </p>
                                <p>Date of Birth: {user.dob}</p>
                                <p>Nationality: {user.nationality}</p>
                                <p>
                                    Agree to Terms:{" "}
                                    {user.agreeToTerms ? "Yes" : "No"}
                                </p>
                                <h3>Shipping Addresses</h3>
                                <ul>
                                    {user.shippingAddresses && user.shippingAddresses.length > 0 ? (
                                        user.shippingAddresses.map(
                                            (address, index) => (
                                                <li key={index}>{address}</li>
                                            )
                                        )
                                    ) : (
                                        <li>No shipping addresses found</li>
                                    )}
                                </ul>
                                <h3>Billing Addresses</h3>
                                <ul>
                                    {user.billingAddresses && user.billingAddresses.length > 0 ?  (
                                        user.billingAddresses.map(
                                            (address, index) => (
                                                <li key={index}>{address}</li>
                                            )
                                        )
                                    ) : (
                                        <li>No billing addresses found</li>
                                    )}
                                </ul>
                                <h3>Payment Details</h3>
                                <ul>
                                    {
                                        user.paymentDetails && user.paymentDetails.length > 0 ? (
                                            user.paymentDetails.map(
                                                (payment, index) => (
                                                    <li key={index}>
                                                        Payment ID:{" "}
                                                        {payment.paymentID},
                                                        Payment Method:{" "}
                                                        {payment.paymentMethod},
                                                        Card Number:{" "}
                                                        {payment.cardNumber},
                                                        Expiry Date:{" "}
                                                        {payment.expiryDate},
                                                        CVV: {payment.cvv}
                                                    </li>
                                                )
                                            )
                                        ) : (
                                            <li>No payment details found</li>
                                        )}
                                </ul>
                                <h3>Cart</h3>
                                <ul>
                                    {
                                        user.carts && user.carts.length > 0 ? (
                                            user.carts.map((cart, index) => (
                                                <li key={index}>
                                                    Product ID: {cart.productID},
                                                    Quantity: {cart.quantity},
                                                    Size Index:{" "}
                                                    {cart.sizeIndex},
                                                    Color Index:{" "}
                                                    {cart.colorIndex}
                                                </li>
                                            ))
                                        ) : (
                                            <li>No cart items found</li>
                                        )}
                                </ul>
                                <h3>Orders</h3>
                                <ul>
                                    {
                                        user.orders && user.orders.length > 0 ? (
                                            user.orders.map((order, index) => (
                                                <li key={index}>
                                                    Order ID: {order.orderID},
                                                    Shipping Address:{" "}
                                                    {order.shippingAddress},
                                                    Billing Address:{" "}
                                                    {order.billingAddress},
                                                    Payment ID:{" "}
                                                    {order.paymentID},
                                                    Order Date:{" "}
                                                    {order.orderDate},
                                                    Order Status:{" "}
                                                    {order.orderStatus}
                                                </li>
                                            ))
                                        ) : (
                                            <li>No orders found</li>
                                        )
                                    }
                                </ul>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Loading data...</p>
                )}
                <div>
                    <Link to="/sample1">
                        <button>Go to Sample Page 1</button>
                    </Link>
                    <Link to="/sample2">
                        <button>Go to Sample Page 2</button>
                    </Link>
                </div>
                <Routes>
                    <Route path="/sample1" element={<SamplePage1 />} />
                    <Route path="/sample2" element={<SamplePage2 />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
