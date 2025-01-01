import React from "react";

interface UsersBillingAddressesServletProps {
    addresses: string[];
}

const UsersBillingAddressesServlet: React.FC<UsersBillingAddressesServletProps> = ({ addresses }) => {
    return (
        <div>
            <h2>Billing Addresses</h2>
            {addresses.map((address, index) => (
                <li key={index}>{address}</li>
            ))}
        </div>
    );
};

export default UsersBillingAddressesServlet;
