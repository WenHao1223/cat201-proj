import React, { useState } from "react";
import UserAPIData from "@components/TestAPI/UserAPIData";
import ProductAPIData from "@components/TestAPI/ProductAPIData";
import { User } from "@interfaces/API/UserInterface";
import { Product } from "@interfaces/API/ProductInterface";

const TestAPI: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [userLoginStatus, setUserLoginStatus] = useState<boolean>(false);
    const [userEmail, setUserEmail] = useState<string>("jdoe@example.com");
    const [userPassword, setUserPassword] = useState<string>("password123");

    const [showUsers, setShowUsers] = useState<boolean>(false);
    const [showProducts, setShowProducts] = useState<boolean>(false);
    const [showUserLoginStatus, setShowUserLoginStatus] =
        useState<boolean>(false);

    const fetchUserData = async () => {
        try {
            const response = await fetch("http://localhost:9090/api/users");
            const result: User[] = await response.json();
            setUsers(result);

            setShowUsers(true);
            setShowProducts(false);
            setShowUserLoginStatus(false);

            setError(null);
        } catch (err) {
            setError("\n Error fetching user data: " + (err as Error).message);
        }
    };

    const fetchProductData = async () => {
        try {
            const response = await fetch("http://localhost:9090/api/products");
            const result: Product[] = await response.json();
            setProducts(result);

            setShowUsers(false);
            setShowProducts(true);
            setShowUserLoginStatus(false);

            setError(null);
        } catch (err) {
            setError(
                "\n Error fetching product data: " + (err as Error).message
            );
        }
    };

    const validateUserLogin = async (email: string, password: string) => {
        try {
            const response = await fetch(
                "http://localhost:9090/api/users/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password,
                    }),
                    credentials: "include",
                }
            );
            let result;
            if (response.ok) {
                result = await response.json();
                if (result.loginStatus) {
                    setUserLoginStatus(true);
                    setError(null);
                } else {
                    setUserLoginStatus(false);
                    setError("\n Invalid email or password" );
                }
            } else {
                console.error("HTTP error", response.status, response.statusText);
                setError("\n Error validating user login: " + response.statusText);
            }
            setShowUsers(false);
            setShowProducts(false);
            setShowUserLoginStatus(true);
        } catch (err) {
            setError(
                "\n Error validating user login: " + (err as Error).message
            );
        }
    };

    return (
        <div>
            <h1>Test API Page</h1>
            <button onClick={fetchUserData}>Fetch User Data</button>
            <button onClick={fetchProductData}>Fetch Product Data</button>
            <button onClick={() => validateUserLogin(userEmail, userPassword)}>Validate User Login</button>
            {error ? (
                <p style={{ color: "red" }}>{error}</p>
            ) : (
                <div>
                    {showUsers && users.length > 0 && (
                        <UserAPIData users={users} />
                    )}
                    {showProducts && products.length > 0 && (
                        <ProductAPIData products={products} />
                    )}
                    {showUserLoginStatus && (
                        <div>
                            <h1>User Login Status</h1>
                            <div>
                                Email: {userEmail}<br/>Password: {userPassword}
                                <hr/>
                                User login status:{" "}
                                {userLoginStatus ? "Success" : "Failure"}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default TestAPI;
