package com.chefsAura.api.users;

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

@WebServlet("/api/users/shippingAddresses")
public class UsersShippingAddressesServlet extends HttpServlet {
    @Override
    public void init() throws ServletException {
        super.init();
        System.out.println("UsersShippingAddressesServlet initialized.");
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // Parse JSON request body
        String email = request.getParameter("email");
        System.out.println("UsersShippingAddressesServlet GET request received with parameters: email = " + email);

        JsonObject jsonResponse = new JsonObject();

        if (email != "") {
            User user = UserCollection.getUserByEmail(email);
            List<String> shippingAddresses = user.getShippingAddresses();
    
            // Convert the list to a JSON array
            Gson gson = new Gson();
            JsonArray jsonShippingAddresses = gson.toJsonTree(shippingAddresses).getAsJsonArray();
    
            // Create JSON response
            jsonResponse.addProperty("status", "Success");
            jsonResponse.addProperty("shippingAddresses", jsonShippingAddresses.toString());   
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
