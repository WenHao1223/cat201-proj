package com.chefsAura.api.users.billingAddress;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.chefsAura.models.User;
import com.chefsAura.models.UserCollection;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

@WebServlet("/api/users/billingAddresses/update")
public class UsersBillingAddressesUpdateServlet extends HttpServlet {
    @Override
    public void init() throws ServletException {
        super.init();
        System.out.println("UsersBillingAddressesUpdateServlet initialized.");
    }

    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response)
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
                "UsersBillingAddressesUpdateServlet PUT request received with parameters: " + jsonObject.toString());
        String email = jsonObject.get("email").getAsString();
        int index = jsonObject.get("index").getAsInt();
        String updateBillingAddress = jsonObject.get("updateBillingAddress").getAsString();

        JsonObject jsonResponse = new JsonObject();

        if (!email.isEmpty()) {
            User user = UserCollection.getUserByEmail(email);

            if (user != null) {
                try {
                    user.updateBillingAddress(index, updateBillingAddress);
                    List<String> billingAddresses = user.getBillingAddresses();

                    // Convert the list to a JSON array
                    JsonArray jsonBillingAddresses = gson.toJsonTree(billingAddresses).getAsJsonArray();

                    // Create JSON response
                    jsonResponse.addProperty("status", "Success");
                    jsonResponse.addProperty("billingAddresses", jsonBillingAddresses.toString());
                } catch (IndexOutOfBoundsException e) {
                    jsonResponse.addProperty("status", "Error");
                    jsonResponse.addProperty("message", "Index out of bounds");
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
