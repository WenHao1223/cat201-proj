import React from "react";
import {
    PaymentGeneralInterface,
    PaymentInterface,
} from "@interfaces/API/UserInterface";

interface UsersPaymentDetailsAddServletProps {
    newPaymentDetails: PaymentInterface;
    addPaymentDetailStatus: boolean;
    paymentDetails: PaymentGeneralInterface[];
}

const UsersPaymentDetailsAddServlet: React.FC<
    UsersPaymentDetailsAddServletProps
> = ({
    newPaymentDetails,
    paymentDetails,
    addPaymentDetailStatus,
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
                <p>Payment Method: {newPaymentDetails.paymentMethod}</p>
                <p>Card Number: {newPaymentDetails.cardNumber}</p>
            </div>
            <hr />
            <p>
                Add payment details status:{" "}
                {addPaymentDetailStatus ? "Success" : "Failure"}
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

export default UsersPaymentDetailsAddServlet;
