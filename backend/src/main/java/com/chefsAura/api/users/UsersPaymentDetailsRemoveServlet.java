package com.chefsAura.api.users;

import java.io.BufferedReader;
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
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

@WebServlet("/api/users/paymentDetails/remove")
public class UsersPaymentDetailsRemoveServlet extends HttpServlet {
    @Override
    public void init() throws ServletException {
        super.init();
        System.out.println("UsersPaymentDetailsRemoveServlet initialized.");
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
        System.out.println(
                "UsersPaymentDetailsRemoveServlet DELETE request received with parameters: " + jsonObject.toString());
        String email = jsonObject.get("email").getAsString();
        int paymentID = jsonObject.get("paymentID").getAsInt();

        JsonObject jsonResponse = new JsonObject();

        if (email != "") {
            User user = UserCollection.getUserByEmail(email);
            if (user != null) {
                try {
                    user.removePaymentDetails(paymentID);
                    List<Payment> paymentDetails = user.getPaymentDetails();
                    JsonArray jsonPaymentDetails = new JsonArray();

                    for (Payment payment : paymentDetails) {
                        JsonObject paymentJson = new JsonObject();
                        paymentJson.addProperty("paymentID", payment.getPaymentID());
                        paymentJson.addProperty("paymentMethod", payment.getPaymentMethod().toString());
                        paymentJson.addProperty("cardNumber", payment.getCardNumber());
                        jsonPaymentDetails.add(paymentJson.toString());
                    }

                    // Create JSON response
                    jsonResponse.addProperty("status", "Success");
                    jsonResponse.add("paymentDetails", jsonPaymentDetails);
                } catch (Exception e) {
                    jsonResponse.addProperty("status", "Error");
                    jsonResponse.addProperty("message", e.getMessage());
                }
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
