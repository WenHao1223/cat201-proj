import React from "react";

interface UsersShippingAddressesAddServletProps {
    newAddress: string;
    addAddressStatus: boolean;
    addresses: string[];
}

const UsersShippingAddressesAddServlet: React.FC<UsersShippingAddressesAddServletProps> = ({
    newAddress,
    addAddressStatus,
    addresses,
}) => {
    return (
        <div>
            <h2>Add New Shipping Address</h2>
            <div>
                New Address: {newAddress}
                <hr />
                Add address status: {addAddressStatus ? "Success" : "Failure"}
            </div>
            <h2>Shipping Addresses</h2>
            {addresses.map((address, index) => (
                <li key={index}>{address}</li>
            ))}
        </div>
    );
};

export default UsersShippingAddressesAddServlet;
