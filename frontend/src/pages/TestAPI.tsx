import React, { useEffect, useState } from "react";

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

interface Product {
    productID: string;
    name: string;
    description: string;
    price: number;
    category: string;
    brand: string;
    sizes: string[];
    colors: string[];
    quantities: number[][];
}

const TestAPI: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [showUsers, setShowUsers] = useState<boolean>(false);
    const [showProducts, setShowProducts] = useState<boolean>(false);

    const fetchUserData = async () => {
        try {
            const response = await fetch(
                "http://localhost:9090/api/test?name=NewName&value=456"
            ); // Adjust URL as necessary
            const result: User[] = await response.json();
            setUsers(result);
            setShowUsers(true);
            setShowProducts(false);
            setError(null);
        } catch (err) {
            setError("\n Error fetching user data: " + (err as Error).message);
        }
    };

    const fetchProductData = async () => {
        try {
            const response = await fetch("http://localhost:9090/api/products"); // Adjust URL as necessary
            const result: Product[] = await response.json();
            setProducts(result);
            setShowUsers(false);
            setShowProducts(true);
            setError(null);
        } catch (err) {
            setError(
                "\n Error fetching product data: " + (err as Error).message
            );
        }
    };

    return (
        <div>
            <h1>Test API Page</h1>
            <button onClick={fetchUserData}>Fetch User Data</button>
            <button onClick={fetchProductData}>Fetch Product Data</button>
            {error ? (
                <p style={{ color: "red" }}>{error}</p>
            ) : (
                <div>
                    {showUsers && users.length > 0 && (
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
                                        {user.shippingAddresses &&
                                        user.shippingAddresses.length > 0 ? (
                                            user.shippingAddresses.map(
                                                (address, index) => (
                                                    <li key={index}>
                                                        {address}
                                                    </li>
                                                )
                                            )
                                        ) : (
                                            <li>No shipping addresses found</li>
                                        )}
                                    </ul>
                                    <h3>Billing Addresses</h3>
                                    <ul>
                                        {user.billingAddresses &&
                                        user.billingAddresses.length > 0 ? (
                                            user.billingAddresses.map(
                                                (address, index) => (
                                                    <li key={index}>
                                                        {address}
                                                    </li>
                                                )
                                            )
                                        ) : (
                                            <li>No billing addresses found</li>
                                        )}
                                    </ul>
                                    <h3>Payment Details</h3>
                                    <ul>
                                        {user.paymentDetails &&
                                        user.paymentDetails.length > 0 ? (
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
                                        {user.carts && user.carts.length > 0 ? (
                                            user.carts.map((cart, index) => (
                                                <li key={index}>
                                                    Product ID: {cart.productID}
                                                    , Quantity: {cart.quantity},
                                                    Size Index: {cart.sizeIndex}
                                                    , Color Index:{" "}
                                                    {cart.colorIndex}
                                                </li>
                                            ))
                                        ) : (
                                            <li>No cart items found</li>
                                        )}
                                    </ul>
                                    <h3>Orders</h3>
                                    <ul>
                                        {user.orders &&
                                        user.orders.length > 0 ? (
                                            user.orders.map((order, index) => (
                                                <li key={index}>
                                                    Order ID: {order.orderID},
                                                    Shipping Address:{" "}
                                                    {order.shippingAddress},
                                                    Billing Address:{" "}
                                                    {order.billingAddress},
                                                    Payment ID:{" "}
                                                    {order.paymentID}, Order
                                                    Date: {order.orderDate},
                                                    Order Status:{" "}
                                                    {order.orderStatus}
                                                    <ul>
                                                        {order.cartProducts &&
                                                            order.cartProducts.map(
                                                                (
                                                                    product,
                                                                    idx
                                                                ) => (
                                                                    <li
                                                                        key={
                                                                            idx
                                                                        }
                                                                    >
                                                                        Product
                                                                        ID:{" "}
                                                                        {
                                                                            product.productID
                                                                        }
                                                                        ,
                                                                        Quantity:{" "}
                                                                        {
                                                                            product.quantity
                                                                        }
                                                                        , Size
                                                                        Index:{" "}
                                                                        {
                                                                            product.sizeIndex
                                                                        }
                                                                        , Color
                                                                        Index:{" "}
                                                                        {
                                                                            product.colorIndex
                                                                        }
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
                    )}
                </div>
            )}
            {showProducts && products.length > 0 && (
                <div>
                    <h1>Product Data</h1>
                    {products.map((product) => (
                        <div
                            key={product.productID}
                            style={{
                                border: "1px solid #ccc",
                                margin: "10px",
                                padding: "10px",
                            }}
                        >
                            <h2>{product.name}</h2>
                            <p>Product ID: {product.productID}</p>
                            <p>Description: {product.description}</p>
                            <p>Price: ${product.price}</p>
                            <p>Category: {product.category}</p>
                            <p>Brand: {product.brand}</p>
                            <h3>Sizes</h3>
                            <ul>
                                {product.sizes.map((size, index) => (
                                    <li key={index}>{size}</li>
                                ))}
                            </ul>
                            <h3>Colors</h3>
                            <ul>
                                {product.colors.map((color, index) => (
                                    <li key={index}>{color}</li>
                                ))}
                            </ul>
                            <h3>Quantities</h3>
                            <ul>
                                {product.quantities.map((quantity, index) => (
                                    <li key={index}>
                                        {quantity.map((q, i) => (
                                            <span key={i}>{q} </span>
                                        ))}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TestAPI;
