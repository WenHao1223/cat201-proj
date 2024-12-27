import React, { useState } from "react";
import UserAPIData from "../components/TestAPI/UserAPIData";
import ProductAPIData from "../components/TestAPI/ProductAPIData";
import { User } from "../interfaces/API/UserInterface";
import { Product } from "../interfaces/API/ProductInterface";

const TestAPI: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [showUsers, setShowUsers] = useState<boolean>(false);
    const [showProducts, setShowProducts] = useState<boolean>(false);

    const fetchUserData = async () => {
        try {
            const response = await fetch(
                "http://localhost:9090/api/users"
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
                        <UserAPIData users={users} />
                    )}
                    {showProducts && products.length > 0 && (
                        <ProductAPIData products={products} />
                    )}
                </div>
            )}
        </div>
    );
};

export default TestAPI;
