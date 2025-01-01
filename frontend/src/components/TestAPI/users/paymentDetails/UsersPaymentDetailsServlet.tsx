import React from "react";
import { PaymentGeneralInterface } from "@interfaces/API/UserInterface";

interface UsersPaymentDetailsServletProps {
    paymentDetails: PaymentGeneralInterface[];
}

const UsersPaymentDetailsServlet: React.FC<UsersPaymentDetailsServletProps> = ({
    paymentDetails,
}) => {
    return (
        <div>
            <h2>Payment Details</h2>
            {paymentDetails.map((paymentDetail, index) => (
                <div
                    key={index}
                    style={{
                        border: "1px solid #ccc",
                        padding: "10px",
                        margin: "10px",
                    }}
                >
                    <p>Payment ID: {paymentDetail.paymentID}</p>
                    <p>Payment Method: {paymentDetail.paymentMethod}</p>
                    <p>Card Number: {paymentDetail.cardNumber}</p>
                </div>
            ))}
        </div>
    );
};

export default UsersPaymentDetailsServlet;
