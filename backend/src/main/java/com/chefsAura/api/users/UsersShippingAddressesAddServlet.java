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

import com.chefsAura.models.User;
import com.chefsAura.models.UserCollection;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

@WebServlet("/api/users/shippingAddresses/add")
public class UsersShippingAddressesAddServlet extends HttpServlet {
    @Override
    public void init() throws ServletException {
        super.init();
        System.out.println("UsersShippingAddressesAddServlet initialized.");
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
                "UsersShippingAddressesAddServlet PUT request received with parameters: " + jsonObject.toString());
        String email = jsonObject.get("email").getAsString();
        String newShippingAddress = jsonObject.get("newShippingAddress").getAsString();

        JsonObject jsonResponse = new JsonObject();

        if (!email.isEmpty()) {
            User user = UserCollection.getUserByEmail(email);

            if (user != null) {
                try {
                    user.addShippingAddress(newShippingAddress);
                    List<String> shippingAddresses = user.getShippingAddresses();

                    // Convert the list to a JSON array
                    JsonArray jsonShippingAddresses = gson.toJsonTree(shippingAddresses).getAsJsonArray();

                    // Create JSON response
                    jsonResponse.addProperty("status", "Success");
                    jsonResponse.addProperty("shippingAddresses", jsonShippingAddresses.toString());
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
