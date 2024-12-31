import React from "react";

interface UsersShippingAddressesUpdateServletProps {
    updateAddress: string;
    updateAddressStatus: boolean;
    addresses: string[];
}

const UsersShippingAddressesUpdateServlet: React.FC<UsersShippingAddressesUpdateServletProps> = ({
    updateAddress,
    updateAddressStatus,
    addresses,
}) => {
    return (
        <div>
            <h2>Add New Shipping Address</h2>
            <div>
                New Address: {updateAddress}
                <hr />
                Add address status: {updateAddressStatus ? "Success" : "Failure"}
            </div>
            <h2>Shipping Addresses</h2>
            {addresses.map((address, index) => (
                <li key={index}>{address}</li>
            ))}
        </div>
    );
};

export default UsersShippingAddressesUpdateServlet;
