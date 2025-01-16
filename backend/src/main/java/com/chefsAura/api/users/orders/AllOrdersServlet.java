package com.chefsAura.api.users.orders;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.chefsAura.models.Order;
import com.chefsAura.models.UserCollection;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

@WebServlet("/api/users/allOrders")
public class AllOrdersServlet extends HttpServlet {
    @Override
    public void init() throws ServletException {
        super.init();
        System.out.println("AllOrdersServlet initialized.");
    }

    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        JsonObject jsonResponse = new JsonObject();
                
        List<Order> orders = UserCollection.getAllOrders();
        JsonArray jsonOrder = new JsonArray();

        for (Order order : orders) {
            JsonObject orderJson = new JsonObject();
            orderJson.addProperty("orderID", order.getOrderID());
            orderJson.addProperty("orderDate", order.getOrderDate());
            orderJson.addProperty("shippingAddress", order.getShippingAddress());
            orderJson.addProperty("billingAddress", order.getBillingAddress());
            orderJson.addProperty("orderStatus", order.getOrderStatus().getStatus());
            orderJson.addProperty("paymentID", order.getPaymentID());
            orderJson.addProperty("orderTotal", order.getOrderTotal());
            jsonOrder.add(orderJson);
        }

        // Create JSON response
        jsonResponse.addProperty("status", "Success");
        jsonResponse.add("orders", jsonOrder);

        // Write the response
        PrintWriter out = response.getWriter();
        out.write(jsonResponse.toString());
        out.flush();
    }}
