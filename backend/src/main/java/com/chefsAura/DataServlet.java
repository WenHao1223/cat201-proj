package com.chefsAura;

import com.google.gson.Gson; // Add a JSON library like Gson for serialization
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

import com.chefsAura.models.MyObject; // Import the MyObject class

@WebServlet("/api/data")
public class DataServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

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

        // Create a simple object
        MyObject obj = new MyObject("Example Name", 123);

        // Convert object to JSON using Gson
        Gson gson = new Gson();
        String jsonResponse = gson.toJson(obj);

        // Write the response
        PrintWriter out = response.getWriter();
        out.write(jsonResponse);
        out.flush();
    }
}
