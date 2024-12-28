import React from "react";

interface UsersBillingAddressesAddServletProps {
    newAddress: string;
    addAddressStatus: boolean;
    addresses: string[];
}

const UsersBillingAddressesAddServlet: React.FC<UsersBillingAddressesAddServletProps> = ({
    newAddress,
    addAddressStatus,
    addresses,
}) => {
    return (
        <div>
            <h2>Add New Billing Address</h2>
            <div>
                New Address: {newAddress}
                <hr />
                Add address status: {addAddressStatus ? "Success" : "Failure"}
            </div>
            <h2>Billing Addresses</h2>
            {addresses.map((address, index) => (
                <li key={index}>{address}</li>
            ))}
        </div>
    );
};

export default UsersBillingAddressesAddServlet;
