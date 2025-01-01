import React from "react";

interface UsersShippingAddressesServletProps {
    addresses: string[];
}

const UsersShippingAddressesServlet: React.FC<UsersShippingAddressesServletProps> = ({ addresses }) => {
    return (
        <div>
            <h2>Shipping Addresses</h2>
            {addresses.map((address, index) => (
                <li key={index}>{address}</li>
            ))}
        </div>
    );
};

export default UsersShippingAddressesServlet;
