package com.chefsAura.api.products;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.chefsAura.models.Inventory;
import com.google.gson.Gson;

// @WebServlet("/api/products")
public class ProductsServlet extends HttpServlet {
    @Override
    public void init() throws ServletException {
        super.init();
        System.out.println("ProductsServlet initialized.");
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        if (request.getPathInfo() != null) {
            return;
        }
        
        // Convert object to JSON using Gson
        Gson gson = new Gson();
        String jsonResponse = gson.toJson(Inventory.getAllProducts());

        // Write the response
        PrintWriter out = response.getWriter();
        out.write(jsonResponse);
        out.flush();
    }
}
