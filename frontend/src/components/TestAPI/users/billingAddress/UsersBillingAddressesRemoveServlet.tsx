import React from "react";

interface UsersBillingAddressesRemoveServletProps {
    removeBillingAddress: string;
    removeAddressStatus: boolean;
    addresses: string[];
}

const UsersBillingAddressesRemoveServlet: React.FC<UsersBillingAddressesRemoveServletProps> = ({
    removeBillingAddress,
    removeAddressStatus,
    addresses,
}) => {
    return (
        <div>
            <h2>Remove Billing Address</h2>
            <div>
                Removed Address: {removeBillingAddress}
                <hr />
                Add address status: {removeAddressStatus ? "Success" : "Failure"}
            </div>
            <h2>Billing Addresses</h2>
            {addresses.map((address, index) => (
                <li key={index}>{address}</li>
            ))}
        </div>
    );
};

export default UsersBillingAddressesRemoveServlet;
