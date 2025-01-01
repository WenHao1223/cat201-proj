import React from "react";

interface UsersBillingAddressesUpdateServletProps {
    updateAddress: string;
    updateAddressStatus: boolean;
    addresses: string[];
}

const UsersBillingAddressesUpdateServlet: React.FC<
    UsersBillingAddressesUpdateServletProps
> = ({ updateAddress, updateAddressStatus, addresses }) => {
    return (
        <div>
            <h2>Add New Billing Address</h2>
            <div>
                New Address: {updateAddress}
                <hr />
                Add address status:{" "}
                {updateAddressStatus ? "Success" : "Failure"}
            </div>
            <h2>Billing Addresses</h2>
            {addresses.map((address, index) => (
                <li key={index}>{address}</li>
            ))}
        </div>
    );
};

export default UsersBillingAddressesUpdateServlet;
