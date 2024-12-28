import React, { useEffect, useState } from "react";

import {
    UserInterface,
    UserGeneralDetailsInterface,
    PaymentGeneralInterface,
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
    const [createAccountStatus, setCreateAccountStatus] =
        useState<boolean>(false);
    const [createAccountUsername, setCreateAccountUsername] =
        useState<string>("");
    const [createAccountEmail, setCreateAccountEmail] = useState<string>("");
    const [createAccountPassword, setCreateAccountPassword] =
        useState<string>("");
    const [createAccountNationality, setCreateAccountNationality] =
        useState<string>("");
    const [createAccountFirstName, setCreateAccountFirstName] =
        useState<string>("");
    const [createAccountLastName, setCreateAccountLastName] =
        useState<string>("");
    const [createAccountPhoneNo, setCreateAccountPhoneNo] =
        useState<string>("");
    const [createAccountGender, setCreateAccountGender] = useState<Number>(0);
    const [createAccountDOB, setCreateAccountDOB] = useState<string>("");
    const [createAccountAgreeToTerms, setCreateAccountAgreeToTerms] =
        useState<boolean>(false);

    // View all shipping addresses of current user
    const [showShippingAddresses, setShowShippingAddresses] =
        useState<boolean>(false);
    const [currentUserShippingAddresses, setCurrentUserShippingAddresses] =
        useState<string[]>([]);

    // View all billing addresses of current user
    const [showBillingAddresses, setShowBillingAddresses] =
        useState<boolean>(false);
    const [currentUserBillingAddresses, setCurrentUserBillingAddresses] =
        useState<string[]>([]);

    // View all payment details of current user
    const [showPaymentDetails, setShowPaymentDetails] =
        useState<boolean>(false);
    const [currentUserPaymentDetails, setCurrentUserPaymentDetails] = useState<
        PaymentGeneralInterface[]
    >([]);

    const setToDefault = () => {
        setShowUsers(false);
        setShowProducts(false);
        setShowUserLoginStatus(false);
        setShowUsersCreateAccount(false);
        setShowShippingAddresses(false);
        setShowBillingAddresses(false);
        setShowPaymentDetails(false);
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
        setCreateAccountUsername("jdoe");
        setCreateAccountEmail("testRegistering@example.com");
        setCreateAccountPassword("password123");
        setCreateAccountNationality("Malaysia");
        setCreateAccountFirstName("John");
        setCreateAccountLastName("Doe");
        setCreateAccountPhoneNo("0123456789");
        setCreateAccountGender(1);
        setCreateAccountDOB("1990-01-01");
        setCreateAccountAgreeToTerms(true);
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
                if (result.status === "Success") {
                    setCreateAccountStatus(true);
                    setError(null);
                } else {
                    setError("\n Error creating account: " + result.message);
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
                "http://localhost:9090/api/users/shippingAddresses?email=" +
                    userEmail
            );
            let result;
            if (response.ok) {
                result = await response.json();
                if (result.status === "Success") {
                    setCurrentUserShippingAddresses(
                        JSON.parse(result.shippingAddresses)
                    );
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
                    "\n Error viewing shipping addresses: " +
                        response.statusText
                );
            }

            setToDefault();
            setShowShippingAddresses(true);
        } catch (err) {
            setError(
                "\n Error viewing shipping addresses: " + (err as Error).message
            );
        }
    };

    const viewCurrentUserBillingAddresses = async () => {
        try {
            const response = await fetch(
                "http://localhost:9090/api/users/billingAddresses?email=" +
                    userEmail
            );
            let result;
            if (response.ok) {
                result = await response.json();
                if (result.status === "Success") {
                    setCurrentUserBillingAddresses(
                        JSON.parse(result.billingAddresses)
                    );
                    setError(null);
                } else {
                    setError(
                        "\n Error viewing billing addresses: " + result.message
                    );
                }
            } else {
                console.error(
                    "HTTP error",
                    response.status,
                    response.statusText
                );
                setError(
                    "\n Error viewing billing addresses: " + response.statusText
                );
            }

            setToDefault();
            setShowBillingAddresses(true);
        } catch (err) {
            setError(
                "\n Error viewing billing addresses: " + (err as Error).message
            );
        }
    };

    const viewCurrentUserPaymentDetails = async () => {
        try {
            const response = await fetch(
                "http://localhost:9090/api/users/paymentDetails?email=" +
                    userEmail
            );
            let result;
            if (response.ok) {
                result = await response.json();
                console.log(result.paymentDetails);
                if (result.status === "Success") {
                    const paymentDetailsArray = result.paymentDetails.map((paymentDetail: string) =>
                        JSON.parse(paymentDetail)
                    );

                    setCurrentUserPaymentDetails(paymentDetailsArray);
                    setError(null);
                } else {
                    setError(
                        "\n Error viewing payment details: " + result.message
                    );
                }
            } else {
                console.error(
                    "HTTP error",
                    response.status,
                    response.statusText
                );
                setError(
                    "\n Error viewing payment details: " + response.statusText
                );
            }

            setToDefault();
            setShowPaymentDetails(true);
        } catch (err) {
            setError(
                "\n Error viewing payment details 3: " + (err as Error).message
            );
        }
    };

    return (
        <div>
            <h1>Test API Page</h1>
            <button onClick={fetchUserData}>Fetch User Data</button>
            <button onClick={fetchProductData}>Fetch Product Data</button>
            <button
                onClick={() =>
                    validateUserLogin("jdoe@example.com", "password123")
                }
            >
                Validate User Login
            </button>
            <button onClick={createUserAccount}>Create Account</button>
            <button onClick={viewCurrentUserShippingAddresses}>
                View Shipping Addresses
            </button>
            <button onClick={viewCurrentUserBillingAddresses}>
                View Billing Addresses
            </button>
            <button onClick={viewCurrentUserPaymentDetails}>
                View Payment Details
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
                        agreeToTerms={createAccountAgreeToTerms}
                        createAccountStatus={createAccountStatus}
                    />
                )}
                {showShippingAddresses && (
                    <div>
                        <h2>Shipping Addresses</h2>
                        <ul>
                            {currentUserShippingAddresses.map(
                                (address, index) => (
                                    <li key={index}>{address}</li>
                                )
                            )}
                        </ul>
                    </div>
                )}
                {showBillingAddresses && (
                    <div>
                        <h2>Billing Addresses</h2>
                        <ul>
                            {currentUserBillingAddresses.map(
                                (address, index) => (
                                    <li key={index}>{address}</li>
                                )
                            )}
                        </ul>
                    </div>
                )}
                {showPaymentDetails && (
                    <div>
                        <h2>Payment Details</h2>
                        <ul>
                            {currentUserPaymentDetails.map((payment, index) => (
                                <div
                                key={index}
                                style={{
                                    border: "1px solid #ccc",
                                    padding: "10px",
                                }}>
                                    <p>Payment ID: {payment.paymentID}</p>
                                    <p>Payment Method: {payment.paymentMethod}</p>
                                    <p>Card Number: {payment.cardNumber}</p>
                                </div>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TestAPI;
