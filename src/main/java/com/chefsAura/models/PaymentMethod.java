package com.chefsAura.models;

public enum PaymentMethod {
    DEBIT_CARD("debit_card"),
    CREDIT_CARD("credit_card"),
    PAYPAL("paypal");

    private final String method;

    PaymentMethod(String method) {
        this.method = method;
    }

    public String getMethod() {
        return method;
    }

    public static PaymentMethod fromString(String method) {
        for (PaymentMethod pm : PaymentMethod.values()) {
            if (pm.method.equalsIgnoreCase(method)) {
                return pm;
            }
        }
        throw new IllegalArgumentException("Invalid payment method: " + method);
    }
}