package com.chefsAura.models;

import java.util.ArrayList;

public class Inventory {
    ArrayList<Product> products;

    // empty constructor
    public Inventory() {
        this.products = new ArrayList<Product>();
    }

    // add product from file
    public void addProduct(Product product) {
        this.products.add(product);
        // System.out.println("Product " + product.getName() + " added successfully");
    }

    // get all products
    public ArrayList<Product> getAllProducts() {
        return this.products;
    }

    public Product getProduct(String productID) {
        for (Product product : this.products) {
            if (product.productID.equals(productID)) {
                return product;
            }
        }
        return null;
    }
    
    public void addQuantity(String productID, int sizeIndex, int colorIndex, int quantity) {
        Product product = getProduct(productID);
        if (product == null) {
            System.err.println("Product not found");
            return;
        }
        product.addQuantity(sizeIndex, colorIndex, quantity);
    }

    public void removeQuantity(String productID, int sizeIndex, int colorIndex, int quantity) {
        Product product = getProduct(productID);
        if (product == null) {
            System.err.println("Product not found");
            return;
        }
        product.removeQuantity(sizeIndex, colorIndex, quantity);
    }
}
