package com.chefsAura.enums;

public enum PaymentMethodEnum {
    DEBIT_CARD("debit_card"),
    CREDIT_CARD("credit_card"),
    PAYPAL("paypal"),
    VISA("visa");

    private final String method;

    PaymentMethodEnum(String method) {
        this.method = method;
    }

    public String getMethod() {
        return method;
    }

    public static PaymentMethodEnum fromString(String method) {
        for (PaymentMethodEnum pm : PaymentMethodEnum.values()) {
            if (pm.method.equalsIgnoreCase(method)) {
                return pm;
            }
        }
        throw new IllegalArgumentException("Invalid payment method: " + method);
    }
}