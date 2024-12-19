package com.chefsAura.enums;

public enum OrderStatusEnum {
    ORDERED("Ordered"),
    SHIPPED("Shipped"),
    DELIVERED("Delivered"),
    CANCELLED("Cancelled");

    private final String status;

    OrderStatusEnum(String status) {
            this.status = status;
        }

    public String getStatus() {
        return status;
    }

    public static OrderStatusEnum fromString(String status) {
        for (OrderStatusEnum os : OrderStatusEnum.values()) {
            if (os.status.equalsIgnoreCase(status)) {
                return os;
            }
        }
        throw new IllegalArgumentException("Invalid order status: " + status);
    }
}
