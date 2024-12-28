import React, { useState } from "react";

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
import UsersShippingAddressesServlet from "@components/TestAPI/UsersShippingAddressesServlet";
import UsersPaymentDetailsServlet from "@components/TestAPI/UsersPaymentDetailsServlet";

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

    const handleApiCall = async (
        url: string,
        method: string,
        body: any,
        onSuccess: (result: any) => void,
        onError: (error: string) => void
    ) => {
        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: body ? JSON.stringify(body) : null,
                credentials: "include",
            });

            if (response.ok) {
                const result = await response.json();
                onSuccess(result);
                setError(null);
            } else {
                console.error("HTTP error", response.status, response.statusText);
                onError(response.statusText);
            }
        } catch (err) {
            onError((err as Error).message);
            setToDefault();
        }
    };

    const fetchUserData = async () => {
        await handleApiCall(
            "http://localhost:9090/api/users",
            "GET",
            null,
            (result) => {
                setUsers(result);
                setToDefault();
                setShowUsers(true);
            },
            (error) => setError("\n Error fetching user data: " + error)
        );
    };

    const fetchProductData = async () => {
        await handleApiCall(
            "http://localhost:9090/api/products",
            "GET",
            null,
            (result) => {
                setProducts(result);
                setToDefault();
                setShowProducts(true);
            },
            (error) => setError("\n Error fetching product data: " + error)
        );
    };

    const validateUserLogin = async (email: string, password: string) => {
        setUserEmail(email);
        setUserPassword(password);
        await handleApiCall(
            "http://localhost:9090/api/users/login",
            "POST",
            { email, password },
            async (result) => {
                if (await result.loginStatus) {
                    setCurrentUserGeneralDetails(JSON.parse(result.user));
                    setUserLoginStatus(true);
                } else {
                    console.log("test");
                    setError("\n Invalid email or password");
                }
                setToDefault();
                setShowUserLoginStatus(true);
            },
            (error) => setError("\n Error validating user login: " + error)
        );
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
        await handleApiCall(
            "http://localhost:9090/api/users/create",
            "POST",
            {
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
            },
            async (result) => {
                if (await result.status === "Success") {
                    setCreateAccountStatus(true);
                } else {
                    setError("\n Error creating account: " + result.message);
                }
                setToDefault();
                setShowUsersCreateAccount(true);
            },
            (error) => setError("\n Error creating account: " + error)
        );
    };

    const viewCurrentUserShippingAddresses = async () => {
        await handleApiCall(
            `http://localhost:9090/api/users/shippingAddresses?email=${userEmail}`,
            "GET",
            null,
            async (result) => {
                if (await result.status === "Success") {
                    setCurrentUserShippingAddresses(
                        JSON.parse(result.shippingAddresses)
                    );
                } else {
                    setError(
                        "\n Error viewing shipping addresses: " + result.message
                    );
                }
                setToDefault();
                setShowShippingAddresses(true);
            },
            (error) =>
                setError("\n Error viewing shipping addresses: " + error)
        );
    };

    const viewCurrentUserBillingAddresses = async () => {
        await handleApiCall(
            `http://localhost:9090/api/users/billingAddresses?email=${userEmail}`,
            "GET",
            null,
            async (result) => {
                if (await result.status === "Success") {
                    setCurrentUserBillingAddresses(
                        JSON.parse(result.billingAddresses)
                    );
                } else {
                    setError(
                        "\n Error viewing billing addresses: " + result.message
                    );
                }
                setToDefault();
                setShowBillingAddresses(true);
            },
            (error) => setError("\n Error viewing billing addresses: " + error)
        );
    };

    const viewCurrentUserPaymentDetails = async () => {
        await handleApiCall(
            `http://localhost:9090/api/users/paymentDetails?email=${userEmail}`,
            "GET",
            null,
            async (result) => {
                if (await result.status === "Success") {
                    const paymentDetailsArray = result.paymentDetails.map(
                        (paymentDetail: string) => JSON.parse(paymentDetail)
                    );
                    setCurrentUserPaymentDetails(paymentDetailsArray);
                } else {
                    setError(
                        "\n Error viewing payment details: " + result.message
                    );
                }
                setToDefault();
                setShowPaymentDetails(true);
            },
            (error) => setError("\n Error viewing payment details: " + error)
        );
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
                {error && <p style={{ color: "red" }}>{error}</p>}
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
                    <UsersShippingAddressesServlet
                        addresses={currentUserShippingAddresses}
                    />
                )}
                {showBillingAddresses && (
                    <UsersShippingAddressesServlet
                        addresses={currentUserBillingAddresses}
                    />
                )}
                {showPaymentDetails && (
                    <UsersPaymentDetailsServlet
                        paymentDetails={currentUserPaymentDetails}
                    />
                )}
            </div>
        </div>
    );
};

export default TestAPI;
