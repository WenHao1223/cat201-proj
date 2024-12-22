package com.chefsAura.models;

import java.util.ArrayList;

public class Inventory {
    static ArrayList<Product> products;
    
    // Static initializer block to initialize the products list
    static {
        products = new ArrayList<>();
    }

    // empty constructor
    public Inventory() {
    }

    // add product from file
    public static void addProduct(Product product) {
        products.add(product);
        // System.out.println("Product " + product.getName() + " added successfully");
    }

    // set all products
    public static void setAllProducts(ArrayList<Product> products) {
        Inventory.products = products;
    }

    // get all products
    public static ArrayList<Product> getAllProducts() {
        return products;
    }

    public static Product getProduct(String productID) {
        for (Product product : products) {
            if (product.productID.equals(productID)) {
                return product;
            }
        }
        System.err.println("Product not found");
        return null;
    }

    public static void addQuantity(String productID, int sizeIndex, int colorIndex, int quantity) {
        Product product = getProduct(productID);
        if (product == null) {
            System.err.println("Product not found");
            return;
        }
        product.addQuantity(sizeIndex, colorIndex, quantity);
    }

    public static void removeQuantity(String productID, int sizeIndex, int colorIndex, int quantity) {
        Product product = getProduct(productID);
        if (product == null) {
            System.err.println("Product not found");
            return;
        }
        product.removeQuantity(sizeIndex, colorIndex, quantity);
    }
}
