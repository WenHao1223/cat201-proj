import {
    PaymentGeneralInterface,
    UserGeneralDetailsInterface,
} from "@interfaces/API/UserInterface";
import handleApiCall from "@utils/handleApiCall";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getNames } from "country-list";

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
    isAdmin: boolean;
}

const Profile: React.FC<ProfileProps> = ({
    currentUserGeneralDetails,
    setCurrentUserGeneralDetails,
    isLogin,
    setIsLogin,
    isAdmin,
}) => {
    const [currentUserPaymentDetails, setCurrentUserPaymentDetails] = useState<
        PaymentGeneralInterface[]
    >([]);
    const [currentUserShippingAddresses, setCurrentUserShippingAddresses] =
        useState<string[]>([]);
    const [currentUserBillingAddresses, setCurrentUserBillingAddresses] =
        useState<string[]>([]);
    const [error, setError] = useState<string>("");
    const [isEditing, setIsEditing] = useState(false);
    const [editableUserDetails, setEditableUserDetails] =
        useState<UserGeneralDetailsInterface | null>(null);

    const countryOptions = getNames().sort();
    const today = new Date().toISOString().split("T")[0];

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

    useEffect(() => {
        if (isAdmin) {
            Swal.fire({
                title: "Error",
                text: "You are not authorized to view this page",
                icon: "error",
                allowOutsideClick: false,
                allowEscapeKey: false,
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/main");
                }
            });
        }
    }, [isAdmin]);

    useEffect(() => {
        if (currentUserGeneralDetails) {
            setEditableUserDetails({ ...currentUserGeneralDetails });
        }
    }, [currentUserGeneralDetails]);

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

    const addPaymentMethod = async () => {
        Swal.fire({
            title: "Add Payment Method",
            html: `
                <select id="paymentMethodType" class="swal2-select w-[80%]">
                    <option value="debit_card">Debit Card</option>
                    <option value="credit_card">Credit Card</option>
                    <option value="paypal">PayPal</option>
                    <option value="visa">Visa</option>
                </select>
                <input type="text" id="cardNumber" class="swal2-input" placeholder="Enter card number">
                <div id="additionalFields" style="display: block;">
                    <input type="text" id="expiryDate" class="swal2-input" placeholder="Enter expiry date (MM/YY)">
                    <input type="text" id="cvv" class="swal2-input" placeholder="Enter CVV (3 digits)">
                </div>
            `,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: "Add",
            showLoaderOnConfirm: true,
            preConfirm: async () => {
                const paymentMethod = (
                    document.getElementById(
                        "paymentMethodType"
                    ) as HTMLSelectElement
                ).value;
                const cardNumber = (
                    document.getElementById("cardNumber") as HTMLInputElement
                ).value;
                const expiryDate = (
                    document.getElementById("expiryDate") as HTMLInputElement
                ).value;
                const cvv = (document.getElementById("cvv") as HTMLInputElement)
                    .value;

                if (!cardNumber) {
                    Swal.showValidationMessage(
                        "Card number or email is required"
                    );
                    return;
                }

                if (
                    (paymentMethod === "debit_card" ||
                        paymentMethod === "credit_card") &&
                    (!expiryDate || !cvv)
                ) {
                    Swal.showValidationMessage(
                        "Expiry date and CVV are required for debit and credit cards"
                    );
                    return;
                }

                const newPaymentMethod = {
                    paymentMethod: paymentMethod,
                    cardNumber,
                    expiryDate:
                        paymentMethod === "debit_card" ||
                        paymentMethod === "credit_card"
                            ? expiryDate
                            : "",
                    cvv:
                        paymentMethod === "debit_card" ||
                        paymentMethod === "credit_card"
                            ? cvv
                            : "",
                };

                await handleApiCall(
                    `users/paymentDetails/add`,
                    "POST",
                    {
                        email: currentUserGeneralDetails?.email,
                        paymentMethod: newPaymentMethod.paymentMethod,
                        cardNumber: newPaymentMethod.cardNumber,
                        expiryDate: newPaymentMethod.expiryDate,
                        cvv: newPaymentMethod.cvv,
                    },
                    async (result) => {
                        if ((await result.status) === "Success") {
                            const paymentDetailsArray =
                                result.paymentDetails.map(
                                    (paymentDetail: string) =>
                                        JSON.parse(paymentDetail)
                                );
                            setCurrentUserPaymentDetails(paymentDetailsArray);
                        } else {
                            Swal.showValidationMessage(
                                `Error: ${result.message}`
                            );
                        }
                    },
                    (error) =>
                        Swal.showValidationMessage(`Request failed: ${error}`)
                );
            },
            allowOutsideClick: () => !Swal.isLoading(),
        });

        const paymentMethodTypeElement = document.getElementById(
            "paymentMethodType"
        ) as HTMLSelectElement;
        const cardNumberElement = document.getElementById(
            "cardNumber"
        ) as HTMLInputElement;
        const additionalFields = document.getElementById(
            "additionalFields"
        ) as HTMLDivElement;

        paymentMethodTypeElement.addEventListener("change", () => {
            if (
                paymentMethodTypeElement.value === "debit_card" ||
                paymentMethodTypeElement.value === "credit_card"
            ) {
                cardNumberElement.placeholder = "Enter card number";
                additionalFields.style.display = "block";
            } else {
                cardNumberElement.placeholder = "Enter email address";
                additionalFields.style.display = "none";
            }
        });
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

    const editProfileMethod = async (field: string, value: string) => {
        await handleApiCall(
            "users/editProfile",
            "PUT",
            {
                email: currentUserGeneralDetails?.email,
                field,
                value,
            },
            async (result) => {
                if (await result.status) {
                    setCurrentUserGeneralDetails(JSON.parse(result.user));
                } else {
                    setError("\n Error updating profile: " + result.message);
                }
            },
            (error) => setError("\n Error updating profile: " + error)
        );
    };

    const removePaymentMethod = async (paymentID: string) => {
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
                    `users/paymentDetails/remove`,
                    "DELETE",
                    {
                        email: currentUserGeneralDetails?.email,
                        paymentID,
                    },
                    async (result) => {
                        if ((await result.status) === "Success") {
                            const paymentDetailsArray =
                                result.paymentDetails.map(
                                    (paymentDetail: string) =>
                                        JSON.parse(paymentDetail)
                                );
                            setCurrentUserPaymentDetails(paymentDetailsArray);
                        } else {
                            setError(
                                "\n Error removing payment method: " +
                                    result.message
                            );
                        }
                    },
                    (error) =>
                        setError("\n Error removing payment method: " + error)
                );
            }
        });
    };

    const handleInputChange = (field: string, value: string) => {
        if (editableUserDetails) {
            setEditableUserDetails({ ...editableUserDetails, [field]: value });
            editProfileMethod(field, value);
        }
    };

    const saveProfile = async () => {
        if (editableUserDetails) {
            const updatedFields: Partial<UserGeneralDetailsInterface> = {};
            for (const key in editableUserDetails) {
                if (
                    editableUserDetails[
                        key as keyof UserGeneralDetailsInterface
                    ] !==
                    currentUserGeneralDetails?.[
                        key as keyof UserGeneralDetailsInterface
                    ]
                ) {
                    updatedFields[key as keyof UserGeneralDetailsInterface] =
                        editableUserDetails[
                            key as keyof UserGeneralDetailsInterface
                        ] as any;
                }
            }

            if (Object.keys(updatedFields).length > 0) {
                await handleApiCall(
                    `users/updateProfile`,
                    "PUT",
                    {
                        email: currentUserGeneralDetails?.email,
                        ...updatedFields,
                    },
                    async (result) => {
                        if ((await result.status) === "Success") {
                            setCurrentUserGeneralDetails(editableUserDetails);
                            Swal.fire(
                                "Success",
                                "Profile updated successfully",
                                "success"
                            );
                        } else {
                            setError(
                                "\n Error updating profile: " + result.message
                            );
                        }
                    },
                    (error) => setError("\n Error updating profile: " + error)
                );
            }
        }
        setIsEditing(false);
    };

    const editProfile = () => {
        setIsEditing(true);
    };

    const changePassword = () => {
        Swal.fire({
            title: "Change Password",
            html: `
            <input type="password" id="currentPassword" class="swal2-input" placeholder="Old Password">
            <input type="password" id="newPassword" class="swal2-input" placeholder="New Password">
            <input type="password" id="confirmPassword" class="swal2-input" placeholder="Confirm Password">
            `,
            showCancelButton: true,
            confirmButtonText: "Change",
            showLoaderOnConfirm: true,
            preConfirm: async () => {
                const currentPassword = (
                    document.getElementById(
                        "currentPassword"
                    ) as HTMLInputElement
                ).value;
                const newPassword = (
                    document.getElementById("newPassword") as HTMLInputElement
                ).value;
                const confirmPassword = (
                    document.getElementById(
                        "confirmPassword"
                    ) as HTMLInputElement
                ).value;

                if (newPassword !== confirmPassword) {
                    Swal.showValidationMessage("Passwords do not match");
                } else {
                    await handleApiCall(
                        `users/changePassword`,
                        "PUT",
                        {
                            email: currentUserGeneralDetails?.email,
                            currentPassword,
                            newPassword,
                        },
                        async (result) => {
                            if ((await result.status) === "Success") {
                                Swal.fire(
                                    "Success",
                                    "Password changed successfully",
                                    "success"
                                );
                            } else {
                                setError(
                                    "\n Error changing password: " +
                                        result.message
                                );
                            }
                        },
                        (error) =>
                            setError("\n Error changing password: " + error)
                    );
                }
            },
            allowOutsideClick: () => !Swal.isLoading(),
        });
    };

    return (
        <div className="bg-gray-100">
            <Navbar
                isLogin={isLogin}
                setIsLogin={setIsLogin}
                setCurrentUserGeneralDetails={setCurrentUserGeneralDetails}
                isAdmin={isAdmin}
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
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={
                                                editableUserDetails?.username
                                            }
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "username",
                                                    e.target.value
                                                )
                                            }
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
                                    ) : (
                                        <span className="block font-light">
                                            {
                                                currentUserGeneralDetails?.username
                                            }
                                        </span>
                                    )}
                                </div>
                                <div className="profile-item">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Email:
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="email"
                                            value={editableUserDetails?.email}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "email",
                                                    e.target.value
                                                )
                                            }
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
                                    ) : (
                                        <span className="block font-light">
                                            {currentUserGeneralDetails?.email}
                                        </span>
                                    )}
                                </div>
                                <div className="profile-item">
                                    <label className="block text-sm font-medium text-gray-700">
                                        First Name:
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={
                                                editableUserDetails?.firstName
                                            }
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "firstName",
                                                    e.target.value
                                                )
                                            }
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
                                    ) : (
                                        <span className="block font-light">
                                            {
                                                currentUserGeneralDetails?.firstName
                                            }
                                        </span>
                                    )}
                                </div>
                                <div className="profile-item">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Last Name:
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={
                                                editableUserDetails?.lastName
                                            }
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "lastName",
                                                    e.target.value
                                                )
                                            }
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
                                    ) : (
                                        <span className="block font-light">
                                            {
                                                currentUserGeneralDetails?.lastName
                                            }
                                        </span>
                                    )}
                                </div>
                                <div className="profile-item">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Phone Number:
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="phone"
                                            value={editableUserDetails?.phoneNo}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "phoneNo",
                                                    e.target.value
                                                )
                                            }
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
                                    ) : (
                                        <span className="block font-light">
                                            {currentUserGeneralDetails?.phoneNo}
                                        </span>
                                    )}
                                </div>
                                <div className="profile-item">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Nationality:
                                    </label>
                                    {isEditing ? (
                                        <select
                                            value={
                                                editableUserDetails?.nationality
                                            }
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "nationality",
                                                    e.target.value
                                                )
                                            }
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        >
                                            {countryOptions.map((country) => (
                                                <option
                                                    key={country}
                                                    value={country}
                                                >
                                                    {country}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        <span className="block font-light">
                                            {
                                                currentUserGeneralDetails?.nationality
                                            }
                                        </span>
                                    )}
                                </div>
                                <div className="profile-item">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Gender:
                                    </label>
                                    {isEditing ? (
                                        <select
                                            value={editableUserDetails?.gender}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "gender",
                                                    e.target.value == "Male"
                                                        ? "1"
                                                        : "2"
                                                )
                                            }
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        >
                                            <option value="Male">Male</option>
                                            <option value="Female">
                                                Female
                                            </option>
                                        </select>
                                    ) : (
                                        <span className="block font-light">
                                            {currentUserGeneralDetails?.gender}
                                        </span>
                                    )}
                                </div>
                                <div className="profile-item">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Date of Birth:
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="date"
                                            value={editableUserDetails?.dob}
                                            max={today}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "dob",
                                                    e.target.value
                                                )
                                            }
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
                                    ) : (
                                        <span className="block font-light">
                                            {currentUserGeneralDetails?.dob}
                                        </span>
                                    )}
                                </div>
                                <div className="profile-item">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Role:
                                    </label>
                                    <span className="block font-light">
                                        {currentUserGeneralDetails?.role}
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={isEditing ? saveProfile : editProfile}
                                className={`mt-4 w-full rounded-md border border-transparent px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                                    isEditing ? "bg-green-700" : "bg-indigo-500"
                                }`}
                            >
                                {isEditing ? "Save Profile" : "Edit Profile"}
                            </button>
                            <button
                                onClick={changePassword}
                                className={`mt-4 w-full rounded-md border border-transparent px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                                    isEditing ? "bg-green-700" : "bg-cyan-700"
                                }`}
                            >
                                Change Password
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
                                                    <button
                                                        className="bg-transparent border-1 border-gray-900 text-red-500 hover:bg-gray-800 hover:text-red-300"
                                                        onClick={() => {
                                                            removePaymentMethod(
                                                                paymentDetail.paymentID.toString()
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
                                    onClick={addPaymentMethod}
                                >
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
