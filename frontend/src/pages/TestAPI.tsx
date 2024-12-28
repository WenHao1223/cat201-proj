import React, { useState } from "react";

import {
    UserInterface,
    UserGeneralDetailsInterface,
} from "@interfaces/API/UserInterface";
import { Product } from "@interfaces/API/ProductInterface";

import UsersServlet from "@components/TestAPI/UsersServlet";
import ProductsServlet from "@components/TestAPI/ProductsServlet";
import UsersLoginServlet from "@components/TestAPI/UsersLoginServlet";
import UsersCreateServlet from "@components/TestAPI/UsersCreateServlet";

const TestAPI: React.FC = () => {
    const [error, setError] = useState<string | null>(null);

    // Fetch user data
    const [users, setUsers] = useState<UserInterface[]>([]);
    const [showUsers, setShowUsers] = useState<boolean>(false);

    // Fetch product data
    const [showProducts, setShowProducts] = useState<boolean>(false);
    const [products, setProducts] = useState<Product[]>([]);

    // Validate user login
    const [showUserLoginStatus, setShowUserLoginStatus] =
        useState<boolean>(false);
    const [userLoginStatus, setUserLoginStatus] = useState<boolean>(false);
    const [userEmail, setUserEmail] = useState<string>("");
    const [userPassword, setUserPassword] = useState<string>("");
    const [currentUserGeneralDetails, setCurrentUserGeneralDetails] =
        useState<UserGeneralDetailsInterface | null>(null);

    // Create account
    const [showUsersCreateAccount, setShowUsersCreateAccount] =
        useState<boolean>(false);
    const [createAccountStatus, setCreateAccountStatus] = useState<boolean>(false);
    const [createAccountUsername, setCreateAccountUsername] =
        useState<string>("jdoe");
    const [createAccountEmail, setCreateAccountEmail] = useState<string>(
        "testRegistering@example.com"
    );
    const [createAccountPassword, setCreateAccountPassword] =
        useState<string>("password123");
    const [createAccountNationality, setCreateAccountNationality] =
        useState<string>("Malaysia");
    const [createAccountFirstName, setCreateAccountFirstName] =
        useState<string>("John");
    const [createAccountLastName, setCreateAccountLastName] =
        useState<string>("Doe");
    const [createAccountPhoneNo, setCreateAccountPhoneNo] =
        useState<string>("0123456789");
    const [createAccountGender, setCreateAccountGender] = useState<Number>(1);
    const [createAccountDOB, setCreateAccountDOB] =
        useState<string>("1990-01-01");
    const [createAccountAgreeToTerms, setCreateAccountAgreeToTerms] =
        useState<boolean>(true);

    // View all shipping addresses of current user
    const [showShippingAddresses, setShowShippingAddresses] =
        useState<boolean>(false);
    const [currentUserShippingAddresses, setCurrentUserShippingAddresses] =
        useState<string[]>([]);

    const setToDefault = () => {
        setShowUsers(false);
        setShowProducts(false);
        setShowUserLoginStatus(false);
        setShowUsersCreateAccount(false);
        setShowShippingAddresses(false);
    };

    const fetchUserData = async () => {
        try {
            const response = await fetch("http://localhost:9090/api/users");
            const result: UserInterface[] = await response.json();
            setUsers(result);

            setToDefault();
            setShowUsers(true);
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

            setToDefault();
            setShowProducts(true);
            setError(null);
        } catch (err) {
            setError(
                "\n Error fetching product data: " + (err as Error).message
            );
        }
    };

    const validateUserLogin = async (email: string, password: string) => {
        setUserEmail(email);
        setUserPassword(password);
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
                    setCurrentUserGeneralDetails(JSON.parse(result.user));
                    setUserLoginStatus(true);
                    setError(null);
                } else {
                    setError("\n Invalid email or password");
                }
            } else {
                console.error(
                    "HTTP error",
                    response.status,
                    response.statusText
                );
                setError(
                    "\n Error validating user login: " + response.statusText
                );
            }

            setToDefault();
            setShowUserLoginStatus(true);
        } catch (err) {
            setError(
                "\n Error validating user login: " + (err as Error).message
            );
        }
    };

    const createUserAccount = async () => {
        try {
            const response = await fetch(
                "http://localhost:9090/api/users/create",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username: createAccountUsername,
                        email: createAccountEmail,
                        password: createAccountPassword,
                        nationality: createAccountNationality,
                        firstName: createAccountFirstName,
                        lastName: createAccountLastName,
                        phoneNo: createAccountPhoneNo,
                        gender: createAccountGender,
                        dob: createAccountDOB,
                        agreeToTerms: createAccountAgreeToTerms,
                    }),
                }
            );
            let result;
            if (response.ok) {
                result = await response.json();
                if (result.registerStatusMessage === "Success") {
                    setCreateAccountStatus(true);
                    setError(null);
                } else {
                    setError(
                        "\n Error creating account: " +
                            result.registerStatusMessage
                    );
                }
            } else {
                console.error(
                    "HTTP error",
                    response.status,
                    response.statusText
                );
                setError("\n Error creating account: " + response.statusText);
            }

            setToDefault();
            setShowUsersCreateAccount(true);
        } catch (err) {
            setError("\n Error creating account: " + (err as Error).message);
        }
    };

    const viewCurrentUserShippingAddresses = async () => {
        try {
            const response = await fetch(
                "http://localhost:9090/api/users/shippingAddresses?email=" + userEmail
            );
            let result;
            if (response.ok) {
                result = await response.json();
                if (result.status === "Success") {
                    setCurrentUserShippingAddresses(JSON.parse(result.shippingAddresses));
                    setError(null);
                } else {
                    setError(
                        "\n Error viewing shipping addresses: " + result.message
                    );
                }
            } else {
                console.error(
                    "HTTP error",
                    response.status,
                    response.statusText
                );
                setError(
                    "\n Error viewing shipping addresses: " + response.statusText
                );
            }

            setToDefault();
            setShowShippingAddresses(true);
        } catch (err) {
            setError(
                "\n Error viewing shipping addresses: " + (err as Error).message
            );
        }
    }

    return (
        <div>
            <h1>Test API Page</h1>
            <button onClick={fetchUserData}>Fetch User Data</button>
            <button onClick={fetchProductData}>Fetch Product Data</button>
            <button onClick={() => validateUserLogin("jdoe@example.com", "password123")}>
                Validate User Login
            </button>
            <button onClick={createUserAccount}>Create Account</button>
            <button onClick={viewCurrentUserShippingAddresses}>
                View Shipping Addresses
            </button>
            <div>
                <p style={{ color: "red" }}>{error}</p>
                {showUsers && users.length > 0 && (
                    <UsersServlet users={users} />
                )}
                {showProducts && products.length > 0 && (
                    <ProductsServlet products={products} />
                )}
                {showUserLoginStatus && (
                    <UsersLoginServlet
                        userEmail={userEmail}
                        userPassword={userPassword}
                        userLoginStatus={userLoginStatus}
                        currentUserGeneralDetails={currentUserGeneralDetails}
                    />
                )}
                {showUsersCreateAccount && (
                    <UsersCreateServlet
                        username={createAccountUsername}
                        email={createAccountEmail}
                        password={createAccountPassword}
                        nationality={createAccountNationality}
                        firstName={createAccountFirstName}
                        lastName={createAccountLastName}
                        phoneNo={createAccountPhoneNo}
                        gender={createAccountGender}
                        dob={createAccountDOB}
                        agreeToTerms={
                            createAccountAgreeToTerms
                        }
                        createAccountStatus={createAccountStatus}
                    />
                )}
                {showShippingAddresses && (
                    <div>
                        <h2>Shipping Addresses</h2>
                        <ul>
                            {currentUserShippingAddresses.map((address, index) => (
                                <li key={index}>{address}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TestAPI;
