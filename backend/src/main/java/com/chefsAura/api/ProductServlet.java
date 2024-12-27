package com.chefsAura.api;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.chefsAura.Main;
import com.chefsAura.models.Inventory;
import com.google.gson.Gson;

@WebServlet("/api/products")
public class ProductServlet extends HttpServlet {
    @Override
    public void init() throws ServletException {
        super.init();

        Main.loadInventory();

        System.out.println("ProductServlet initialized.");
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // Set CORS headers
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:5173"); // Adjust to your frontend's URL
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");

        // Example response: JSON data
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        // Convert object to JSON using Gson
        Gson gson = new Gson();
        String jsonResponse = gson.toJson(Inventory.getAllProducts());

        // Write the response
        PrintWriter out = response.getWriter();
        out.write(jsonResponse);
        out.flush();
    }
}
