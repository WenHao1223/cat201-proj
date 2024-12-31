package com.chefsAura.api.users.paymentDetails;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.chefsAura.enums.PaymentMethodEnum;
import com.chefsAura.models.Payment;
import com.chefsAura.models.User;
import com.chefsAura.models.UserCollection;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

@WebServlet("/api/users/paymentDetails/add")
public class UsersPaymentDetailsAddServlet extends HttpServlet {
    @Override
    public void init() throws ServletException {
        super.init();
        System.out.println("UsersPaymentDetailsAddServlet initialized.");
    }

    @Override
    public void doPut(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Methods", "PUT, OPTIONS");

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
                "UsersPaymentDetailsAddServlet PUT request received with parameters: " + jsonObject.toString());
        String email = jsonObject.get("email").getAsString();
        String paymentMethod = jsonObject.get("paymentMethod").getAsString();
        String cardNumber = jsonObject.get("cardNumber").getAsString();
        String expiryDate = jsonObject.get("expiryDate").getAsString();
        String cvv = jsonObject.get("cvv").getAsString();

        JsonObject jsonResponse = new JsonObject();

        if (email != "") {
            User user = UserCollection.getUserByEmail(email);
            if (user != null) {
                try {
                    user.addPaymentDetails(new Payment(
                            PaymentMethodEnum.fromString(paymentMethod),
                            cardNumber,
                            expiryDate,
                            cvv));
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
