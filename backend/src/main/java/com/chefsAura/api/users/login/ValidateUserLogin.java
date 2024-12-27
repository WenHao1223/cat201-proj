package com.chefsAura.api.users.login;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.chefsAura.models.UserCollection;
import com.google.gson.Gson;
import com.google.gson.JsonObject;

@WebServlet("/api/users/login")
public class ValidateUserLogin extends HttpServlet {
    @Override
    public void init() throws ServletException {
        super.init();
        System.out.println("ValidateUserLogin initialized.");
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");

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
        String email = jsonObject.get("email").getAsString();
        String password = jsonObject.get("password").getAsString();

        System.out.println("POST request received with parameters: " + email + " = " + password);

        // Validate user login
        boolean loginStatus = UserCollection.loginUser(email, password);

        // Create JSON response
        JsonObject jsonResponse = new JsonObject();
        jsonResponse.addProperty("loginStatus", loginStatus);

        // Write the response
        PrintWriter out = response.getWriter();
        out.write(gson.toJson(jsonResponse));
        out.flush();
    }
}