import React, { useState } from "react";

import {
    UserInterface,
    UserGeneralDetailsInterface,
    PaymentGeneralInterface,
    PaymentInterface,
} from "@interfaces/API/UserInterface";
import { Product } from "@interfaces/API/ProductInterface";

import UsersServlet from "@components/TestAPI/UsersServlet";
import ProductsServlet from "@components/TestAPI/ProductsServlet";
import UsersLoginServlet from "@components/TestAPI/UsersLoginServlet";
import UsersCreateServlet from "@components/TestAPI/UsersCreateServlet";
import UsersShippingAddressesServlet from "@components/TestAPI/UsersShippingAddressesServlet";
import UsersPaymentDetailsServlet from "@components/TestAPI/UsersPaymentDetailsServlet";
import UsersEditProfileServlet from "@components/TestAPI/UsersEditProfileServlet";
import UsersChangePasswordServlet from "@components/TestAPI/UsersChangePasswordServlet";
import UsersShippingAddressesAddServlet from "@components/TestAPI/UsersShippingAddressesAddServlet";
import UsersShippingAddressesUpdateServlet from "@components/TestAPI/UsersShippingAddressesUpdateServlet";
import UsersShippingAddressesRemoveServlet from "@components/TestAPI/UsersShippingAddressesRemoveServlet";
import UsersBillingAddressesAddServlet from "@components/TestAPI/UsersBillingAddressesAddServlet";
import UsersBillingAddressesUpdateServlet from "@components/TestAPI/UsersBillingAddressesUpdateServlet";
import UsersBillingAddressesRemoveServlet from "@components/TestAPI/UsersBillingAddressesRemoveServlet";
import UsersPaymentDetailsAddServlet from "@components/TestAPI/UsersPaymentDetailsAddServlet";
import UsersPaymentDetailsRemoveServlet from "@components/TestAPI/UsersPaymentDetailsRemoveServlet";

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
    const [craeteAccountObject, setCreateAccountObject] = useState<UserInterface>({
        username: "",
        email: "",
        password: "",
        nationality: "",
        firstName: "",
        lastName: "",
        phoneNo: "",
        gender: 0,
        dob: "",
        agreeToTerms: false,
    });

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

    // Edit user details according to field
    const [showEditProfile, setShowEditProfile] = useState<boolean>(false);
    const [editProfileStatus, setEditProfileStatus] = useState<boolean>(false);
    const [editField, setEditField] = useState<string>("");
    const [editValue, setEditValue] = useState<string>("");

    // Change password
    const [showChangePassword, setShowChangePassword] =
        useState<boolean>(false);
    const [changePasswordStatus, setChangePasswordStatus] =
        useState<boolean>(false);
    const [changePasswordCurrentPassword, setChangePasswordCurrentPassword] =
        useState<string>("");
    const [changePasswordNewPassword, setChangePasswordNewPassword] =
        useState<string>("");

    // Add new shipping address
    const [showAddShippingAddress, setShowAddShippingAddress] =
        useState<boolean>(false);
    const [addNewShippingAddressStatus, setAddNewShippingAddressStatus] =
        useState<boolean>(false);
    const [newShippingAddress, setNewShippingAddress] = useState<string>("");

    // Update shipping address
    const [showUpdateShippingAddress, setShowUpdateShippingAddress] =
        useState<boolean>(false);
    const [updateShippingAddressStatus, setUpdateShippingAddressStatus] =
        useState<boolean>(false);
    const [updateShippingAddressIndex, setUpdateShippingAddressIndex] =
        useState<number>(-1);
    const [updateShippingAddress, setUpdateShippingAddress] =
        useState<string>("");

    // Remove shipping address
    const [showRemoveShippingAddress, setShowRemoveShippingAddress] =
        useState<boolean>(false);
    const [removeShippingAddressStatus, setRemoveShippingAddressStatus] =
        useState<boolean>(false);
    const [removeShippingAddress, setRemoveShippingAddress] =
        useState<string>("");

    // Add new billing address
    const [showAddBillingAddress, setShowAddBillingAddress] =
        useState<boolean>(false);
    const [addNewBillingAddressStatus, setAddNewBillingAddressStatus] =
        useState<boolean>(false);
    const [newBillingAddress, setNewBillingAddress] = useState<string>("");

    // Update billing address
    const [showUpdateBillingAddress, setShowUpdateBillingAddress] =
        useState<boolean>(false);
    const [updateBillingAddressStatus, setUpdateBillingAddressStatus] =
        useState<boolean>(false);
    const [updateBillingAddressIndex, setUpdateBillingAddressIndex] =
        useState<number>(-1);
    const [updateBillingAddress, setUpdateBillingAddress] =
        useState<string>("");

    // Remove billing address
    const [showRemoveBillingAddress, setShowRemoveBillingAddress] =
        useState<boolean>(false);
    const [removeBillingAddressStatus, setRemoveBillingAddressStatus] =
        useState<boolean>(false);
    const [removeBillingAddress, setRemoveBillingAddress] =
        useState<string>("");

    // Add new payment detail
    const [showAddPaymentDetail, setShowAddPaymentDetail] =
        useState<boolean>(false);
    const [addNewPaymentDetailStatus, setAddNewPaymentDetailStatus] =
        useState<boolean>(false);
    const [newPaymentDetails, setNewPaymentDetails] =
        useState<PaymentInterface>({
            paymentMethod: "",
            cardNumber: "",
            expiryDate: "",
            cvv: "",
        });

    // Remove payment detail (by payment ID)
    const [showRemovePaymentDetail, setShowRemovePaymentDetail] = useState<boolean>(false);
    const [removePaymentDetailStatus, setRemovePaymentDetailStatus] = useState<boolean>(false);
    const [removePaymentDetailIndex, setRemovePaymentDetailIndex] = useState<number>(-1);

    // Reset all states to default
    const setToDefault = () => {
        setShowUsers(false);
        setShowProducts(false);
        setShowUserLoginStatus(false);
        setShowUsersCreateAccount(false);
        setShowShippingAddresses(false);
        setShowBillingAddresses(false);
        setShowPaymentDetails(false);
        setShowEditProfile(false);
        setShowChangePassword(false);
        setShowAddShippingAddress(false);
        setShowUpdateShippingAddress(false);
        setShowRemoveShippingAddress(false);
        setShowAddBillingAddress(false);
        setShowUpdateBillingAddress(false);
        setShowRemoveBillingAddress(false);
        setShowAddPaymentDetail(false);
        setShowRemovePaymentDetail(false);
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
                console.error(
                    "HTTP error",
                    response.status,
                    response.statusText
                );
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

    const validateUserLoginMethod = async (email: string, password: string) => {
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
                    setError("\n Invalid email or password");
                }
                setToDefault();
                setShowUserLoginStatus(true);
            },
            (error) => setError("\n Error validating user login: " + error)
        );
    };

    const createUserAccountMethod = async (
        username: string,
        email: string,
        password: string,
        nationality: string,
        firstName: string,
        lastName: string,
        phoneNo: string,
        gender: number,
        dob: string,
        agreeToTerms: boolean
    ) => {
        setCreateAccountObject({
            username,
            email,
            password,
            nationality,
            firstName,
            lastName,
            phoneNo,
            gender,
            dob,
            agreeToTerms,
        });

        await handleApiCall(
            "http://localhost:9090/api/users/create",
            "POST",
            {
                username,
                email,
                password,
                nationality,
                firstName,
                lastName,
                phoneNo,
                gender,
                dob,
                agreeToTerms,
            },
            async (result) => {
                if ((await result.status) === "Success") {
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

    const viewCurrentUserShippingAddressesMethod = async () => {
        await handleApiCall(
            `http://localhost:9090/api/users/shippingAddresses?email=${userEmail}`,
            "GET",
            null,
            async (result) => {
                if ((await result.status) === "Success") {
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
            (error) => setError("\n Error viewing shipping addresses: " + error)
        );
    };

    const viewCurrentUserBillingAddressesMethod = async () => {
        await handleApiCall(
            `http://localhost:9090/api/users/billingAddresses?email=${userEmail}`,
            "GET",
            null,
            async (result) => {
                if ((await result.status) === "Success") {
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

    const viewCurrentUserPaymentDetailsMethod = async () => {
        await handleApiCall(
            `http://localhost:9090/api/users/paymentDetails?email=${userEmail}`,
            "GET",
            null,
            async (result) => {
                if ((await result.status) === "Success") {
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

    const editProfileMethod = async (field: string, value: string) => {
        setEditField(field);
        setEditValue(value);
        await handleApiCall(
            "http://localhost:9090/api/users/editProfile",
            "PUT",
            {
                email: userEmail,
                field,
                value,
            },
            async (result) => {
                if (await result.status) {
                    setCurrentUserGeneralDetails(JSON.parse(result.user));
                    setEditProfileStatus(true);
                } else {
                    setError("\n Error updating profile: " + result.message);
                }
                setToDefault();
                setShowEditProfile(true);
            },
            (error) => setError("\n Error updating profile: " + error)
        );
    };

    const changePasswordMethod = async (
        currentPassword: string,
        newPassword: string
    ) => {
        setChangePasswordCurrentPassword(currentPassword);
        setChangePasswordNewPassword(newPassword);
        await handleApiCall(
            "http://localhost:9090/api/users/changePassword",
            "PUT",
            {
                email: userEmail,
                currentPassword,
                newPassword,
            },
            async (result) => {
                if ((await result.status) == "Success") {
                    setChangePasswordStatus(true);
                } else {
                    setError("\n Error changing password: " + result.message);
                }
                setToDefault();
                setShowChangePassword(true);
            },
            (error) => setError("\n Error changing password: " + error)
        );
    };

    const addShippingAddressMethod = async (newShippingAddress: string) => {
        setNewShippingAddress(newShippingAddress);
        await handleApiCall(
            "http://localhost:9090/api/users/shippingAddresses/add",
            "PUT",
            {
                email: userEmail,
                newShippingAddress,
            },
            async (result) => {
                if ((await result.status) == "Success") {
                    setAddNewShippingAddressStatus(true);
                    setCurrentUserShippingAddresses(
                        JSON.parse(result.shippingAddresses)
                    );
                } else {
                    setError(
                        "\n Error adding shipping address: " + result.message
                    );
                }
                setToDefault();
                setShowAddShippingAddress(true);
            },
            (error) => setError("\n Error adding shipping address: " + error)
        );
    };

    const updateShippingAddressMethod = async (
        index: number,
        updateShippingAddress: string
    ) => {
        setUpdateShippingAddressIndex(index);
        setUpdateShippingAddress(newShippingAddress);
        await handleApiCall(
            "http://localhost:9090/api/users/shippingAddresses/update",
            "PUT",
            {
                email: userEmail,
                index,
                updateShippingAddress,
            },
            async (result) => {
                if ((await result.status) == "Success") {
                    setUpdateShippingAddressStatus(true);
                    setCurrentUserShippingAddresses(
                        JSON.parse(result.shippingAddresses)
                    );
                } else {
                    setError(
                        "\n Error updating shipping address: " + result.message
                    );
                }
                setToDefault();
                setShowUpdateShippingAddress(true);
            },
            (error) => setError("\n Error updating shipping address: " + error)
        );
    };

    const removeShippingAddressMethod = async (removedAddress: string) => {
        setRemoveShippingAddress(removedAddress);
        await handleApiCall(
            "http://localhost:9090/api/users/shippingAddresses/remove",
            "DELETE",
            {
                email: userEmail,
                removedAddress,
            },
            async (result) => {
                if ((await result.status) == "Success") {
                    setRemoveShippingAddressStatus(true);
                    setCurrentUserShippingAddresses(
                        JSON.parse(result.shippingAddresses)
                    );
                } else {
                    setError(
                        "\n Error removing shipping address: " + result.message
                    );
                }
                setToDefault();
                setShowRemoveShippingAddress(true);
            },
            (error) => setError("\n Error removing shipping address: " + error)
        );
    };

    const addBillingAddressMethod = async (newBillingAddress: string) => {
        setNewBillingAddress(newBillingAddress);
        await handleApiCall(
            "http://localhost:9090/api/users/billingAddresses/add",
            "PUT",
            {
                email: userEmail,
                newBillingAddress,
            },
            async (result) => {
                if ((await result.status) == "Success") {
                    setAddNewBillingAddressStatus(true);
                    setCurrentUserBillingAddresses(
                        JSON.parse(result.billingAddresses)
                    );
                } else {
                    setError(
                        "\n Error adding billing address: " + result.message
                    );
                }
                setToDefault();
                setShowAddBillingAddress(true);
            },
            (error) => setError("\n Error adding billing address: " + error)
        );
    };

    const updateBillingAddressMethod = async (
        index: number,
        updateBillingAddress: string
    ) => {
        setUpdateBillingAddressIndex(index);
        setUpdateBillingAddress(newBillingAddress);
        await handleApiCall(
            "http://localhost:9090/api/users/billingAddresses/update",
            "PUT",
            {
                email: userEmail,
                index,
                updateBillingAddress,
            },
            async (result) => {
                if ((await result.status) == "Success") {
                    setUpdateBillingAddressStatus(true);
                    setCurrentUserBillingAddresses(
                        JSON.parse(result.billingAddresses)
                    );
                } else {
                    setError(
                        "\n Error updating billing address: " + result.message
                    );
                }
                setToDefault();
                setShowUpdateBillingAddress(true);
            },
            (error) => setError("\n Error updating billing address: " + error)
        );
    };

    const removeBillingAddressMethod = async (removedAddress: string) => {
        setRemoveBillingAddress(removedAddress);
        await handleApiCall(
            "http://localhost:9090/api/users/billingAddresses/remove",
            "DELETE",
            {
                email: userEmail,
                removedAddress,
            },
            async (result) => {
                if ((await result.status) == "Success") {
                    setRemoveBillingAddressStatus(true);
                    setCurrentUserBillingAddresses(
                        JSON.parse(result.billingAddresses)
                    );
                } else {
                    setError(
                        "\n Error removing billing address: " + result.message
                    );
                }
                setToDefault();
                setShowRemoveBillingAddress(true);
            },
            (error) => setError("\n Error removing billing address: " + error)
        );
    };

    const addPaymentDetailMethod = async (
        paymentMethod: string,
        cardNumber: string,
        expiryDate?: string,
        cvv?: string
    ) => {
        setNewPaymentDetails({
            paymentMethod,
            cardNumber,
            expiryDate: expiryDate || "",
            cvv: cvv || "",
        });
        await handleApiCall(
            "http://localhost:9090/api/users/paymentDetails/add",
            "PUT",
            {
                email: userEmail,
                paymentMethod,
                cardNumber,
                expiryDate,
                cvv,
            },
            async (result) => {
                if ((await result.status) == "Success") {
                    setAddNewPaymentDetailStatus(true);
                    const parsedPaymentDetails = result.paymentDetails.map(
                        (paymentDetail: string) => JSON.parse(paymentDetail)
                    );
                    setCurrentUserPaymentDetails(parsedPaymentDetails);
                } else {
                    setError(
                        "\n Error adding payment detail: " + result.message
                    );
                }
                setToDefault();
                setShowAddPaymentDetail(true);
            },
            (error) => setError("\n Error adding payment detail: " + error)
        );
    };

    const removePaymentDetailMethod = async (paymentID: number) => {
        setRemovePaymentDetailIndex(paymentID);
        await handleApiCall(
            "http://localhost:9090/api/users/paymentDetails/remove",
            "DELETE",
            {
                email: userEmail,
                paymentID,
            },
            async (result) => {
                if ((await result.status) == "Success") {
                    setRemovePaymentDetailStatus(true);
                    const parsedPaymentDetails = result.paymentDetails.map(
                        (paymentDetail: string) => JSON.parse(paymentDetail)
                    );
                    setCurrentUserPaymentDetails(parsedPaymentDetails);
                } else {
                    setError(
                        "\n Error removing payment detail: " + result.message
                    );
                }
                setToDefault();
                setShowRemovePaymentDetail(true);
            },
            (error) => setError("\n Error removing payment detail: " + error)
        );
    };

    return (
        <div>
            <h1>Test API Page</h1>
            <button onClick={fetchUserData}>Fetch User Data</button>
            <button onClick={fetchProductData}>Fetch Product Data</button>
            <button
                onClick={() =>
                    validateUserLoginMethod("jdoe@example.com", "password123")
                }
            >
                Validate User Login
            </button>
            <button
                onClick={() =>
                    createUserAccountMethod(
                        "jdoe",
                        "testRegistering@example.com",
                        "password123",
                        "Singapore",
                        "John",
                        "Doe",
                        "+6012-345 6789",
                        1,
                        "1990-01-01",
                        true
                    )
                }
            >
                Create Account
            </button>
            <button onClick={viewCurrentUserShippingAddressesMethod}>
                View Shipping Addresses
            </button>
            <button onClick={viewCurrentUserBillingAddressesMethod}>
                View Billing Addresses
            </button>
            <button onClick={viewCurrentUserPaymentDetailsMethod}>
                View Payment Details
            </button>
            <button
                onClick={() => editProfileMethod("phoneNo", "+6011-5860 6808")}
            >
                Edit Profile
            </button>
            <button
                onClick={() =>
                    changePasswordMethod("password123", "password1234")
                }
            >
                Change Password
            </button>
            <button
                onClick={() =>
                    addShippingAddressMethod(
                        "123, Test Street, Test City, Test State, Test Country, 12345"
                    )
                }
            >
                Add Shipping Address
            </button>
            <button
                onClick={() =>
                    updateShippingAddressMethod(
                        0,
                        "123, Test Street, Test City, Test State, Test Country, 12345"
                    )
                }
            >
                Update Shipping Address
            </button>
            <button
                onClick={() =>
                    removeShippingAddressMethod("234 Elm St, Kuala Lumpur")
                }
            >
                Remove Shipping Address
            </button>
            <button
                onClick={() =>
                    addBillingAddressMethod(
                        "123, Test Street, Test City, Test State, Test Country, 12345"
                    )
                }
            >
                Add Billing Address
            </button>
            <button
                onClick={() =>
                    updateBillingAddressMethod(
                        0,
                        "123, Test Street, Test City, Test State, Test Country, 12345"
                    )
                }
            >
                Update Billing Address
            </button>
            <button
                onClick={() =>
                    removeBillingAddressMethod("123 Main St, Kuala Lumpur")
                }
            >
                Remove Billing Address
            </button>
            <button
                onClick={() =>
                    addPaymentDetailMethod(
                        "Visa",
                        "1234 5678 9012 3456",
                        "12/24",
                        "123"
                    )
                }
            >
                Add Payment Details
            </button>
            <button
                onClick={() =>
                    removePaymentDetailMethod(1)
                }
            >
                Remove Payment Details
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
                        craeteAccountObject={craeteAccountObject}
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
                {showEditProfile && (
                    <UsersEditProfileServlet
                        field={editField}
                        value={editValue}
                        editProfileStatus={editProfileStatus}
                        currentUserGeneralDetails={currentUserGeneralDetails}
                    />
                )}
                {showChangePassword && (
                    <UsersChangePasswordServlet
                        currentPassword={changePasswordCurrentPassword}
                        newPassword={changePasswordNewPassword}
                        changePasswordStatus={changePasswordStatus}
                    />
                )}
                {showAddShippingAddress && (
                    <UsersShippingAddressesAddServlet
                        newAddress={newShippingAddress}
                        addAddressStatus={addNewShippingAddressStatus}
                        addresses={currentUserShippingAddresses}
                    />
                )}
                {showUpdateShippingAddress && (
                    <UsersShippingAddressesUpdateServlet
                        updateAddress={updateShippingAddress}
                        updateAddressStatus={updateShippingAddressStatus}
                        addresses={currentUserShippingAddresses}
                    />
                )}
                {showRemoveShippingAddress && (
                    <UsersShippingAddressesRemoveServlet
                        removeShippingAddress={removeShippingAddress}
                        removeAddressStatus={removeShippingAddressStatus}
                        addresses={currentUserShippingAddresses}
                    />
                )}
                {showAddBillingAddress && (
                    <UsersBillingAddressesAddServlet
                        newAddress={newBillingAddress}
                        addAddressStatus={addNewBillingAddressStatus}
                        addresses={currentUserBillingAddresses}
                    />
                )}
                {showUpdateBillingAddress && (
                    <UsersBillingAddressesUpdateServlet
                        updateAddress={updateBillingAddress}
                        updateAddressStatus={updateBillingAddressStatus}
                        addresses={currentUserBillingAddresses}
                    />
                )}
                {showRemoveBillingAddress && (
                    <UsersBillingAddressesRemoveServlet
                        removeBillingAddress={removeBillingAddress}
                        removeAddressStatus={removeBillingAddressStatus}
                        addresses={currentUserBillingAddresses}
                    />
                )}
                {showAddPaymentDetail && (
                    <UsersPaymentDetailsAddServlet
                        newPaymentDetails={newPaymentDetails}
                        addPaymentDetailStatus={addNewPaymentDetailStatus}
                        paymentDetails={currentUserPaymentDetails}
                    />
                )}
                {showRemovePaymentDetail && (
                    <UsersPaymentDetailsRemoveServlet
                        removePaymentDetailIndex={removePaymentDetailIndex}
                        removePaymentDetailStatus={removePaymentDetailStatus}
                        paymentDetails={currentUserPaymentDetails}
                    />
                )}
            </div>
        </div>
    );
};

export default TestAPI;
