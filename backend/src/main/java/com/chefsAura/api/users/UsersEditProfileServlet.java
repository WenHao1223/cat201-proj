package com.chefsAura.api.users;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;
import java.util.function.BiConsumer;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.chefsAura.models.User;
import com.chefsAura.models.UserCollection;
import com.google.gson.Gson;
import com.google.gson.JsonObject;

// @WebServlet("/api/users/editProfile")
public class UsersEditProfileServlet extends HttpServlet {
    @Override
    public void init() throws ServletException {
        super.init();
        System.out.println("UsersEditProfileServlet initialized.");
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
        JsonObject jsonResponse = gson.fromJson(sb.toString(), JsonObject.class);
        System.out.println("UsersEditProfileServlet PUT request received with parameters: " + jsonResponse.toString());
        String email = jsonResponse.get("email").getAsString();
        String field = jsonResponse.get("field").getAsString();
        String value = jsonResponse.get("value").getAsString();

        String status;
        if (!email.isEmpty()) {
            User user = UserCollection.getUserByEmail(email);
            if (user != null) {
                try {
                    if (!user.getRole().equals("user")) {
                        throw new IllegalArgumentException("User is not a customer");
                    }
                } catch (IllegalArgumentException e) {
                    jsonResponse.addProperty("status", false);
                    jsonResponse.addProperty("message", e.getMessage());
                    response.setContentType("application/json");
                    PrintWriter out = response.getWriter();
                    out.write(gson.toJson(jsonResponse));
                    out.flush();
                    return;
                }

                Map<String, BiConsumer<User, String>> fieldUpdaters = new HashMap<>();
                fieldUpdaters.put("username", User::setUsername);
                fieldUpdaters.put("nationality", User::setNationality);
                fieldUpdaters.put("firstName", User::setFirstName);
                fieldUpdaters.put("lastName", User::setLastName);
                fieldUpdaters.put("phoneNo", User::setPhoneNo);
                fieldUpdaters.put("gender", (u, v) -> u.setGender(Short.parseShort(v)));
                fieldUpdaters.put("dob", User::setDob);

                if (field.equals("password") || field.equals("email")) {
                    status = "Error";
                    jsonResponse.addProperty("status", status);
                    jsonResponse.addProperty("message", field.equals("password") ? "Password cannot be changed using this endpoint" : "Email cannot be changed");
                } else if (fieldUpdaters.containsKey(field)) {
                    status = "Success";
                    fieldUpdaters.get(field).accept(user, value);
                    jsonResponse.addProperty("status", status);
                    jsonResponse.addProperty("message", field + " updated successfully");
                } else {
                    status = "Error";
                    jsonResponse.addProperty("status", status);
                    jsonResponse.addProperty("message", "Invalid field");
                }
            } else {
                status = "Error";
                jsonResponse.addProperty("status", status);
                jsonResponse.addProperty("message", "User not found");
            }

            if (status == "Success") {
                User currentUser = UserCollection.getUserByEmail(email);
                JsonObject userJson = new JsonObject();
                userJson.addProperty("username", currentUser.getUsername());
                userJson.addProperty("email", currentUser.getEmail());
                userJson.addProperty("nationality", currentUser.getNationality());
                userJson.addProperty("firstName", currentUser.getFirstName());
                userJson.addProperty("lastName", currentUser.getLastName());
                userJson.addProperty("phoneNo", currentUser.getPhoneNo());
                userJson.addProperty("gender", currentUser.getGender());
                userJson.addProperty("dob", currentUser.getDob());
                userJson.addProperty("role", currentUser.getRole());
                jsonResponse.addProperty("user", userJson.toString());
            }
        } else {
            status = "Error";
            jsonResponse.addProperty("status", status);
            jsonResponse.addProperty("message", "No user is logged in");
        }

        // Write the response
        PrintWriter out = response.getWriter();
        out.write(gson.toJson(jsonResponse));
        out.flush();
    }
}
