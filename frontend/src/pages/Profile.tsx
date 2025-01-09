import React, { useState } from "react";

const Profile: React.FC = () => {
    const [userData, setUserData] = useState({
        username: "",
        email: "",
        password: "",
        nationality: "",
        firstName: "",
        lastName: "",
        phoneNo: "",
        gender: "",
        dob: "",
        paymentDetails: [],
        shippingAddresses: [],
        billingAddresses: [],
    });

    const handleInputChange = (field: string, value: string) => {
        setUserData({ ...userData, [field]: value });
    };

    const saveProfile = () => {
        // Implement save functionality here
        console.log("Profile saved", userData);
    };

    const editProfile = () => {
        // Implement edit functionality here
        console.log("Profile edited", userData);
    }

    const addShippingAddress = () => {
        // ...existing code...
    };

    const deleteShippingAddress = (index: number) => {
        // ...existing code...
    };

    const addBillingAddress = () => {
        // ...existing code...
    };

    const deleteBillingAddress = (index: number) => {
        // ...existing code...
    };

    const addPaymentMethod = () => {
        // ...existing code...
    };

    const deletePaymentMethod = (index: number) => {
        // ...existing code...
    };

    return (
        <div className="profile-page p-6 bg-gray-100 min-h-screen flex flex-col items-center">
            <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="card profile-card bg-white shadow-md rounded-lg p-6 mb-6">
                    <h2 className="text-2xl font-semibold mb-4 text-center">Profile Information</h2>
                    <div className="profile-info grid grid-cols-1 gap-4">
                        <div className="profile-item">
                            <label className="block text-sm font-medium text-gray-700">Username:</label> Jccc$
                            {/* <input
                                type="text"
                                value={userData.username}
                                onChange={(e) => handleInputChange("username", e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            /> */}
                        </div>
                        <div className="profile-item">
                            <label className="block text-sm font-medium text-gray-700">Email:</label> tantjc227@gmail.com
                            {/* <input
                                type="text"
                                value={userData.email}
                                onChange={(e) => handleInputChange("email", e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            /> */}
                        </div>
                        <div className="profile-item">
                            <label className="block text-sm font-medium text-gray-700">Password:</label> abcd1234
                            {/* <input
                                type="text"
                                value={userData.password}
                                onChange={(e) => handleInputChange("password", e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            /> */}
                        </div>
                        <div className="profile-item">
                            <label className="block text-sm font-medium text-gray-700">First Name:</label> Tan
                            {/* <input
                                type="text"
                                value={userData.firstName}
                                onChange={(e) => handleInputChange("firstName", e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            /> */}
                        </div>
                        <div className="profile-item">
                            <label className="block text-sm font-medium text-gray-700">Last Name: </label> Jun Cheng 
                            {/* <i className="fa fa-pen"></i> */}
                            {/* <input
                                type="text"
                                value={userData.lastName}
                                onChange={(e) => handleInputChange("lastName", e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            /> */}
                        </div>
                        <div className="profile-item">
                            <label className="block text-sm font-medium text-gray-700">Phone Number:</label> 0123456789
                            {/* <input
                                type="text"
                                value={userData.phoneNo}
                                onChange={(e) => handleInputChange("phoneNo", e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            /> */}
                        </div>
                        <div className="profile-item">
                            <label className="block text-sm font-medium text-gray-700">Nationality:</label> Malaysian
                            {/* <input
                                type="text"
                                value={userData.nationality}
                                onChange={(e) => handleInputChange("nationality", e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            /> */}
                        </div>
                        <div className="profile-item">
                            <label className="block text-sm font-medium text-gray-700">Gender:</label> Male
                            {/* <input
                                type="text"
                                value={userData.gender}
                                onChange={(e) => handleInputChange("gender", e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            /> */}
                        </div>
                        <div className="profile-item">
                            <label className="block text-sm font-medium text-gray-700">Date of Birth:</label> 22/07/2000
                            {/* <input
                                type="text"
                                value={userData.dob}
                                onChange={(e) => handleInputChange("dob", e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            /> */}
                        </div>
                    </div>

                    <button
                        onClick={editProfile}
                        className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
                    >
                        Edit Profile
                    </button>
                    <button
                        onClick={saveProfile}
                        className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
                    >
                        Save Profile
                    </button>
                </div>

                <div className="card-container grid grid-cols-1 gap-6">
                    <div className="card bg-white shadow-md rounded-lg p-6">
                        <h3 className="text-xl font-semibold mb-4">Payment Methods</h3>
                        <ul className="list-disc pl-5 space-y-2">
                            {userData.paymentDetails.map((method, index) => (
                                <li key={index} className="flex justify-between items-center">
                                    <span>{method}</span>
                                    <button
                                        // onClick={() => deletePaymentMethod(index)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Delete
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <button
                            onClick={addPaymentMethod}
                            className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
                        >
                            Add Payment Method
                        </button>
                    </div>
                    <div className="card bg-white shadow-md rounded-lg p-6">
                        <h3 className="text-xl font-semibold mb-4">Shipping Addresses</h3>
                        <ul className="list-disc pl-5 space-y-2">
                            {userData.shippingAddresses.map((address, index) => (
                                <li key={index} className="flex justify-between items-center">
                                    <span>{address}</span>
                                    <button
                                        /*onClick={() => deleteShippingAddress(index)}*/
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Delete
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <button
                            // onClick={addShippingAddress}
                            className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
                        >
                            Add Shipping Address
                        </button>
                    </div>

                    <div className="card bg-white shadow-md rounded-lg p-6">
                        <h3 className="text-xl font-semibold mb-4">Billing Addresses</h3> 
                        <ul className="list-disc pl-5 space-y-2"> 
                            {userData.billingAddresses.map((address, index) => (
                                <li key={index} className="flex justify-between items-center">
                                    <span>{address}</span>
                                    <button
                                        // onClick={() => deleteBillingAddress(index)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Delete
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <button
                            onClick={addBillingAddress}
                            className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
                        >
                            Add Billing Address
                        </button>
                        
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Profile;