package com.chefsAura;

import java.util.ArrayList;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;

import com.chefsAura.models.UserCollection;
import com.chefsAura.models.User;
import com.chefsAura.models.Inventory;
import com.chefsAura.models.Product;

import com.chefsAura.utils.ReadJson;

public class Main {
    public static void main(String[] args) {
        System.out.println("Hello world!");

        // initialize user collection
        UserCollection userCollection = new UserCollection();
        loadUserCollection(userCollection);

        // initialize inventory
        Inventory inventory = new Inventory();
        loadInventory(inventory);
    }

    public static void loadUserCollection(UserCollection userCollection) {
        // read user data from file
        JSONArray userJSONData = new ReadJson().readJson("user");
        for (int i = 0; i < userJSONData.length(); i++) {
            JSONObject userObject = userJSONData.getJSONObject(i);
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