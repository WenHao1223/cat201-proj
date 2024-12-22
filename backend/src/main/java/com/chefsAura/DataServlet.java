package com.chefsAura;

import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.Reader;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.chefsAura.models.Inventory;
import com.chefsAura.models.MyObject; // Import the MyObject class
import com.chefsAura.models.Product;
import com.chefsAura.models.User;
import com.chefsAura.models.UserCollection;
import com.google.gson.Gson; // Add a JSON library like Gson for serialization
import com.google.gson.reflect.TypeToken;

@WebServlet("/api/data")
public class DataServlet extends HttpServlet implements ServletContextListener {
    private static final long serialVersionUID = 1L;
    private static final String USER_DATA_FILE = "src/main/resources/data/userData.json"; // Adjust the path as necessary
    private static final String PRODUCT_DATA_FILE = "src/main/resources/data/productData.json"; // Adjust the path as necessary

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

    @Override
    public void contextInitialized(ServletContextEvent sce) {
        // Load user data from JSON file
        try (Reader reader = new FileReader(USER_DATA_FILE)) {
            Gson gson = new Gson();
            Type userListType = new TypeToken<ArrayList<User>>(){}.getType();
            List<User> users = gson.fromJson(reader, userListType);
            UserCollection.setAllUsers(new ArrayList<>(users));
        } catch (IOException e) {
            e.printStackTrace();
        }

        // Load product data from JSON file
        try (Reader reader = new FileReader(PRODUCT_DATA_FILE)) {
            Gson gson = new Gson();
            Type productListType = new TypeToken<ArrayList<Product>>(){}.getType();
            List<Product> products = gson.fromJson(reader, productListType);
            Inventory.setAllProducts(new ArrayList<>(products));;
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void contextDestroyed(ServletContextEvent sce) {
        // Save user data to JSON file
        try (FileWriter writer = new FileWriter(USER_DATA_FILE)) {
            Gson gson = new Gson();
            gson.toJson(UserCollection.getAllUsers(), writer);
        } catch (IOException e) {
            e.printStackTrace();
        }

        // Save product data to JSON file
        try (FileWriter writer = new FileWriter(PRODUCT_DATA_FILE)) {
            Gson gson = new Gson();
            gson.toJson(Inventory.getAllProducts(), writer);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
