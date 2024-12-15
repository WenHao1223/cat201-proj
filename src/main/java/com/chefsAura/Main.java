package com.chefsAura;

import java.util.ArrayList;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;

import com.chefsAura.models.Inventory;
import com.chefsAura.models.Product;
import com.chefsAura.models.User;
import com.chefsAura.models.UserCollection;
import com.chefsAura.models.Payment;

import com.chefsAura.utils.ReadJson;

public class Main {
    public static void main(String[] args) {
        // initialize user collection
        UserCollection userCollection = new UserCollection();
        loadUserCollection(userCollection);

        // initialize inventory
        Inventory inventory = new Inventory();
        loadInventory(inventory);
    }

    public static void loadUserCollection(UserCollection userCollection) {
        // read user data from file
        int largestPaymentID = 0;
        JSONArray userJSONData = new ReadJson().readJson("user");
        for (int i = 0; i < userJSONData.length(); i++) {
            JSONObject userObject = userJSONData.getJSONObject(i);

            JSONArray paymentDetails = userObject.getJSONArray("paymentDetails");
            for (int j = 0; j < paymentDetails.length(); j++) {
                JSONObject payment = paymentDetails.getJSONObject(j);
                int paymentID = payment.getInt("paymentID");

                // Update the largest paymentID if the current one is larger
                if (paymentID > largestPaymentID) {
                    largestPaymentID = paymentID;
                }
            }

            User newUser = new User(
                    userObject.getString("username"),
                    userObject.getString("email"),
                    userObject.getString("password"),
                    userObject.getString("nationality"),
                    userObject.getString("firstName"),
                    userObject.getString("lastName"),
                    userObject.getString("phoneNo"),
                    (short) userObject.getInt("gender"),
                    userObject.getString("dob"),
                    userObject.getBoolean("agreeToTerms"));
            userCollection.addUser(newUser);
        }

        // Set the paymentSize to the largest paymentID
        Payment.setPaymentSize(largestPaymentID + 1);
    }

    public static void loadInventory(Inventory inventory) {
        // read inventory data from file
        JSONArray inventoryJSONData = new ReadJson().readJson("product");
        for (int i = 0; i < inventoryJSONData.length(); i++) {
            JSONObject productObject = inventoryJSONData.getJSONObject(i);

            List<String> sizes = new ArrayList<>();
            JSONArray sizeArray = productObject.getJSONArray("sizes");
            for (int j = 0; j < sizeArray.length(); j++) {
                sizes.add(sizeArray.getString(j));
            }

            List<String> colors = new ArrayList<>();
            JSONArray colorArray = productObject.getJSONArray("colors");
            for (int j = 0; j < colorArray.length(); j++) {
                colors.add(colorArray.getString(j));
            }

            List<List<Integer>> quantities = new ArrayList<>();
            JSONArray quantityArray = productObject.getJSONArray("quantities");
            for (int j = 0; j < quantityArray.length(); j++) {
                List<Integer> innerList = new ArrayList<>();
                JSONArray innerArray = quantityArray.getJSONArray(j);
                for (int k = 0; k < innerArray.length(); k++) {
                    innerList.add(innerArray.getInt(k));
                }
                quantities.add(innerList);
            }

            Product newProduct = new Product(
                    productObject.getString("productID"),
                    productObject.getString("name"),
                    productObject.getString("description"),
                    productObject.getDouble("price"),
                    productObject.getString("category"),
                    productObject.getString("brand"),
                    sizes,
                    colors,
                    quantities);
            inventory.addProduct(newProduct);
        }
    }
}