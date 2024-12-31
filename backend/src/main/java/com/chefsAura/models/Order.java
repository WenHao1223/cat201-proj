package com.chefsAura.models;

import java.util.List;

import com.chefsAura.enums.OrderStatusEnum;

public class Order {
    int orderID;
    String shippingAddress;
    String billingAddress;
    int paymentID;
    String orderDate;
    OrderStatusEnum orderStatus;
    List<Cart> cartProducts;

    static int largestOrderID = 0;

    public Order() {
        orderID = 0;
        shippingAddress = "";
        billingAddress = "";
        paymentID = 0;
        orderDate = "";
        orderStatus = null;
        cartProducts = null;
    }

    public Order(int orderID, String shippingAddress, String billingAddress, int paymentID, String orderDate,
            OrderStatusEnum orderStatus, List<Cart> cartProducts) {
        this.orderID = orderID;
        this.shippingAddress = shippingAddress;
        this.billingAddress = billingAddress;
        this.paymentID = paymentID;
        this.orderDate = orderDate;
        this.orderStatus = orderStatus;
        this.cartProducts = cartProducts;

        if (orderID > largestOrderID) {
            largestOrderID = orderID;
        }
    }

    public Order(String shippingAddress, String billingAddress, int paymentID,
            OrderStatusEnum orderStatus,
            List<Cart> cartProducts) {
        this.orderID = largestOrderID;
        this.shippingAddress = shippingAddress;
        this.billingAddress = billingAddress;
        this.paymentID = paymentID;
        this.orderDate = java.time.LocalDate.now().toString();
        this.orderStatus = orderStatus;
        this.cartProducts = cartProducts;

        largestOrderID++;

        System.out.println("Order details added successfully");
    }

    public static void setlargestOrderID(int size) {
        largestOrderID = size;
    }

    // set order status
    public void setOrderStatus(OrderStatusEnum orderStatus) {
        this.orderStatus = orderStatus;
    }

    // get largest order ID
    public static int getlargestOrderID() {
        return largestOrderID;
    }

    // get order ID
    public int getOrderID() {
        return orderID;
    }

    // get shipping address
    public String getShippingAddress() {
        return shippingAddress;
    }

    // get billing address
    public String getBillingAddress() {
        return billingAddress;
    }

    // get payment ID
    public int getPaymentID() {
        return paymentID;
    }

    // get order date
    public String getOrderDate() {
        return orderDate;
    }

    // get order status
    public OrderStatusEnum getOrderStatus() {
        return orderStatus;
    }

    // get products
    public List<Cart> getCartProducts() {
        return cartProducts;
    }

    // get order total
    public double getOrderTotal() {
        double total = 0;
        for (Cart cart : cartProducts) {
            total += Inventory.getProduct(cart.getProductID()).getPrice() * cart.getQuantity();
        }
        return total;
    }
}
