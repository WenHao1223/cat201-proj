package com.chefsAura.api.users;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.chefsAura.models.User;
import com.chefsAura.models.UserCollection;
import com.google.gson.Gson;
import com.google.gson.JsonObject;

@WebServlet("/api/users/changePassword")
public class UsersChangePassword extends HttpServlet {
    @Override
    public void init() throws ServletException {
        super.init();
        System.out.println("UsersChangePassword initialized.");
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
        System.out.println("UsersChangePassword PUT request received with parameters: " + jsonObject.toString());
        String email = jsonObject.get("email").getAsString();
        String currentPassword = jsonObject.get("currentPassword").getAsString();
        String newPassword = jsonObject.get("newPassword").getAsString();
        
        // Create JSON response
        JsonObject jsonResponse = new JsonObject();

        if (!email.isEmpty()) {
            User user = UserCollection.getUserByEmail(email);
            if (user != null) {
                boolean passwordChanged = user.changePassword(currentPassword, newPassword);
                if (passwordChanged) {
                    jsonResponse.addProperty("status", "Success");
                } else {
                    jsonResponse.addProperty("status", "Error");
                    jsonResponse.addProperty("message", "Incorrect password");
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
