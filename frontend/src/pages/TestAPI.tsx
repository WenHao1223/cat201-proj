import React, { useState } from "react";

import { User } from "@interfaces/API/UserInterface";
import { Product } from "@interfaces/API/ProductInterface";

import UserAPIData from "@components/TestAPI/UserAPIData";
import ProductAPIData from "@components/TestAPI/ProductAPIData";
import ValidateUserLoginAPIData from "@components/TestAPI/ValidateUserLoginAPIData";
import CreateAccountAPIData from "@components/TestAPI/CreateAccountAPIData";

const TestAPI: React.FC = () => {
    const [error, setError] = useState<string | null>(null);

    // Fetch user data
    const [users, setUsers] = useState<User[]>([]);
    const [showUsers, setShowUsers] = useState<boolean>(false);

    // Fetch product data
    const [showProducts, setShowProducts] = useState<boolean>(false);
    const [products, setProducts] = useState<Product[]>([]);

    // Validate user login
    const [showUserLoginStatus, setShowUserLoginStatus] =
        useState<boolean>(false);
    const [userLoginStatus, setUserLoginStatus] = useState<boolean>(false);
    const [userEmail, setUserEmail] = useState<string>("jdoe@example.com");
    const [userPassword, setUserPassword] = useState<string>("password123");

    // Create account
    const [showCreateAccount, setShowCreateAccount] = useState<boolean>(false);
    const [createAccount, setCreateAccount] = useState<boolean>(false);
    const [createAccountUsername, setCreateAccountUsername] =
        useState<string>("jdoe");
    const [createAccountEmail, setCreateAccountEmail] =
        useState<string>("testRegistering@example.com");
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

    const setToDefault = () => {
        setShowUsers(false);
        setShowProducts(false);
        setShowUserLoginStatus(false);
        setShowCreateAccount(false);
    };

    const fetchUserData = async () => {
        try {
            const response = await fetch("http://localhost:9090/api/users");
            const result: User[] = await response.json();
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
                    setCreateAccount(true);
                    setError(null);
                } else {
                    setError("\n Error creating account: " + result.registerStatusMessage);
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
            setShowCreateAccount(true);
        } catch (err) {
            setError("\n Error creating account: " + (err as Error).message);
        }
    };

    return (
        <div>
            <h1>Test API Page</h1>
            <button onClick={fetchUserData}>Fetch User Data</button>
            <button onClick={fetchProductData}>Fetch Product Data</button>
            <button onClick={() => validateUserLogin(userEmail, userPassword)}>
                Validate User Login
            </button>
            <button onClick={createUserAccount}>Create Account</button>
            <div>
                <p style={{ color: "red" }}>{error}</p>
                {showUsers && users.length > 0 && <UserAPIData users={users} />}
                {showProducts && products.length > 0 && (
                    <ProductAPIData products={products} />
                )}
                {showUserLoginStatus && (
                    <ValidateUserLoginAPIData
                        userEmail={userEmail}
                        userPassword={userPassword}
                        userLoginStatus={userLoginStatus}
                    />
                )}
                {showCreateAccount && (
                    <CreateAccountAPIData
                        createAccountUsername={createAccountUsername}
                        createAccountEmail={createAccountEmail}
                        createAccountPassword={createAccountPassword}
                        createAccountNationality={createAccountNationality}
                        createAccountFirstName={createAccountFirstName}
                        createAccountLastName={createAccountLastName}
                        createAccountPhoneNo={createAccountPhoneNo}
                        createAccountGender={createAccountGender}
                        createAccountDOB={createAccountDOB}
                        createAccountAgreeToTerms={createAccountAgreeToTerms}
                        createAccount={createAccount}
                    />
                )}
            </div>
        </div>
    );
};

export default TestAPI;
