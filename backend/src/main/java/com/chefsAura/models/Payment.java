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

    // get last 4 digits of card number
    public String getLastFourDigits() {
        StringBuilder masked = new StringBuilder();
        int length = cardNumber.length();
        if (this.paymentMethod == PaymentMethodEnum.PAYPAL) {
            return cardNumber.substring(0, 2) + "x".repeat(length - 8) + cardNumber.substring(length - 6);
        } else {
            for (int i = 0; i < length - 4; i++) {
                if (i > 0 && i % 4 == 0) {
                    masked.append(" ");
                }
                masked.append("x");
            }
            String lastFourDigits = cardNumber.substring(length - 4);
            return masked.append(" ").append(lastFourDigits).toString();
        }
    }

    // get expiry date
    public String getExpiryDate() {
        return expiryDate;
    }
}