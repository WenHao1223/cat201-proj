package com.chefsAura.models;

import com.chefsAura.enums.PaymentMethodEnum;

public class Payment {
    int paymentID;
    PaymentMethodEnum paymentMethod;
    String cardNumber;
    String expiryDate;
    String cvv;

    static int largestPaymentID = 0;

    public Payment() {
        paymentID = 0;
        paymentMethod = null;
        cardNumber = "";
        expiryDate = "";
        cvv = "";
    }

    public Payment(int paymentID, PaymentMethodEnum paymentMethod, String cardNumber,
            String expiryDate, String cvv) {
        this.paymentID = paymentID;
        this.paymentMethod = paymentMethod;
        this.cardNumber = cardNumber;
        this.expiryDate = expiryDate;
        this.cvv = cvv;

        if (paymentID > largestPaymentID) {
            largestPaymentID = paymentID;
        }
    }

    public Payment(PaymentMethodEnum paymentMethod, String cardNumber,
            String expiryDate, String cvv) {
        this.paymentID = largestPaymentID;
        this.paymentMethod = paymentMethod;
        this.cardNumber = cardNumber;
        this.expiryDate = expiryDate;
        this.cvv = cvv;

        largestPaymentID++;

        System.out.println("Payment details added successfully");
    }

    public static void setlargestPaymentID(int size) {
        largestPaymentID = size;
    }

    // get largest payment ID
    public static int getlargestPaymentID() {
        return largestPaymentID;
    }

    // get payment ID
    public int getPaymentID() {
        return paymentID;
    }

    // get payment method
    public PaymentMethodEnum getPaymentMethod() {
        return paymentMethod;
    }

    // get card number
    public String getCardNumber() {
        return cardNumber;
    }

    // get expiry date
    public String getExpiryDate() {
        return expiryDate;
    }
}