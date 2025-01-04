package com.chefsAura.api.users.carts;

import java.io.BufferedReader;
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
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

@WebServlet("/api/users/cart/update")
public class CartUpdateServlet extends HttpServlet {
    @Override
    public void init() throws ServletException {
        super.init();
        System.out.println("CartUpdateServlet initialized.");
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
                "CartUpdateServlet PUT request received with parameters: " + jsonObject.toString());
        String email = jsonObject.get("email").getAsString();
        String productID = jsonObject.get("productID").getAsString();
        int quantity = jsonObject.get("quantity").getAsInt();
        int sizeIndex = jsonObject.get("sizeIndex").getAsInt();
        int colorIndex = jsonObject.get("colorIndex").getAsInt();

        JsonObject jsonResponse = new JsonObject();

        if (!email.isEmpty()) {
            User user = UserCollection.getUserByEmail(email);

            if (user != null) {
                try {
                    try {
                        user.updateProductQuantityInCart(
                                productID,
                                sizeIndex,
                                colorIndex,
                                quantity);
                    } catch (IllegalArgumentException e) {
                        if (e.getMessage().equals("Product not found in cart")) {
                            // product not found in cart
                            user.addProductToCart(new Cart(productID, quantity, sizeIndex, colorIndex));
                            System.out.println("Product not found in cart, adding product to cart");
                        } else {
                            throw e;
                        }
                    }

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
                            cartJson.addProperty("sizeIndex", cart.getSizeIndex());
                            cartJson.addProperty("colorIndex", cart.getColorIndex());

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
                } catch (Exception e) {
                    jsonResponse.addProperty("status", "Error");
                    jsonResponse.addProperty("message", "Failed to add product to cart");
                }
            } else {
                jsonResponse.addProperty("status", "Error");
                jsonResponse.addProperty("message", "User not found");
            }
        } else {
            jsonResponse.addProperty("status", "Error");
            jsonResponse.addProperty("message", "No user is logged in");
        }

        // Send response
        response.setContentType("application/json");
        try (PrintWriter out = response.getWriter()) {
            out.println(jsonResponse.toString());
        }
    }
}
