package com.chefsAura;

import java.io.FileWriter;
import java.io.IOException;
import java.io.Writer;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

import com.chefsAura.models.Inventory;
// import com.chefsAura.models.MyObject;
import com.chefsAura.models.Product;
import com.chefsAura.models.User;
import com.chefsAura.models.UserCollection;
import com.chefsAura.utils.enums.OrderStatusEnumDeserializer;
import com.chefsAura.utils.enums.OrderStatusEnumSerializer;
import com.chefsAura.utils.enums.PaymentMethodEnumDeserializer;
import com.chefsAura.utils.enums.PaymentMethodEnumSerializer;
import com.chefsAura.enums.PaymentMethodEnum;
import com.chefsAura.enums.OrderStatusEnum;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

import java.io.FileReader;
import java.io.Reader;

@WebListener
public class AppContextListener implements ServletContextListener {
    private static final String USER_DATA_FILE = "src/main/resources/data/userData.json"; // Adjust the path as
                                                                                          // necessary
    private static final String PRODUCT_DATA_FILE = "src/main/resources/data/productData.json"; // Adjust the path as
                                                                                                // necessary
    // private static final String MY_OBJECT_DATA_FILE =
    // "src/main/resources/data/myObject.json"; // Path to store MyObject data

    // private MyObject myObject;

    @Override
    public void contextInitialized(ServletContextEvent sce) {
        System.out.println("Context initialized.");

        // Load user data from JSON file
        try (Reader reader = new FileReader(USER_DATA_FILE)) {
            Gson gson = new GsonBuilder()
                    .registerTypeAdapter(PaymentMethodEnum.class, new PaymentMethodEnumDeserializer())
                    .registerTypeAdapter(OrderStatusEnum.class, new OrderStatusEnumDeserializer())
                    .create();
            Type userListType = new TypeToken<ArrayList<User>>() {
            }.getType();
            List<User> users = gson.fromJson(reader, userListType);
            UserCollection.setAllUsers(new ArrayList<>(users));
            System.out.println("User data loaded.");
        } catch (IOException e) {
            e.printStackTrace();
        }

        // Load product data from JSON file
        try (Reader reader = new FileReader(PRODUCT_DATA_FILE)) {
            Gson gson = new GsonBuilder()
                    .registerTypeAdapter(OrderStatusEnum.class, new OrderStatusEnumDeserializer())
                    .create();
            Type productListType = new TypeToken<ArrayList<Product>>() {
            }.getType();
            List<Product> products = gson.fromJson(reader, productListType);
            Inventory.setAllProducts(new ArrayList<>(products));
            System.out.println("Product data loaded.");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void contextDestroyed(ServletContextEvent sce) {
        System.out.println("Context destroyed. Saving data to JSON files...");

        // Save user data to JSON file
        try (Writer writer = new FileWriter(USER_DATA_FILE)) {
            Gson gson = new GsonBuilder()
                    .setPrettyPrinting()
                    .registerTypeAdapter(PaymentMethodEnum.class, new PaymentMethodEnumSerializer())
                    .registerTypeAdapter(OrderStatusEnum.class, new OrderStatusEnumSerializer())
                    .create();
            gson.toJson(UserCollection.getAllUsers(), writer);
            System.out.println("User data saved.");
        } catch (IOException e) {
            e.printStackTrace();
        }

        // Save product data to JSON file
        try (Writer writer = new FileWriter(PRODUCT_DATA_FILE)) {
            Gson gson = new GsonBuilder()
                    .setPrettyPrinting()
                    .registerTypeAdapter(OrderStatusEnum.class, new OrderStatusEnumSerializer())
                    .create();
            gson.toJson(Inventory.getAllProducts(), writer);
            System.out.println("Product data saved.");
        } catch (IOException e) {
            e.printStackTrace();
        }

        // Save MyObject data to JSON file
        // try (Writer writer = new FileWriter(MY_OBJECT_DATA_FILE)) {
        // Gson gson = new Gson();
        // gson.toJson(myObject, writer);
        // System.out.println("MyObject data saved.");
        // } catch (IOException e) {
        // e.printStackTrace();
        // }
    }
}