package com.chefsAura.api.users.orders;

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
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

// @WebServlet("/api/users/orders/*")
public class SpecificOrderServlet extends HttpServlet {
    @Override
    public void init() throws ServletException {
        super.init();
        System.out.println("SpecificOrderServlet initialized.");
    }

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // Parse JSON request body
        String email = request.getParameter("email");
        System.out.println("SpecificOrderServlet GET request received with parameters: email = "
                + request.getPathInfo().substring(1) + email);
        String orderID = request.getPathInfo().substring(1);

        JsonObject jsonResponse = new JsonObject();

        if (!email.isEmpty()) {
            User user = UserCollection.getUserByEmail(email);
            if (user != null) {
                try {
                    if (!user.getRole().equals("user")) {
                        throw new IllegalArgumentException("User is not a customer");
                    }
                } catch (IllegalArgumentException e) {
                    jsonResponse.addProperty("status", "Error");
                    jsonResponse.addProperty("message", e.getMessage());
                    PrintWriter out = response.getWriter();
                    out.write(jsonResponse.toString());
                    out.flush();
                    return;
                }
                
                Order order = user.getOrderByID(Integer.parseInt(orderID));
                JsonArray jsonOrder = new JsonArray();

                JsonObject orderJson = new JsonObject();
                orderJson.addProperty("orderID", order.getOrderID());
                orderJson.addProperty("orderDate", order.getOrderDate());
                orderJson.addProperty("shippingAddress", order.getShippingAddress());
                orderJson.addProperty("billingAddress", order.getBillingAddress());

                // get payment details
                try {
                    JsonObject paymentJson = new JsonObject();
                    Payment payment = user.getPaymentDetailsByID(order.getPaymentID());
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

                orderJson.addProperty("orderStatus", order.getOrderStatus().getStatus());
                orderJson.addProperty("orderTotal", order.getOrderTotal());

                // get products in order
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
                                cartJson.addProperty("color", product.getColors().get(cart.getColorIndex()));
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

                // Create JSON response
                jsonResponse.addProperty("status", "Success");
                jsonResponse.add("order", jsonOrder);
            } else {
                jsonResponse.addProperty("status", "Error");
                jsonResponse.addProperty("message", "User not found");
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
