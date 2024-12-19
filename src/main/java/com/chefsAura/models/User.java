package com.chefsAura.models;

import java.util.List;

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
    List<Cart> cart;
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
        shippingAddresses = null;
        billingAddresses = null;
        paymentDetails = null;
        cart = null;
        orders = null;
    }

    // used during first-time loading of users / registrati on
    public User(String username, String email, String password,
            String nationality, String firstName, String lastName,
            String phoneNo, short gender, String dob, Boolean agreeToTerms,
            List<String> shippingAddresses, List<String> billingAddresses,
            List<Payment> paymentDetails
            // List<Cart> cart, List<Order> orders
            ) {
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
        // this.cart = cart;
        // this.orders = orders;
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
        System.out.println("Payment details added successfully");
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
}
