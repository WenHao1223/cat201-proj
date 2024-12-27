package com.chefsAura.api;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.chefsAura.Main;
import com.chefsAura.models.UserCollection;
import com.google.gson.Gson;

@WebServlet("/api/users")
public class UserServlet extends HttpServlet {
    @Override
    public void init() throws ServletException {
        super.init();

        Main.loadInventory();
        Main.loadUserCollection();

        // test register user
        // System.out.println("\nRegistering user...");
        // UserCollection.registerUser("alice123", "alice@example.com", "password",
        //         "Malaysia", "Alice", "Doe", "0123456789",
        //         (short) 1, "2000-01-01", true);

        // test login user
        // System.out.println("\nLogging in user...");
        // UserCollection.loginUser("jdoe@example.com", "password");
        // UserCollection.loginUser("jdoe@example.com", "password123");

        System.out.println("Servlet initialized.");
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // Set CORS headers
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:5173"); // Adjust to your frontend's URL
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");

        // Retrieve parameters from the request
        // String paramName = request.getParameter("name");
        // String paramValue = request.getParameter("value");
        // System.out.println("GET request received with parameters: " + paramName + " = " + paramValue);

        // Example response: JSON data
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        // Convert object to JSON using Gson
        Gson gson = new Gson();
        String jsonResponse = gson.toJson(UserCollection.getAllUsers());

        // Write the response
        PrintWriter out = response.getWriter();
        out.write(jsonResponse);
        out.flush();
    }
}