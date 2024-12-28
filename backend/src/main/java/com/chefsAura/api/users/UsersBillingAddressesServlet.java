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

@WebServlet("/api/users/billingAddresses")
public class UsersBillingAddressesServlet extends HttpServlet {
    @Override
    public void init() throws ServletException {
        super.init();
        System.out.println("UsersBillingAddressesServlet initialized.");
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // Parse JSON request body
        String email = request.getParameter("email");
        System.out.println("UsersBillingAddressesServlet GET request received with parameters: email = " + email);

        JsonObject jsonResponse = new JsonObject();

        if (email != "") {
            User user = UserCollection.getUserByEmail(email);
            List<String> billingAddresses = user.getBillingAddresses();
    
            // Convert the list to a JSON array
            Gson gson = new Gson();
            JsonArray jsonBillingAddresses = gson.toJsonTree(billingAddresses).getAsJsonArray();
    
            // Create JSON response
            jsonResponse.addProperty("status", "Success");
            jsonResponse.addProperty("billingAddresses", jsonBillingAddresses.toString());   
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
