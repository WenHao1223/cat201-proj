import {
    PaymentGeneralInterface,
    UserGeneralDetailsInterface,
} from "@interfaces/API/UserInterface";
import handleApiCall from "@utils/handleApiCall";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Card from "@assets/payment/card.png";
import PayPal from "@assets/payment/paypal.png";
import Visa from "@assets/payment/visa.png";
import Navbar from "@components/Navbar";
import Swal from "sweetalert2";

interface ProfileProps {
    currentUserGeneralDetails: UserGeneralDetailsInterface | null;
    setCurrentUserGeneralDetails: React.Dispatch<
        React.SetStateAction<UserGeneralDetailsInterface | null>
    >;
    isLogin: boolean;
    setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const Profile: React.FC<ProfileProps> = ({
    currentUserGeneralDetails,
    setCurrentUserGeneralDetails,
    isLogin,
    setIsLogin,
}) => {
    const [currentUserPaymentDetails, setCurrentUserPaymentDetails] = useState<
        PaymentGeneralInterface[]
    >([]);
    const [currentUserShippingAddresses, setCurrentUserShippingAddresses] =
        useState<string[]>([]);
    const [currentUserBillingAddresses, setCurrentUserBillingAddresses] =
        useState<string[]>([]);
    const [error, setError] = useState<string>("");

    const navigate = useNavigate();
    useEffect(() => {
        if (!isLogin) {
            navigate("/login");
        } else {
            viewCurrentUserPaymentDetailsMethod();
            viewCurrentUserShippingAddressesMethod();
            viewCurrentUserBillingAddressesMethod();
        }
    }, [isLogin]);

    const viewCurrentUserPaymentDetailsMethod = async () => {
        await handleApiCall(
            `users/paymentDetails?email=${currentUserGeneralDetails?.email}`,
            "GET",
            null,
            async (result) => {
                if ((await result.status) === "Success") {
                    const paymentDetailsArray = result.paymentDetails.map(
                        (paymentDetail: string) => JSON.parse(paymentDetail)
                    );
                    console.log(paymentDetailsArray);
                    setCurrentUserPaymentDetails(paymentDetailsArray);
                } else {
                    setError(
                        "\n Error viewing payment details: " + result.message
                    );
                }
            },
            (error) => setError("\n Error viewing payment details: " + error)
        );
    };

    const viewCurrentUserShippingAddressesMethod = async () => {
        await handleApiCall(
            `users/shippingAddresses?email=${currentUserGeneralDetails?.email}`,
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
            },
            (error) => setError("\n Error viewing shipping addresses: " + error)
        );
    };

    const addShippingAddress = async () => {
        Swal.fire({
            title: "Add Shipping Address",
            input: "text",
            showCancelButton: true,
            confirmButtonText: "Add",
            showLoaderOnConfirm: true,
            preConfirm: async (newShippingAddress: string) => {
                await handleApiCall(
                    `users/shippingAddresses/add`,
                    "POST",
                    {
                        email: currentUserGeneralDetails?.email,
                        newShippingAddress,
                    },
                    async (result) => {
                        if ((await result.status) === "Success") {
                            setCurrentUserShippingAddresses(
                                JSON.parse(result.shippingAddresses)
                            );
                        } else {
                            setError(
                                "\n Error adding shipping address: " +
                                    result.message
                            );
                        }
                    },
                    (error) =>
                        setError("\n Error adding shipping address: " + error)
                );
            },
            allowOutsideClick: () => !Swal.isLoading(),
        });
    };

    const updateShippingAddress = async (index: number) => {
        Swal.fire({
            title: "Update Shipping Address",
            input: "text",
            inputValue: currentUserShippingAddresses[index],
            showCancelButton: true,
            confirmButtonText: "Update",
            showLoaderOnConfirm: true,
            preConfirm: async (updateShippingAddress: string) => {
                await handleApiCall(
                    `users/shippingAddresses/update`,
                    "PUT",
                    {
                        email: currentUserGeneralDetails?.email,
                        index,
                        updateShippingAddress,
                    },
                    async (result) => {
                        if ((await result.status) === "Success") {
                            setCurrentUserShippingAddresses(
                                JSON.parse(result.shippingAddresses)
                            );
                        } else {
                            setError(
                                "\n Error updating shipping address: " +
                                    result.message
                            );
                        }
                    },
                    (error) =>
                        setError("\n Error updating shipping address: " + error)
                );
            },
            allowOutsideClick: () => !Swal.isLoading(),
        });
    };

    const removeShippingAddress = async (removedAddress: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await handleApiCall(
                    `users/shippingAddresses/remove`,
                    "DELETE",
                    {
                        email: currentUserGeneralDetails?.email,
                        removedAddress,
                    },
                    async (result) => {
                        if ((await result.status) === "Success") {
                            setCurrentUserShippingAddresses(
                                JSON.parse(result.shippingAddresses)
                            );
                        } else {
                            setError(
                                "\n Error removing shipping address: " +
                                    result.message
                            );
                        }
                    },
                    (error) =>
                        setError("\n Error removing shipping address: " + error)
                );
            }
        });
    };

    const viewCurrentUserBillingAddressesMethod = async () => {
        await handleApiCall(
            `users/billingAddresses?email=${currentUserGeneralDetails?.email}`,
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
            },
            (error) => setError("\n Error viewing billing addresses: " + error)
        );
    };

    const addBillingAddress = async () => {
        Swal.fire({
            title: "Add Billing Address",
            input: "text",
            showCancelButton: true,
            confirmButtonText: "Add",
            showLoaderOnConfirm: true,
            preConfirm: async (newBillingAddress: string) => {
                await handleApiCall(
                    `users/billingAddresses/add`,
                    "POST",
                    {
                        email: currentUserGeneralDetails?.email,
                        newBillingAddress,
                    },
                    async (result) => {
                        if ((await result.status) === "Success") {
                            setCurrentUserBillingAddresses(
                                JSON.parse(result.billingAddresses)
                            );
                        } else {
                            setError(
                                "\n Error adding billing address: " +
                                    result.message
                            );
                        }
                    },
                    (error) =>
                        setError("\n Error adding billing address: " + error)
                );
            },
            allowOutsideClick: () => !Swal.isLoading(),
        });
    };

    const updateBillingAddress = async (index: number) => {
        Swal.fire({
            title: "Update Billing Address",
            input: "text",
            inputValue: currentUserBillingAddresses[index],
            showCancelButton: true,
            confirmButtonText: "Update",
            showLoaderOnConfirm: true,
            preConfirm: async (updateBillingAddress: string) => {
                await handleApiCall(
                    `users/billingAddresses/update`,
                    "PUT",
                    {
                        email: currentUserGeneralDetails?.email,
                        index,
                        updateBillingAddress,
                    },
                    async (result) => {
                        if ((await result.status) === "Success") {
                            setCurrentUserBillingAddresses(
                                JSON.parse(result.billingAddresses)
                            );
                        } else {
                            setError(
                                "\n Error updating billing address: " +
                                    result.message
                            );
                        }
                    },
                    (error) =>
                        setError("\n Error updating billing address: " + error)
                );
            },
            allowOutsideClick: () => !Swal.isLoading(),
        });
    };
    
    const removeBillingAddress = async (removedAddress: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await handleApiCall(
                    `users/billingAddresses/remove`,
                    "DELETE",
                    {
                        email: currentUserGeneralDetails?.email,
                        removedAddress,
                    },
                    async (result) => {
                        if ((await result.status) === "Success") {
                            setCurrentUserBillingAddresses(
                                JSON.parse(result.billingAddresses)
                            );
                        } else {
                            setError(
                                "\n Error removing billing address: " +
                                    result.message
                            );
                        }
                    },
                    (error) =>
                        setError("\n Error removing billing address: " + error)
                );
            }
        });
    };

    const handleInputChange = (field: string, value: string) => {
        // setUserData({ ...userData, [field]: value });
    };

    const saveProfile = () => {
        // console.log("Profile saved", userData);
    };

    const editProfile = () => {
        // console.log("Profile edited", userData);
    };

    return (
        <div className="bg-gray-100">
            <Navbar
                isLogin={isLogin}
                setIsLogin={setIsLogin}
                setCurrentUserGeneralDetails={setCurrentUserGeneralDetails}
            />
            <div className="mx-auto bg-gray-100 max-w-2xl pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="profile-page p-6 flex flex-col items-center overflow-hidden">
                    <h1 className="text-3xl font-semibold my-4 text-center">
                        Profile
                    </h1>
                    <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Non-scrollable Profile Information */}
                        <div className="card profile-card bg-white shadow-md rounded-lg p-6 mb-6">
                            <h3 className="text-xl font-semibold mb-4">
                                General Information
                            </h3>
                            <div className="profile-info grid grid-cols-1 gap-4">
                                <div className="profile-item">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Username:
                                    </label>
                                    <span className="block font-light">
                                        {currentUserGeneralDetails?.username}
                                    </span>
                                </div>
                                <div className="profile-item">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Email:
                                    </label>
                                    <span className="block font-light">
                                        {currentUserGeneralDetails?.email}
                                    </span>
                                </div>
                                <div className="profile-item">
                                    <label className="block text-sm font-medium text-gray-700">
                                        First Name:
                                    </label>
                                    <span className="block font-light">
                                        {currentUserGeneralDetails?.firstName}
                                    </span>
                                </div>
                                <div className="profile-item">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Last Name:
                                    </label>
                                    <span className="block font-light">
                                        {currentUserGeneralDetails?.lastName}
                                    </span>
                                </div>
                                <div className="profile-item">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Phone Number:
                                    </label>
                                    <span className="block font-light">
                                        {currentUserGeneralDetails?.phoneNo}
                                    </span>
                                </div>
                                <div className="profile-item">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Nationality:
                                    </label>
                                    <span className="block font-light">
                                        {currentUserGeneralDetails?.nationality}
                                    </span>
                                </div>
                                <div className="profile-item">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Gender:
                                    </label>
                                    <span className="block font-light">
                                        {currentUserGeneralDetails?.gender}
                                    </span>
                                </div>
                                <div className="profile-item">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Date of Birth:
                                    </label>
                                    <span className="block font-light">
                                        {currentUserGeneralDetails?.dob}
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={editProfile}
                                className="mt-4 w-full rounded-md border border-transparent bg-indigo-500 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Edit Profile
                            </button>
                        </div>

                        {/* Scrollable Section */}
                        <div className="card-container grid grid-cols-1 gap-6 overflow-y-auto h-[calc(100vh-50px)]">
                            <div className="card bg-white shadow-md rounded-lg p-6">
                                <h3 className="text-xl font-semibold mb-4">
                                    Payment Methods
                                </h3>
                                <ul className="grid grid-cols-1 gap-4">
                                    {currentUserPaymentDetails.map(
                                        (
                                            paymentDetail: PaymentGeneralInterface,
                                            index: any
                                        ) => (
                                            <li
                                                key={paymentDetail.paymentID}
                                                className="flex justify-between items-center p-4 border rounded"
                                            >
                                                <div className="flex items-center space-x-4">
                                                    <img
                                                        src={
                                                            paymentDetail.paymentMethod ===
                                                                "DEBIT_CARD" ||
                                                            paymentDetail.paymentMethod ===
                                                                "CREDIT_CARD"
                                                                ? Card
                                                                : paymentDetail.paymentMethod ===
                                                                  "PAYPAL"
                                                                ? PayPal
                                                                : paymentDetail.paymentMethod ===
                                                                  "VISA"
                                                                ? Visa
                                                                : ""
                                                        }
                                                        alt={
                                                            paymentDetail.paymentMethod
                                                        }
                                                        className="w-8 h-8"
                                                    />
                                                    <span>
                                                        {
                                                            paymentDetail.cardNumber
                                                        }
                                                    </span>
                                                </div>
                                                <div className="flex space-x-2">
                                                    <button className="bg-transparent border-1 border-gray-900 text-red-500 hover:bg-gray-800 hover:text-red-300">
                                                        <i className="fas fa-minus"></i>
                                                    </button>
                                                </div>
                                            </li>
                                        )
                                    )}
                                </ul>
                                <button className="mt-4 w-full rounded-md border border-transparent bg-indigo-500 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                    Add Payment Method
                                </button>
                            </div>

                            <div className="card bg-white shadow-md rounded-lg p-6">
                                <h3 className="text-xl font-semibold mb-4">
                                    Shipping Addresses
                                </h3>
                                <ul className="list-disc space-y-2">
                                    <ul className="grid grid-cols-1 gap-4">
                                        {currentUserShippingAddresses.map(
                                            (address, index) => (
                                                <li
                                                    key={index}
                                                    className="flex justify-between items-center p-4 border rounded-md"
                                                >
                                                    <span>{address}</span>
                                                    <div className="flex space-x-2">
                                                        <button
                                                            className="bg-transparent border-1 border-gray-900 text-blue-500 hover:bg-gray-800 hover:text-blue-300"
                                                            onClick={() => {
                                                                updateShippingAddress(
                                                                    index
                                                                );
                                                            }}
                                                        >
                                                            <i className="fas fa-pencil-alt"></i>
                                                        </button>
                                                        <button
                                                            className="bg-transparent border-1 border-gray-900 text-red-500 hover:bg-gray-800 hover:text-red-300"
                                                            onClick={() => {
                                                                removeShippingAddress(
                                                                    address
                                                                );
                                                            }}
                                                        >
                                                            <i className="fas fa-minus"></i>
                                                        </button>
                                                    </div>
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </ul>
                                <button
                                    className="mt-4 w-full rounded-md border border-transparent bg-indigo-500 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    onClick={addShippingAddress}
                                >
                                    Add Shipping Address
                                </button>
                            </div>

                            <div className="card bg-white shadow-md rounded-lg p-6">
                                <h3 className="text-xl font-semibold mb-4">
                                    Billing Addresses
                                </h3>
                                <ul className="grid grid-cols-1 gap-4">
                                    {currentUserBillingAddresses.map(
                                        (address, index) => (
                                            <li
                                                key={index}
                                                className="flex justify-between items-center p-4 border rounded-md"
                                            >
                                                <span>{address}</span>
                                                <div className="flex space-x-2">
                                                    <button
                                                        className="bg-transparent border-1 border-gray-900 text-blue-500 hover:bg-gray-800 hover:text-blue-300"
                                                        onClick={() => {
                                                            updateBillingAddress(
                                                                index
                                                            );
                                                        }}
                                                    >
                                                        <i className="fas fa-pencil-alt"></i>
                                                    </button>
                                                    <button
                                                        className="bg-transparent border-1 border-gray-900 text-red-500 hover:bg-gray-800 hover:text-red-300"
                                                        onClick={() => {
                                                            removeBillingAddress(
                                                                address
                                                            );
                                                        }}
                                                    >
                                                        <i className="fas fa-minus"></i>
                                                    </button>
                                                </div>
                                            </li>
                                        )
                                    )}
                                </ul>
                                <button
                                    className="mt-4 w-full rounded-md border border-transparent bg-indigo-500 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    onClick={addBillingAddress}
                                >
                                    Add Billing Address
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
