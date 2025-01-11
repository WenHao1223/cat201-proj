import { UserGeneralDetailsInterface } from "@interfaces/API/UserInterface";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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

    const navigate = useNavigate();
    if (!isLogin) {
        navigate("/login");
    }

    const handleInputChange = (field: string, value: string) => {
        // setUserData({ ...userData, [field]: value });
    };

    const saveProfile = () => {
        // console.log("Profile saved", userData);
    };

    const editProfile = () => {
        // console.log("Profile edited", userData);
    };

    console.log(currentUserGeneralDetails);

    return (
        <div className="profile-page p-6 bg-gray-100 min-h-screen flex flex-col items-center">
            <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Non-scrollable Profile Information */}
                <div className="card profile-card bg-white shadow-md rounded-lg p-6 mb-6">
                    <h2 className="text-2xl font-semibold mb-4 text-center">
                        Profile Information
                    </h2>
                    <div className="profile-info grid grid-cols-1 gap-4">
                        <div className="profile-item">
                            <label className="block text-sm font-medium text-gray-700">
                                Username:
                            </label>
                            <span className="block font-light">{currentUserGeneralDetails?.username}</span>
                        </div>
                        <div className="profile-item">
                            <label className="block text-sm font-medium text-gray-700">
                                Email:
                            </label>
                            <span className="block font-light">{currentUserGeneralDetails?.email}</span>
                        </div>
                        <div className="profile-item">
                            <label className="block text-sm font-medium text-gray-700">
                                First Name:
                            </label>
                            <span className="block font-light">{currentUserGeneralDetails?.firstName}</span>
                        </div>
                        <div className="profile-item">
                            <label className="block text-sm font-medium text-gray-700">
                                Last Name:
                            </label>
                            <span className="block font-light">{currentUserGeneralDetails?.lastName}</span>
                        </div>
                        <div className="profile-item">
                            <label className="block text-sm font-medium text-gray-700">
                                Phone Number:
                            </label>
                            <span className="block font-light">{currentUserGeneralDetails?.phoneNo}</span>
                        </div>
                        <div className="profile-item">
                            <label className="block text-sm font-medium text-gray-700">
                                Nationality:
                            </label>
                            <span className="block font-light">{currentUserGeneralDetails?.nationality}</span>
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
                            <span className="block font-light">{currentUserGeneralDetails?.dob}</span>
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
                <div className="card-container grid grid-cols-1 gap-6 overflow-y-auto h-[calc(100vh-150px)]">
                    <div className="card bg-white shadow-md rounded-lg p-6">
                        <h3 className="text-xl font-semibold mb-4">
                            Payment Methods
                        </h3>
                        <ul className="list-disc pl-5 space-y-2">
                            {/* {userData.paymentDetails.map((method, index) => (
                                <li
                                    key={index}
                                    className="flex justify-between items-center"
                                >
                                    <span>{method}</span>
                                    <button className="text-red-500 hover:text-red-700">
                                        Delete
                                    </button>
                                </li>
                            ))} */}
                        </ul>
                        <button className="mt-4 w-full rounded-md border border-transparent bg-indigo-500 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                            Add Payment Method
                        </button>
                    </div>

                    <div className="card bg-white shadow-md rounded-lg p-6">
                        <h3 className="text-xl font-semibold mb-4">
                            Shipping Addresses
                        </h3>
                        <ul className="list-disc pl-5 space-y-2">
                            {/* {userData.shippingAddresses.map(
                                (address, index) => (
                                    <li
                                        key={index}
                                        className="flex justify-between items-center"
                                    >
                                        <span>{address}</span>
                                        <button className="text-red-500 hover:text-red-700">
                                            Delete
                                        </button>
                                    </li>
                                )
                            )} */}
                        </ul>
                        <button className="mt-4 w-full rounded-md border border-transparent bg-indigo-500 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                            Add Shipping Address
                        </button>
                    </div>

                    <div className="card bg-white shadow-md rounded-lg p-6">
                        <h3 className="text-xl font-semibold mb-4">
                            Billing Addresses
                        </h3>
                        <ul className="list-disc pl-5 space-y-2">
                            {/* {userData.billingAddresses.map((address, index) => (
                                <li
                                    key={index}
                                    className="flex justify-between items-center"
                                >
                                    <span>{address}</span>
                                    <button className="text-red-500 hover:text-red-700">
                                        Delete
                                    </button>
                                </li>
                            ))} */}
                        </ul>
                        <button className="mt-4 w-full rounded-md border border-transparent bg-indigo-500 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                            Add Billing Address
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
