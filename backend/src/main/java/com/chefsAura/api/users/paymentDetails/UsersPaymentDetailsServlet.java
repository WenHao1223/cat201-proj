package com.chefsAura.api.users.paymentDetails;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.chefsAura.models.Payment;
import com.chefsAura.models.User;
import com.chefsAura.models.UserCollection;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

// @WebServlet("/api/users/paymentDetails")
public class UsersPaymentDetailsServlet extends HttpServlet {
    @Override
    public void init() throws ServletException {
        super.init();
        System.out.println("UsersPaymentDetailsServlet initialized.");
    }

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // Parse JSON request body
        String email = request.getParameter("email");
        System.out.println("UsersPaymentDetailsServlet GET request received with parameters: email = " + email);

        JsonObject jsonResponse = new JsonObject();

        if (email != "") {
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
                
                List<Payment> paymentDetails = user.getPaymentDetails();
                JsonArray jsonPaymentDetails = new JsonArray();

                for (Payment payment : paymentDetails) {
                    JsonObject paymentJson = new JsonObject();
                    paymentJson.addProperty("paymentID", payment.getPaymentID());
                    paymentJson.addProperty("paymentMethod", payment.getPaymentMethod().toString());
                    paymentJson.addProperty("cardNumber", payment.getLastFourDigits());
                    jsonPaymentDetails.add(paymentJson.toString());
                }
                // Create JSON response
                jsonResponse.addProperty("status", "Success");
                jsonResponse.add("paymentDetails", jsonPaymentDetails);
            } else {
                jsonResponse.addProperty("status", "Error");
                jsonResponse.addProperty("message", "User not found");
            }
        } else {
            jsonResponse.addProperty("status", "Error");
            jsonResponse.addProperty("message", "No user is logged in");
        }

        // Send response
        response.setContentType("application/json");
        try (PrintWriter out = response.getWriter()) {
            out.println(jsonResponse.toString());
        }
    }
}
