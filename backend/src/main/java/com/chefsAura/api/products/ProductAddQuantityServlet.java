package com.chefsAura.api.products;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.chefsAura.models.Inventory;
import com.google.gson.Gson;
import com.google.gson.JsonObject;

@WebServlet("/api/products/addQuantity")
public class ProductAddQuantityServlet extends HttpServlet {
    @Override
    public void init() throws ServletException {
        super.init();
        System.out.println("ProductAddQuantityServlet initialized.");
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
                "ProductAddQuantityServlet PUT request received with parameters: " + jsonObject.toString());
        String productID = jsonObject.get("productID").getAsString();
        int sizeIndex = jsonObject.get("sizeIndex").getAsInt();
        int colorIndex = jsonObject.get("colorIndex").getAsInt();
        int quantity = jsonObject.get("quantity").getAsInt();

        JsonObject jsonResponse = new JsonObject();

        try {
            Inventory.addProductQuantity(productID, sizeIndex, colorIndex, quantity);

            String productJson = gson.toJson(Inventory.getAllProducts());
            
            jsonResponse.addProperty("status", "Success");
            jsonResponse.addProperty("message", "Quantity updated successfully");
            jsonResponse.addProperty("products", productJson);
        } catch (Exception e) {
            jsonResponse.addProperty("status", "Error");
            jsonResponse.addProperty("message", "Quantity not updated");
        }

        // Send response
        response.setContentType("application/json");
        try (PrintWriter out = response.getWriter()) {
            out.println(jsonResponse.toString());
        }
    }
}
