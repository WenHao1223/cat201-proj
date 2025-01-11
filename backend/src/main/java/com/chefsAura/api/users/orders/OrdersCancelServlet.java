package com.chefsAura.api.users.orders;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.chefsAura.models.Cart;
import com.chefsAura.models.Inventory;
import com.chefsAura.models.Order;
import com.chefsAura.models.Payment;
import com.chefsAura.models.Product;
import com.chefsAura.models.User;
import com.chefsAura.models.UserCollection;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

@WebServlet("/api/users/orders/cancel")
public class OrdersCancelServlet extends HttpServlet {
    @Override
    public void init() throws ServletException {
        super.init();
        System.out.println("OrdersCancelServlet initialized.");
    }

    @Override
    public void doDelete(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Methods", "DELETE, OPTIONS");

        // Read request body
        StringBuilder sb = new StringBuilder();
        try (BufferedReader reader = request.getReader()) {
            String line;
            while ((line = reader.readLine()) != null) {
                sb.append(line);
            }
        }

        // Parse JSON request body
        Gson gson = new Gson();
        JsonObject jsonObject = gson.fromJson(sb.toString(), JsonObject.class);
        String email = jsonObject.get("email").getAsString();
        int orderID = jsonObject.get("orderID").getAsInt();
        System.out.println("OrdersCancelServlet DELETE request received with parameters: email = " + email
                + ", orderID = " + orderID);

        JsonObject jsonResponse = new JsonObject();

        if (!email.isEmpty()) {
            User user = UserCollection.getUserByEmail(email);
            if (user != null) {
                try {
                    if (user.getRole() != "user") {
                        throw new IllegalArgumentException("User is not a customer");
                    }
                    
                    List<Order> orders = user.getOrders();
                    boolean orderFound = false;

                    for (Order order : orders) {
                        if (order.getOrderID() == orderID) {
                            orderFound = true;

                            // Get the cancelled order details
                            JsonObject cancelledOrderJson = new JsonObject();
                            cancelledOrderJson.addProperty("orderID", order.getOrderID());
                            cancelledOrderJson.addProperty("orderDate", order.getOrderDate());
                            cancelledOrderJson.addProperty("shippingAddress", order.getShippingAddress());
                            cancelledOrderJson.addProperty("billingAddress", order.getBillingAddress());

                            // get payment details
                            try {
                                JsonObject paymentJson = new JsonObject();
                                Payment payment = user.getPaymentDetails().get(order.getPaymentID());
                                paymentJson.addProperty("paymentID", payment.getPaymentID());
                                paymentJson.addProperty("paymentMethod", payment.getPaymentMethod().getMethod());
                                paymentJson.addProperty("cardNumber", payment.getLastFourDigits());
                                cancelledOrderJson.add("payment", paymentJson);
                            } catch (IndexOutOfBoundsException e) {
                                System.out.println("Payment index out of bounds");
                                throw new IllegalArgumentException("Payment index out of bounds");
                            } catch (NullPointerException e) {
                                System.out.println("Payment is null");
                                throw new IllegalArgumentException("Payment is null");
                            } catch (Exception e) {
                                System.out.println("Exception occurred: " + e);
                                throw new IllegalArgumentException(e);
                            }

                            cancelledOrderJson.addProperty("orderDate", order.getOrderDate());
                            cancelledOrderJson.addProperty("orderStatus", order.getOrderStatus().toString());
                            cancelledOrderJson.addProperty("orderTotal", order.getOrderTotal());

                            // get products in cancelled order
                            try {
                                List<Cart> carts = order.getCartProducts();
                                JsonArray jsonCart = new JsonArray();

                                for (Cart cart : carts) {
                                    JsonObject cartJson = new JsonObject();
                                    Product product = Inventory.getProduct(cart.getProductID());

                                    if (product != null) {
                                        cartJson.addProperty("productID", cart.getProductID());
                                        cartJson.addProperty("name", product.getName());
                                        cartJson.addProperty("price", product.getPrice());
                                        cartJson.addProperty("category", product.getCategory());
                                        cartJson.addProperty("brand", product.getBrand());
                                        cartJson.addProperty("quantity", cart.getQuantity());
                                        cartJson.addProperty("sizeIndex", cart.getSizeIndex());
                                        cartJson.addProperty("colorIndex", cart.getColorIndex());

                                        try {
                                            cartJson.addProperty("size", product.getSizes().get(cart.getSizeIndex()));
                                            cartJson.addProperty("color",
                                                    product.getColors().get(cart.getColorIndex()));
                                        } catch (IndexOutOfBoundsException e) {
                                            System.out.println("Size or color index out of bounds");
                                            throw new IllegalArgumentException("Size or color index out of bounds");
                                        }

                                        jsonCart.add(cartJson);
                                    } else {
                                        System.out.println("Product not found in inventory");
                                        throw new IllegalArgumentException("Product not found in inventory");
                                    }

                                    cancelledOrderJson.add("cartProducts", jsonCart);
                                }
                            } catch (IndexOutOfBoundsException e) {
                                System.out.println("Cart index out of bounds");
                                throw new IllegalArgumentException("Cart index out of bounds");
                            } catch (NullPointerException e) {
                                System.out.println("Cart is null");
                                throw new IllegalArgumentException("Cart is null");
                            } catch (Exception e) {
                                System.out.println("Exception occurred: " + e);
                                throw new IllegalArgumentException("Exception occurred: " + e);
                            }

                            jsonResponse.add("cancelledOrder", cancelledOrderJson);

                            user.cancelOrder(orderID);

                            // get all order details
                            // get all order details
                            JsonArray jsonOrder = new JsonArray();

                            for (Order orderItem : orders) {
                                JsonObject orderJson = new JsonObject();
                                orderJson.addProperty("orderID", orderItem.getOrderID());
                                orderJson.addProperty("orderDate", orderItem.getOrderDate());
                                orderJson.addProperty("shippingAddress", orderItem.getShippingAddress());
                                orderJson.addProperty("billingAddress", orderItem.getBillingAddress());

                                // get payment details
                                try {
                                    JsonObject paymentJson = new JsonObject();
                                    Payment payment = user.getPaymentDetails().get(orderItem.getPaymentID());
                                    paymentJson.addProperty("paymentID", payment.getPaymentID());
                                    paymentJson.addProperty("paymentMethod", payment.getPaymentMethod().getMethod());
                                    paymentJson.addProperty("cardNumber", payment.getLastFourDigits());
                                    orderJson.add("payment", paymentJson);
                                } catch (IndexOutOfBoundsException e) {
                                    System.out.println("Payment index out of bounds");
                                    throw new IllegalArgumentException("Payment index out of bounds");
                                } catch (NullPointerException e) {
                                    System.out.println("Payment is null");
                                    throw new IllegalArgumentException("Payment is null");
                                } catch (Exception e) {
                                    System.out.println("Exception occurred: " + e);
                                    throw new IllegalArgumentException("Exception occurred: " + e);
                                }

                                orderJson.addProperty("orderDate", orderItem.getOrderDate());
                                orderJson.addProperty("orderStatus", orderItem.getOrderStatus().getStatus());
                                orderJson.addProperty("orderTotal", orderItem.getOrderTotal());

                                // get products in order
                                try {
                                    List<Cart> carts = orderItem.getCartProducts();
                                    JsonArray jsonCart = new JsonArray();

                                    for (Cart cart : carts) {
                                        JsonObject cartJson = new JsonObject();
                                        Product product = Inventory.getProduct(cart.getProductID());

                                        if (product != null) {
                                            cartJson.addProperty("productID", cart.getProductID());
                                            cartJson.addProperty("name", product.getName());
                                            cartJson.addProperty("price", product.getPrice());
                                            cartJson.addProperty("category", product.getCategory());
                                            cartJson.addProperty("brand", product.getBrand());
                                            cartJson.addProperty("quantity", cart.getQuantity());

                                            try {
                                                cartJson.addProperty("size",
                                                        product.getSizes().get(cart.getSizeIndex()));
                                                cartJson.addProperty("color",
                                                        product.getColors().get(cart.getColorIndex()));
                                            } catch (IndexOutOfBoundsException e) {
                                                System.out.println("Size or color index out of bounds");
                                                throw new IllegalArgumentException("Size or color index out of bounds");
                                            }

                                            jsonCart.add(cartJson);
                                        } else {
                                            System.out.println("Product not found in inventory");
                                            throw new IllegalArgumentException("Product not found in inventory");
                                        }

                                        orderJson.add("cartProducts", jsonCart);
                                    }
                                } catch (IndexOutOfBoundsException e) {
                                    System.out.println("Cart index out of bounds");
                                    throw new IllegalArgumentException("Cart index out of bounds");
                                } catch (NullPointerException e) {
                                    System.out.println("Cart is null");
                                    throw new IllegalArgumentException("Cart is null");
                                } catch (Exception e) {
                                    System.out.println("Exception occurred: " + e);
                                    throw new IllegalArgumentException("Exception occurred: " + e);
                                }

                                jsonOrder.add(orderJson.toString());
                            }

                            // Create JSON response
                            jsonResponse.addProperty("status", "Success");
                            jsonResponse.add("orders", jsonOrder);

                            break;
                        }
                    }

                    if (!orderFound) {
                        jsonResponse.addProperty("status", "Error");
                        jsonResponse.addProperty("message", "Order not found.");
                    }

                } catch (IllegalArgumentException e) {
                    jsonResponse.addProperty("status", "Error");
                    jsonResponse.addProperty("message", e.getMessage());
                } catch (Exception e) {
                    jsonResponse.addProperty("status", "Error");
                    jsonResponse.addProperty("message", "Exception occurred: " + e);
                }
            } else {
                jsonResponse.addProperty("status", "Error");
                jsonResponse.addProperty("message", "User not found.");
            }
        } else {
            jsonResponse.addProperty("status", "Error");
            jsonResponse.addProperty("message", "No user is logged in");
        }

        // Write the response
        PrintWriter out = response.getWriter();
        out.write(jsonResponse.toString());
        out.flush();
    }
}
