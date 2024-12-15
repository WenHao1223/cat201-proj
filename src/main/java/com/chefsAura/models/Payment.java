package com.chefsAura.models;

import com.chefsAura.enums.PaymentMethodEnum;

public class Payment {
    int paymentID;
    PaymentMethodEnum paymentMethod;
    String cardNumber;
    String expiryDate;
    String cvv;

    static int paymentSize = 0;

    public Payment() {
        paymentID = 0;
        paymentMethod = null;
        cardNumber = "";
        expiryDate = "";
        cvv = "";
    }

    public Payment(String paymentMethod, String cardNumber, String expiryDate, String cvv) {
        this.paymentID = paymentSize;
        this.paymentMethod = PaymentMethodEnum.fromString(paymentMethod);
        this.cardNumber = cardNumber;
        this.expiryDate = expiryDate;
        this.cvv = cvv;

        paymentSize++;

        System.out.println("Payment details added successfully");
    }
    
    public static void setPaymentSize(int size) {
        paymentSize = size;
    }

    // get payment ID
    public int getPaymentID() {
        return paymentID;
    }
}