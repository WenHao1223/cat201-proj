package com.chefsAura.api.users;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.chefsAura.models.UserCollection;
import com.google.gson.Gson;

// @WebServlet("/api/users")
public class UsersServlet extends HttpServlet {

    @Override
    public void init() throws ServletException {
        super.init();

        System.out.println("UsersServlet initialized.");
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");

        // Convert object to JSON using Gson
        Gson gson = new Gson();
        String jsonResponse = gson.toJson(UserCollection.getAllUsers());

        // Write the response
        PrintWriter out = response.getWriter();
        out.write(jsonResponse);
        out.flush();
    }
}