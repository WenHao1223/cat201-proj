package com.chefsAura;

import java.util.ArrayList;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;

import com.chefsAura.enums.OrderStatusEnum;
import com.chefsAura.enums.PaymentMethodEnum;
import com.chefsAura.models.Cart;
import com.chefsAura.models.Inventory;
import com.chefsAura.models.Order;
import com.chefsAura.models.Payment;
import com.chefsAura.models.Product;
import com.chefsAura.models.User;
import com.chefsAura.models.UserCollection;
import com.chefsAura.utils.ReadJson;

public class Main {
    public static void main(String[] args) {
        // initialize inventory
        loadInventory();

        // initialize user collection
        loadUserCollection();
    }
    
    public static void loadInventory() {
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
            Inventory.addProduct(newProduct);
        }

        // System.out.println("Inventory loaded successfully");
    }

    public static void loadUserCollection() {
        // read user data from file
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

            // payment details
            List<Payment> paymentDetailsList = new ArrayList<>();

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

            // carts
            List<Cart> carts = new ArrayList<>();

            JSONArray cartsArray = userObject.getJSONArray("carts");
            for (int j = 0; j < cartsArray.length(); j++) {
                JSONObject cartObject = cartsArray.getJSONObject(j);

                Cart newCart = new Cart(
                        cartObject.getString("productID"),
                        cartObject.getInt("quantity"),
                        cartObject.getInt("sizeIndex"),
                        cartObject.getInt("colorIndex"));
                carts.add(newCart);
            }

            // orders
            List<Order> orders = new ArrayList<>();

            JSONArray ordersArray = userObject.getJSONArray("orders");
            for (int j = 0; j < ordersArray.length(); j++) {
                JSONObject orderObject = ordersArray.getJSONObject(j);

                List<Cart> cartProducts = new ArrayList<>();
                JSONArray cartProductsArray = orderObject.getJSONArray("cartProducts");
                for (int k = 0; k < cartProductsArray.length(); k++) {
                    JSONObject productObject = cartProductsArray.getJSONObject(k);

                    Cart cartProduct = new Cart(
                            productObject.getString("productID"),
                            productObject.getInt("quantity"),
                            productObject.getInt("sizeIndex"),
                            productObject.getInt("colorIndex"));
                    cartProducts.add(cartProduct);
                }

                Order newOrder = new Order(
                        orderObject.getInt("orderID"),
                        orderObject.getString("shippingAddress"),
                        orderObject.getString("billingAddress"),
                        orderObject.getInt("paymentID"),
                        orderObject.getString("orderDate"),
                        OrderStatusEnum.fromString(orderObject.getString("orderStatus")),
                        cartProducts);
                orders.add(newOrder);
            }

            // user
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
                    userObject.getString("role"),
                    userObject.getBoolean("agreeToTerms"),
                    shippingAddresses,
                    billingAddresses,
                    paymentDetailsList,
                    carts,
                    orders);
            UserCollection.addUser(newUser);
        }

        // set the largest payment ID
        Payment.setlargestPaymentID(Payment.getlargestPaymentID() + 1);

        // set the largest order ID
        Order.setlargestOrderID(Order.getlargestOrderID() + 1);

        // System.out.println("User collection loaded successfully");
    }
}