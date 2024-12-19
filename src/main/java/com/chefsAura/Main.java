package com.chefsAura;

import java.util.ArrayList;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;

import com.chefsAura.models.Inventory;
import com.chefsAura.models.Product;
import com.chefsAura.models.User;
import com.chefsAura.models.UserCollection;
import com.chefsAura.models.Payment;
import com.chefsAura.enums.PaymentMethodEnum;

import com.chefsAura.utils.ReadJson;

public class Main {
    public static void main(String[] args) {
        // initialize user collection
        UserCollection userCollection = new UserCollection();
        loadUserCollection(userCollection);

        // initialize inventory
        Inventory inventory = new Inventory();
        loadInventory(inventory);
    }

    public static void loadUserCollection(UserCollection userCollection) {
        // read user data from file
        int largestPaymentID = 0;
        JSONArray userJSONData = new ReadJson().readJson("user");
        for (int i = 0; i < userJSONData.length(); i++) {
            JSONObject userObject = userJSONData.getJSONObject(i);

            // shipping addresses
            List<String> shippingAddresses = new ArrayList<>();
            JSONArray shippingAddressesArray = userObject.getJSONArray("shippingAddresses");
            for (int j = 0; j < shippingAddressesArray.length(); j++) {
                shippingAddresses.add(shippingAddressesArray.getString(j));
            }

            // billing addresses
            List<String> billingAddresses = new ArrayList<>();
            JSONArray billingAddressesesArray = userObject.getJSONArray("billingAddresses");
            for (int j = 0; j < billingAddressesesArray.length(); j++) {
                billingAddresses.add(billingAddressesesArray.getString(j));
            }

            List<Payment> paymentDetailsList = new ArrayList<>();

            // payment details
            JSONArray paymentDetails = userObject.getJSONArray("paymentDetails");
            for (int j = 0; j < paymentDetails.length(); j++) {
                JSONObject paymentObject = paymentDetails.getJSONObject(j);

                Payment newPayment = new Payment(
                        paymentObject.getInt("paymentID"),
                        PaymentMethodEnum.fromString(paymentObject.getString("paymentMethod")),
                        paymentObject.getString("cardNumber"),
                        paymentObject.getString("expiryDate"),
                        paymentObject.getString("cvv"));
                paymentDetailsList.add(newPayment);
            }

            User newUser = new User(
                    userObject.getString("username"),
                    userObject.getString("email"),
                    userObject.getString("password"),
                    userObject.getString("nationality"),
                    userObject.getString("firstName"),
                    userObject.getString("lastName"),
                    userObject.getString("phoneNo"),
                    (short) userObject.getInt("gender"),
                    userObject.getString("dob"),
                    userObject.getBoolean("agreeToTerms"),
                    shippingAddresses,
                    billingAddresses,
                    paymentDetailsList);
            userCollection.addUser(newUser);

            // System.out.println("User " + newUser.getFirstName() + " added successfully");
            // System.out.println("----------------");

            // print the shipping address of the new user
            for (String address : newUser.getShippingAddresses()) {
                System.out.println("Shipping address: " + address);
            }

            // print the billing address of the new user
            for (String address : newUser.getBillingAddresses()) {
                System.out.println("Billing address: " + address);
            }

            // get the payment details
            newUser.getPaymentDetails().forEach(
                payment -> {
                    System.out.println("Payment ID: " + payment.getPaymentID());
                    String paymentMethod = payment.getPaymentMethod().toString();
                    System.out.println("Payment Method: " + PaymentMethodEnum.fromString(paymentMethod));
                    System.out.println("Card Number: " + payment.getCardNumber());
                    if (paymentMethod.equals("debit_card") || paymentMethod.equals("credit_card")) {
                        System.out.println("Expiry Date: " + payment.getExpiryDate());
                    }
                }
            );

            System.out.println("----------------");
        }

        System.out.println("Largest Payment ID: " + Payment.getlargestPaymentID());
        
        // Set the largestPaymentID to the largest paymentID
        Payment.setlargestPaymentID(largestPaymentID + 1);

        // System.out.println("User collection loaded successfully");
    }

    public static void loadInventory(Inventory inventory) {
        // read inventory data from file
        JSONArray inventoryJSONData = new ReadJson().readJson("product");
        for (int i = 0; i < inventoryJSONData.length(); i++) {
            JSONObject productObject = inventoryJSONData.getJSONObject(i);

            List<String> sizes = new ArrayList<>();
            JSONArray sizeArray = productObject.getJSONArray("sizes");
            for (int j = 0; j < sizeArray.length(); j++) {
                sizes.add(sizeArray.getString(j));
            }

            List<String> colors = new ArrayList<>();
            JSONArray colorArray = productObject.getJSONArray("colors");
            for (int j = 0; j < colorArray.length(); j++) {
                colors.add(colorArray.getString(j));
            }

            List<List<Integer>> quantities = new ArrayList<>();
            JSONArray quantityArray = productObject.getJSONArray("quantities");
            for (int j = 0; j < quantityArray.length(); j++) {
                List<Integer> innerList = new ArrayList<>();
                JSONArray innerArray = quantityArray.getJSONArray(j);
                for (int k = 0; k < innerArray.length(); k++) {
                    innerList.add(innerArray.getInt(k));
                }
                quantities.add(innerList);
            }

            Product newProduct = new Product(
                    productObject.getString("productID"),
                    productObject.getString("name"),
                    productObject.getString("description"),
                    productObject.getDouble("price"),
                    productObject.getString("category"),
                    productObject.getString("brand"),
                    sizes,
                    colors,
                    quantities);
            inventory.addProduct(newProduct);
        }

        // System.out.println("Inventory loaded successfully");
    }
}