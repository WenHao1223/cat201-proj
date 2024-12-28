import React from "react";

interface UsersShippingAddressesRemoveServletProps {
    removeShippingAddress: string;
    removeAddressStatus: boolean;
    addresses: string[];
}

const UsersShippingAddressesRemoveServlet: React.FC<UsersShippingAddressesRemoveServletProps> = ({
    removeShippingAddress,
    removeAddressStatus,
    addresses,
}) => {
    return (
        <div>
            <h2>Remove Shipping Address</h2>
            <div>
                Removed Address: {removeShippingAddress}
                <hr />
                Add address status: {removeAddressStatus ? "Success" : "Failure"}
            </div>
            <h2>Shipping Addresses</h2>
            {addresses.map((address, index) => (
                <li key={index}>{address}</li>
            ))}
        </div>
    );
};

export default UsersShippingAddressesRemoveServlet;
