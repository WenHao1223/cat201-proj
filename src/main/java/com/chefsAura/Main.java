package com.chefsAura;

import java.util.ArrayList;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;

import com.chefsAura.models.Inventory;
import com.chefsAura.models.Product;
import com.chefsAura.models.Cart;
import com.chefsAura.models.Payment;
import com.chefsAura.models.Order;
import com.chefsAura.models.User;
import com.chefsAura.models.UserCollection;

import com.chefsAura.enums.PaymentMethodEnum;
import com.chefsAura.enums.OrderStatusEnum;

import com.chefsAura.utils.ReadJson;

public class Main {
    public static void main(String[] args) {
        // initialize inventory
        Inventory inventory = new Inventory();
        loadInventory(inventory);

        // initialize user collection
        UserCollection userCollection = new UserCollection();
        loadUserCollection(userCollection);

        // test adding shipping address
        System.out.println("\nAdding shipping address...");
        // add shipping address to user
        userCollection.getAllUsers().get(0).addShippingAddress("123, ABC Street, XYZ City, 12345");
        for (String address : userCollection.getAllUsers().get(0).getShippingAddresses()) {
            System.out.println("Shipping address: " + address);
        }

        // test removing shipping address
        System.out.println("\nRemoving shipping address...");
        userCollection.getAllUsers().get(0).removeShippingAddress("123, ABC Street, XYZ City, 12345");
        for (String address : userCollection.getAllUsers().get(0).getShippingAddresses()) {
            System.out.println("Shipping address: " + address);
        }

        // test adding billing address
        System.out.println("\nAdding billing address...");
        userCollection.getAllUsers().get(0).addBillingAddress("123, ABC Street, XYZ City, 12345");
        for (String address : userCollection.getAllUsers().get(0).getBillingAddresses()) {
            System.out.println("Billing address: " + address);
        }

        // test removing billing address
        System.out.println("\nRemoving billing address...");
        userCollection.getAllUsers().get(0).removeBillingAddress("123, ABC Street, XYZ City, 12345");
        for (String address : userCollection.getAllUsers().get(0).getBillingAddresses()) {
            System.out.println("Billing address: " + address);
        }

        // test adding payment details
        System.out.println("\nAdding payment details...");
        userCollection.getAllUsers().get(0).addPaymentDetails(
                new Payment(
                        PaymentMethodEnum.DEBIT_CARD,
                        "1234567890123456",
                        "12/23",
                        "123"));
        // show the payment details of the user
        userCollection.getAllUsers().get(0).getPaymentDetails().forEach(
                payment -> {
                    System.out.println("Payment ID: " + payment.getPaymentID());
                    String paymentMethod = payment.getPaymentMethod().toString();
                    System.out.println("Payment Method: " + PaymentMethodEnum.fromString(paymentMethod));
                    System.out.println("Card Number: " + payment.getCardNumber());
                    if (PaymentMethodEnum.fromString(paymentMethod) == PaymentMethodEnum.DEBIT_CARD ||
                            PaymentMethodEnum.fromString(paymentMethod) == PaymentMethodEnum.CREDIT_CARD) {
                        System.out.println("Expiry Date: " + payment.getExpiryDate());
                    }
                });

        // test remove payment details
        System.out.println("\nRemoving payment details...");
        userCollection.getAllUsers().get(0).removePaymentDetails(13);
        // show the payment details of the user
        userCollection.getAllUsers().get(0).getPaymentDetails().forEach(
                payment -> {
                    System.out.println("Payment ID: " + payment.getPaymentID());
                    String paymentMethod = payment.getPaymentMethod().toString();
                    System.out.println("Payment Method: " + PaymentMethodEnum.fromString(paymentMethod));
                    System.out.println("Card Number: " + payment.getCardNumber());
                    if (PaymentMethodEnum.fromString(paymentMethod) == PaymentMethodEnum.DEBIT_CARD ||
                            PaymentMethodEnum.fromString(paymentMethod) == PaymentMethodEnum.CREDIT_CARD) {
                        System.out.println("Expiry Date: " + payment.getExpiryDate());
                    }
                });

        // test adding product to cart
        System.out.println("\nAdding product to cart...");
        userCollection.getAllUsers().get(0).addProductToCart(
                new Cart("K001", 1, 0, 1));

        // show the cart of the user
        for (Cart cart : userCollection.getAllUsers().get(0).getCarts()) {
            Product product = Inventory.getProduct(cart.getProductID());
            String color = product.getColors().get(cart.getColorIndex());
            String size = product.getSizes().get(cart.getSizeIndex());

            System.out.println(product.getBrand() + ", " + color + ", " + size + ", " + product.getName() + " - RM"
                    + product.getPrice() + " x" + cart.getQuantity());
        }
        // test removing product from cart
        System.out.println("\nRemoving product from cart...");
        userCollection.getAllUsers().get(0).removeProductFromCart("K001", 0, 0);
        // show the cart of the user
        for (Cart cart : userCollection.getAllUsers().get(0).getCarts()) {
            Product product = Inventory.getProduct(cart.getProductID());
            String color = product.getColors().get(cart.getColorIndex());
            String size = product.getSizes().get(cart.getSizeIndex());

            System.out.println(product.getBrand() + ", " + color + ", " + size + ", " + product.getName() + " - RM"
                    + product.getPrice() + " x" + cart.getQuantity());
        }

        // test updating product quantity in cart
        System.out.println("\nUpdating product quantity in cart...");
        // add product to cart
        userCollection.getAllUsers().get(0).addProductToCart(
                new Cart("B001", 1, 0, 0));
        // update product quantity in cart
        userCollection.getAllUsers().get(0).updateProductQuantityInCart("B001", 0, 0, 2);
        // show the cart of the user
        for (Cart cart : userCollection.getAllUsers().get(0).getCarts()) {
            Product product = Inventory.getProduct(cart.getProductID());
            String color = product.getColors().get(cart.getColorIndex());
            String size = product.getSizes().get(cart.getSizeIndex());

            System.out.println(product.getBrand() + ", " + color + ", " + size + ", " + product.getName() + " - RM"
                    + product.getPrice() + " x" + cart.getQuantity());
        }
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

    public static void loadUserCollection(UserCollection userCollection) {
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
                JSONArray productsArray = orderObject.getJSONArray("products");
                for (int k = 0; k < productsArray.length(); k++) {
                    JSONObject productObject = productsArray.getJSONObject(k);

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
                    userObject.getBoolean("agreeToTerms"),
                    shippingAddresses,
                    billingAddresses,
                    paymentDetailsList,
                    carts,
                    orders);
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
                        if (PaymentMethodEnum.fromString(paymentMethod) == PaymentMethodEnum.DEBIT_CARD ||
                                PaymentMethodEnum.fromString(paymentMethod) == PaymentMethodEnum.CREDIT_CARD) {
                            System.out.println("Expiry Date: " + payment.getExpiryDate());
                        }
                    });

            // get the carts
            for (Cart cart : newUser.getCarts()) {
                Product product = Inventory.getProduct(cart.getProductID());
                String size = product.getSizes().get(cart.getSizeIndex());
                String color = product.getColors().get(cart.getColorIndex());

                System.out.println(product.getBrand() + ", " + color + ", " + size + ", " + product.getName() + " - RM"
                        + product.getPrice() + " x" + cart.getQuantity());
            }

            System.out.println("");

            // get the orders
            for (Order order : newUser.getOrders()) {
                System.out.println("Order ID: " + order.getOrderID());
                System.out.println("Shipping Address: " + order.getShippingAddress());
                System.out.println("Billing Address: " + order.getBillingAddress());
                System.out.println("Payment ID: " + order.getPaymentID());
                System.out.println("Order Date: " + order.getOrderDate());
                System.out.println("Order Status: " + order.getOrderStatus());
                System.out.println("Products:");
                
                for (Cart cartProduct : order.getCartProducts()) {
                    Product product = Inventory.getProduct(cartProduct.getProductID());
                    String size = product.getSizes().get(cartProduct.getSizeIndex());
                    String color = product.getColors().get(cartProduct.getColorIndex());

                    System.out.println(product.getBrand() + ", " + color + ", " + size + ", " + product.getName() + " - RM"
                            + product.getPrice() + " x" + cartProduct.getQuantity());
                }
            }

            System.out.println("----------------");
        }

        // set the largest payment ID
        System.out.println("Largest Payment ID: " + Payment.getlargestPaymentID());
        Payment.setlargestPaymentID(Payment.getlargestPaymentID() + 1);

        // System.out.println("User collection loaded successfully");
    }
}