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
    public void setUsername(String newUsername) {
        this.username = newUsername;
        System.out.println("Username updated successfully");
    }

    // change password
    public boolean changePassword(String currentPassword, String newPassword) {
        if (this.password.equals(currentPassword)) {
            this.password = newPassword;
            System.out.println("Password updated successfully");
            return true;
        } else {
            System.err.println("Incorrect password");
            return false;
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

    // update gender
    public void setGender(short newGender) {
        this.gender = newGender;
        System.out.println("Gender updated successfully");
    }

    // update date of birth
    public void setDob(String newDob) {
        this.dob = newDob;
        System.out.println("Date of birth updated successfully");
    }

    // add shipping address
    public void addShippingAddress(String newShippingAddress) {
        for (String shippingAddress : this.shippingAddresses) {
            if (shippingAddress.equals(newShippingAddress)) {
                System.err.println("Shipping address already exists");
                throw new IllegalArgumentException("Shipping address already exists");
            }
        }
        this.shippingAddresses.add(newShippingAddress);
        System.out.println("Shipping address added successfully");
    }

    // update shipping address (by index)
    public void updateShippingAddress(int index, String newShippingAddress) {
        for (String shippingAddress : this.shippingAddresses) {
            if (shippingAddress.equals(newShippingAddress)) {
                System.err.println("Shipping address already exists");
                throw new IllegalArgumentException("Shipping address already exists");
            }
        }
        this.shippingAddresses.set(index, newShippingAddress);
        System.out.println("Shipping address updated successfully");
    }

    // remove shipping address
    public void removeShippingAddress(String oldShippingAddress) {
        this.shippingAddresses.remove(oldShippingAddress);
        System.out.println("Shipping address removed successfully");
    }

    // add billing address
    public void addBillingAddress(String newshippingAddress) {
        for (String billingAddress : this.billingAddresses) {
            if (billingAddress.equals(newshippingAddress)) {
                System.err.println("Billing address already exists");
                throw new IllegalArgumentException("Billing address already exists");
            }
        }
        this.billingAddresses.add(newshippingAddress);
        System.out.println("Billing address added successfully");
    }

    // update billing address (by index)
    public void updateBillingAddress(int index, String newBillingAddress) {
        for (String billingAddress : this.billingAddresses) {
            if (billingAddress.equals(newBillingAddress)) {
                System.err.println("Billing address already exists");
                throw new IllegalArgumentException("Billing address already exists");
            }
        }
        this.billingAddresses.set(index, newBillingAddress);
        System.out.println("Billing address updated successfully");
    }

    // remove billing address
    public void removeBillingAddress(String oldShippingAddress) {
        this.billingAddresses.remove(oldShippingAddress);
        System.out.println("Billing address removed successfully");
    }

    // add payment details
    public void addPaymentDetails(Payment newPaymentDetails) {
        for (Payment payment : this.paymentDetails) {
            if (payment.getPaymentMethod().equals(newPaymentDetails.getPaymentMethod()) &&
                    payment.getCardNumber().equals(newPaymentDetails.getCardNumber()) &&
                    payment.getExpiryDate().equals(newPaymentDetails.getExpiryDate())) {
                System.err.println("Payment details already exists");
                throw new IllegalArgumentException("Payment details already exists");
            }
        }
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
        throw new IllegalArgumentException("Payment details not found");
    }

    // add product to cart
    public void addProductToCart(Cart newCart) {
        // check if product is valid
        if (Inventory.getProduct(newCart.getProductID()) == null) {
            System.err.println("Product not found");
            throw new IllegalArgumentException("Product not found");
        }
        // check if quantity is available
        if (Inventory.getProduct(newCart.getProductID()).getQuantities().get(newCart.getSizeIndex())
                .get(newCart.getColorIndex()) == 0) {
            System.err.println("Quantity not available");
            throw new IllegalArgumentException("Quantity not available");
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
        throw new IllegalArgumentException("Product not found in cart");
    }

    // update product quantity in cart
    public void updateProductQuantityInCart(String productID, int sizeIndex, int colorIndex, int addedQuantity) {
        for (Cart cart : this.carts) {
            if (cart.getProductID().equals(productID) && cart.getSizeIndex() == sizeIndex
                    && cart.getColorIndex() == colorIndex) {
                if (Inventory.getProduct(cart.getProductID()).getQuantities().get(cart.getSizeIndex())
                        .get(cart.getColorIndex()) < cart.getQuantity() + addedQuantity) {
                    System.err.println("Quantity not available");
                    throw new IllegalArgumentException("Quantity not available");
                }
                if (cart.getQuantity() + addedQuantity < 0) {
                    cart.setQuantity(0);
                } else {
                    cart.setQuantity(cart.getQuantity() + addedQuantity);
                }
                System.out.println("Product quantity updated successfully");
                return;
            }
        }

        // return error
        System.err.println("Product not found in cart");
        throw new IllegalArgumentException("Product not found in cart");
    }

    // add order
    public int addOrder(String shippingAddress, String billingAddress, int paymentID) {
        // check if shipping address is valid
        if (!this.shippingAddresses.contains(shippingAddress)) {
            System.err.println("Shipping address not found");
            throw new IllegalArgumentException("Shipping address not found");
        }
        // check if billing address is valid
        if (!this.billingAddresses.contains(billingAddress)) {
            System.err.println("Billing address not found");
            throw new IllegalArgumentException("Billing address not found");
        }
        // check if payment details is valid
        if (this.paymentDetails.stream().noneMatch(payment -> payment.getPaymentID() == paymentID)) {
            System.err.println("Payment details not found");
            throw new IllegalArgumentException("Payment details not found");
        }
        // check if cart is empty
        if (this.carts.isEmpty()) {
            System.err.println("Cart is empty");
            throw new IllegalArgumentException("Cart is empty");
        }
        // check if product is valid
        for (Cart cart : this.carts) {
            if (Inventory.getProduct(cart.getProductID()) == null) {
                System.err.println("Product not found");
                throw new IllegalArgumentException("Product not found");
            }
            // check if quantity is available
            if (Inventory.getProduct(cart.getProductID()).getQuantities().get(cart.getSizeIndex())
                    .get(cart.getColorIndex()) < cart.getQuantity()) {
                System.err.println("Quantity not available");
                throw new IllegalArgumentException("Quantity not available");
            }
        }

        // deduct quantity from inventory
        for (Cart cart : this.carts) {
            Inventory.getProduct(cart.getProductID()).removeQuantity(cart.getSizeIndex(), cart.getColorIndex(),
                    cart.getQuantity());
        }
        
        Order newOrder = new Order(
                shippingAddress,
                billingAddress,
                paymentID,
                OrderStatusEnum.ORDERED,
                this.carts);
        this.orders.add(newOrder);
        this.carts.clear();
        System.out.println("Order added successfully");
        return newOrder.getOrderID();
    }

    // cancel order
    public void cancelOrder(int orderID) {
        for (Order order : this.orders) {
            if (order.getOrderID() == orderID) {
                if (order.getOrderStatus() == OrderStatusEnum.DELIVERED) {
                    System.err.println("Order already delivered");
                    throw  new IllegalArgumentException("Order already delivered");
                }
                order.setOrderStatus(OrderStatusEnum.CANCELLED);

                // add quantity back to inventory
                for (Cart cart : order.getCartProducts()) {
                    Inventory.getProduct(cart.getProductID()).addQuantity(cart.getSizeIndex(), cart.getColorIndex(),
                            cart.getQuantity());
                }

                System.out.println("Order cancelled successfully");
                return;
            }
        }
        // return error
        System.err.println("Order not found");
        throw new IllegalArgumentException("Order not found");
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

    // get order by ID
    public Order getOrderByID(int orderID) {
        for (Order order : this.orders) {
            if (order.getOrderID() == orderID) {
                return order;
            }
        }
        throw new IllegalArgumentException("Order not found");
    }
}
