package com.chefsAura.api.users.carts;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.chefsAura.models.Cart;
import com.chefsAura.models.Inventory;
import com.chefsAura.models.Product;
import com.chefsAura.models.User;
import com.chefsAura.models.UserCollection;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

@WebServlet("/api/users/cart")
public class CartServlet extends HttpServlet {
    @Override
    public void init() throws ServletException {
        super.init();
        System.out.println("CartServlet initialized.");
    }

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // Parse JSON request body
        String email = request.getParameter("email");
        System.out.println("CartServlet GET request received with parameters: email = " + email);

        JsonObject jsonResponse = new JsonObject();

        if (!email.isEmpty()) {
            User user = UserCollection.getUserByEmail(email);
            if (user != null) {
                List<Cart> carts = user.getCarts();
                JsonArray jsonCart = new JsonArray();

                for (Cart cart : carts) {
                    JsonObject cartJson = new JsonObject();
                    Product product = Inventory.getProduct(cart.getProductID());

                    if (product != null) {
                        cartJson.addProperty("productID", cart.getProductID());
                        cartJson.addProperty("name", product.getName());
                        cartJson.addProperty("price", product.getPrice());
                        cartJson.addProperty("category", product.getCategory());
                        cartJson.addProperty("brand", product.getBrand());
                        cartJson.addProperty("quantity", cart.getQuantity());

                        try {
                            cartJson.addProperty("size", product.getSizes().get(cart.getSizeIndex()));
                            cartJson.addProperty("color", product.getColors().get(cart.getColorIndex()));
                        } catch (IndexOutOfBoundsException e) {
                            System.out.println("Size or color index out of bounds");
                            throw new IllegalArgumentException("Size or color index out of bounds");
                        }

                        jsonCart.add(cartJson.toString());
                    } else {
                        System.out.println("Product not found in inventory");
                        throw new IllegalArgumentException("Product not found in inventory");
                    }
                }

                // Create JSON response
                jsonResponse.addProperty("status", "Success");
                jsonResponse.add("carts", jsonCart);
            } else {
                jsonResponse.addProperty("status", "Error");
                jsonResponse.addProperty("message", "User not found");
            }
        } else {
            jsonResponse.addProperty("status", "Error");
            jsonResponse.addProperty("message", "No user is logged in");
        }

        // Write the response
        PrintWriter out = response.getWriter();
        out.write(jsonResponse.toString());
        out.flush();
    }
}
