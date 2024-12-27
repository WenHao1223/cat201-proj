package com.chefsAura.models;

import java.util.ArrayList;
import java.util.List;
import com.chefsAura.enums.OrderStatusEnum; // Add this import statement

public class User {
    String username;
    String email;
    String password;
    String nationality;
    String firstName;
    String lastName;
    String phoneNo;
    short gender;
    String dob;
    Boolean agreeToTerms;

    List<String> shippingAddresses;
    List<String> billingAddresses;

    List<Payment> paymentDetails;
    List<Cart> carts;
    List<Order> orders;

    // empty constructor
    public User() {
        username = "";
        email = "";
        password = "";
        nationality = "";
        firstName = "";
        lastName = "";
        phoneNo = "";
        gender = 0;
        dob = "";
        agreeToTerms = false;
        shippingAddresses = new ArrayList<>();
        billingAddresses = new ArrayList<>();
        paymentDetails = new ArrayList<>();
        carts = new ArrayList<>();
        orders = new ArrayList<>();
    }

    // used during registration
    public User(String username, String email, String password,
            String nationality, String firstName, String lastName,
            String phoneNo, short gender, String dob, Boolean agreeToTerms) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.nationality = nationality;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNo = phoneNo;
        this.gender = gender;
        this.dob = dob;
        this.agreeToTerms = agreeToTerms;
        shippingAddresses = new ArrayList<>();
        billingAddresses = new ArrayList<>();
        paymentDetails = new ArrayList<>();
        carts = new ArrayList<>();
        orders = new ArrayList<>();
    }

    // used during first-time loading of users
    public User(String username, String email, String password,
            String nationality, String firstName, String lastName,
            String phoneNo, short gender, String dob, Boolean agreeToTerms,
            List<String> shippingAddresses, List<String> billingAddresses,
            List<Payment> paymentDetails,
            List<Cart> carts,
            List<Order> orders) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.nationality = nationality;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNo = phoneNo;
        this.gender = gender;
        this.dob = dob;
        this.agreeToTerms = agreeToTerms;
        this.shippingAddresses = shippingAddresses;
        this.billingAddresses = billingAddresses;
        this.paymentDetails = paymentDetails;
        this.carts = carts;
        this.orders = orders;
    }

    // update email
    public void setEmail(String newEmail) {
        this.email = newEmail;
        System.out.println("Email updated successfully");
    }

    // update password
    public void setPassword(String oldPassword, String newPassword) {
        if (this.password == oldPassword) {
            this.password = newPassword;
            System.out.println("Password updated successfully");
        } else {
            // return error
            System.err.println("Incorrect password");
        }
    }

    // update nationality
    public void setNationality(String newNationality) {
        this.nationality = newNationality;
        System.out.println("Nationality updated successfully");
    }

    // update first name
    public void setFirstName(String newFirstName) {
        this.firstName = newFirstName;
        System.out.println("First name updated successfully");
    }

    // update last name
    public void setLastName(String newLastName) {
        this.lastName = newLastName;
        System.out.println("Last name updated successfully");
    }

    // update phone number
    public void setPhoneNo(String newPhoneNo) {
        this.phoneNo = newPhoneNo;
        System.out.println("Phone number updated successfully");
    }

    // add shipping address
    public void addShippingAddress(String newShippingAddress) {
        this.shippingAddresses.add(newShippingAddress);
        System.out.println("Shipping address added successfully");
    }

    // remove shipping address
    public void removeShippingAddress(String oldShippingAddress) {
        this.shippingAddresses.remove(oldShippingAddress);
        System.out.println("Shipping address removed successfully");
    }

    // add billing address
    public void addBillingAddress(String newshippingAddress) {
        this.billingAddresses.add(newshippingAddress);
        System.out.println("Billing address added successfully");
    }

    // remove billing address
    public void removeBillingAddress(String oldShippingAddress) {
        this.billingAddresses.remove(oldShippingAddress);
        System.out.println("Billing address removed successfully");
    }

    // add payment details
    public void addPaymentDetails(Payment newPaymentDetails) {
        this.paymentDetails.add(newPaymentDetails);
    }

    // remove payment details
    public void removePaymentDetails(int paymentID) {
        for (Payment payment : this.paymentDetails) {
            if (payment.getPaymentID() == paymentID) {
                this.paymentDetails.remove(payment);
                System.out.println("Payment details removed successfully");
                return;
            }
        }
        // return error
        System.err.println("Payment details not found");
    }

    // add product to cart
    public void addProductToCart(Cart newCart) {
        // check if product is valid
        if (Inventory.getProduct(newCart.getProductID()) == null) {
            System.err.println("Product not found");
            return;
        }
        // check if quantity is available
        if (Inventory.getProduct(newCart.getProductID()).getQuantities().get(newCart.getSizeIndex())
                .get(newCart.getColorIndex()) == 0) {
            System.err.println("Quantity not available");
            return;
        }
        this.carts.add(newCart);
        System.out.println("Product added to cart successfully");
    }

    // remove product from cart
    public void removeProductFromCart(String productID, int sizeIndex, int colorIndex) {
        for (Cart cart : this.carts) {
            if (cart.getProductID().equals(productID) && cart.getSizeIndex() == sizeIndex
                    && cart.getColorIndex() == colorIndex) {
                this.carts.remove(cart);
                System.out.println("Product removed from cart successfully");
                return;
            }
        }
        // return error
        System.err.println("Product not found in cart");
    }

    // update product quantity in cart
    public void updateProductQuantityInCart(String productID, int sizeIndex, int colorIndex, int newQuantity) {
        for (Cart cart : this.carts) {
            if (cart.getProductID().equals(productID) && cart.getSizeIndex() == sizeIndex
                    && cart.getColorIndex() == colorIndex) {
                cart.setQuantity(newQuantity);
                System.out.println("Product quantity updated successfully");
                return;
            }
        }
        // return error
        System.err.println("Product not found in cart");
    }

    // add order
    public void addOrder(String shippingAddress, String billingAddress, int paymentID) {
        Order newOrder = new Order(
                shippingAddress,
                billingAddress,
                paymentID,
                OrderStatusEnum.ORDERED,
                this.carts);
        this.orders.add(newOrder);
        System.out.println("Order added successfully");
    }

    // cancel order
    public void cancelOrder(int orderID) {
        for (Order order : this.orders) {
            if (order.getOrderID() == orderID) {
                if (order.getOrderStatus() == OrderStatusEnum.DELIVERED) {
                    System.err.println("Order already delivered");
                    return;
                }
                order.setOrderStatus(OrderStatusEnum.CANCELLED);
                System.out.println("Order cancelled successfully");
                return;
            }
        }
        // return error
        System.err.println("Order not found");
    }

    // validate password
    public boolean validatePassword(String password) {
        return this.password.equals(password);
    }

    // get username
    public String getUsername() {
        return this.username;
    }

    // get email
    public String getEmail() {
        return this.email;
    }

    // get nationality
    public String getNationality() {
        return this.nationality;
    }

    // get first name

    public String getFirstName() {
        return this.firstName;
    }

    // get last name
    public String getLastName() {
        return this.lastName;
    }

    // get phone number
    public String getPhoneNo() {
        return this.phoneNo;
    }

    // get gender
    public short getGender() {
        return this.gender;
    }

    // get date of birth
    public String getDob() {
        return this.dob;
    }

    // get shipping addresses
    public List<String> getShippingAddresses() {
        return this.shippingAddresses;
    }

    // get billing addresses
    public List<String> getBillingAddresses() {
        return this.billingAddresses;
    }

    // get payment details
    public List<Payment> getPaymentDetails() {
        return this.paymentDetails;
    }

    // get carts
    public List<Cart> getCarts() {
        return this.carts;
    }

    // get orders
    public List<Order> getOrders() {
        return this.orders;
    }
}
