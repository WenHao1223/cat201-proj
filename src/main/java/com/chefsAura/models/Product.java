package com.chefsAura.models;

import java.util.List;

public class Product {
    String productID;
    String name;
    String description;
    String price;
    String category;
    String brand;
    List<String> size;
    List<String> color;
    int quantity;

    // empty constructor
    public Product() {
        productID = "";
        name = "";
        description = "";
        price = "";
        category = "";
        brand = "";
        size = null;
        color = null;
        quantity = 0;
    }

    // used during first-time loading of products
    public Product(String productID, String name, String description,
            String price, String category, String brand,
            List<String> size, List<String> color, int quantity) {
        this.productID = productID;
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = category;
        this.brand = brand;
        this.size = size;
        this.color = color;
        this.quantity = quantity;
    }

    // update quantity
    public void addQuantity(int quantity) {
        this.quantity += quantity;
        System.out.println("Quantity updated successfully");
    }

    public void removeQuantity(int quantity) {
        this.quantity -= quantity;
        System.out.println("Quantity updated successfully");
    }
}
