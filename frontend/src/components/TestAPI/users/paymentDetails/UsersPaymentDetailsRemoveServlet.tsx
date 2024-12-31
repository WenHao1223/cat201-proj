import React from "react";
import {
    PaymentGeneralInterface,
} from "@interfaces/API/UserInterface";

interface UsersPaymentDetailsRemoveServletProps {
    removePaymentDetailIndex: number;
    removePaymentDetailStatus: boolean;
    paymentDetails: PaymentGeneralInterface[];
}

const UsersPaymentDetailsRemoveServlet: React.FC<
    UsersPaymentDetailsRemoveServletProps
> = ({
    removePaymentDetailIndex,
    removePaymentDetailStatus,
    paymentDetails,
}) => {
    return (
        <div>
            <h2>New Payment Details</h2>
            <div
                style={{
                    border: "1px solid #ccc",
                    padding: "10px",
                    margin: "10px",
                }}
            >
                <p>Payment Detail Index: {removePaymentDetailIndex}</p>
            </div>
            <hr />
            <p>
                Remove payment details status:{" "}
                {removePaymentDetailStatus ? "Success" : "Failure"}
            </p>

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
                    {paymentDetail.paymentID && (
                        <p>Payment ID: {paymentDetail.paymentID}</p>
                    )}
                    <p>Payment Method: {paymentDetail.paymentMethod}</p>
                    <p>Card Number: {paymentDetail.cardNumber}</p>
                </div>
            ))}
        </div>
    );
};

export default UsersPaymentDetailsRemoveServlet;
