package com.chefsAura.models;

import java.util.List;

public class Product {
    String productID;
    String name;
    String description;
    double price;
    String category;
    String brand;
    List<String> sizes;
    List<String> colors;
    List<List<Integer>> quantities;

    // empty constructor
    public Product() {
        productID = "";
        name = "";
        description = "";
        price = 0.0;
        category = "";
        brand = "";
        sizes = null;
        colors = null;
        quantities = null;
    }

    // used during first-time loading of products
    public Product(String productID, String name, String description,
            double price, String category, String brand,
            List<String> sizes, List<String> colors, List<List<Integer>> quantities) {
        this.productID = productID;
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = category;
        this.brand = brand;
        this.sizes = sizes;
        this.colors = colors;
        this.quantities = quantities;
    }

    // add quantities
    public void addQuantity(int sizeIndex, int colorIndex, int quantities) {
        this.quantities.get(sizeIndex).set(colorIndex, this.quantities.get(sizeIndex).get(colorIndex) + quantities);
        System.out.println("Quantity updated successfully");
    }

    // remove quantities
    public void removeQuantity(int sizeIndex, int colorIndex, int quantities) {
        if (this.quantities.get(sizeIndex).get(colorIndex) - quantities < 0) {
            System.err.println("Quantity not available");
            return;
        }
        this.quantities.get(sizeIndex).set(colorIndex, this.quantities.get(sizeIndex).get(colorIndex) - quantities);
        System.out.println("Quantity updated successfully");
    }

    // get product ID
    public String getProductID() {
        return this.productID;
    }

    // get product name
    public String getName() {
        return this.name;
    }

    // get product description
    public String getDescription() {
        return this.description;
    }

    // get product price
    public double getPrice() {
        return this.price;
    }

    // get product category
    public String getCategory() {
        return this.category;
    }

    // get product brand
    public String getBrand() {
        return this.brand;
    }

    // get product sizes
    public List<String> getSizes() {
        return this.sizes;
    }

    // get product colors
    public List<String> getColors() {
        return this.colors;
    }

    // get product quantities
    public List<List<Integer>> getQuantities() {
        return this.quantities;
    }
}
