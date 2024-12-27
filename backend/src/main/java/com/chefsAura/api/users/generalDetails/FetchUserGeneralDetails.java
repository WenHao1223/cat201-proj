package com.chefsAura.api.users.generalDetails;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.chefsAura.models.UserCollection;
import com.chefsAura.models.User;
import com.google.gson.Gson;

@WebServlet("/api/users/generalDetails")
public class FetchUserGeneralDetails extends HttpServlet {
    @Override
    public void init() throws ServletException {
        super.init();

        System.out.println("FetchUserGeneralDetails initialized.");
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // Convert object to JSON using Gson
        Gson gson = new Gson();
        User user = UserCollection.getAllUsers().get(0);
        String jsonResponse = gson.toJson(user);

        // Write the response
        PrintWriter out = response.getWriter();
        out.write(jsonResponse);
        out.flush();
    }
}
