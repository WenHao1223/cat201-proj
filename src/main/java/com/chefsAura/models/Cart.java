package com.chefsAura.models;

public class Cart {
    String productID;
    int quantity;
    int sizeIndex;
    int colorIndex;

    public Cart() {
        productID = "";
        quantity = 0;
        sizeIndex = 0;
        colorIndex = 0;
    }

    public Cart(String productID, int quantity, int sizeIndex, int colorIndex) {
        this.productID = productID;
        this.quantity = quantity;
        this.sizeIndex = sizeIndex;
        this.colorIndex = colorIndex;
    }

    public String getProductID() {
        return productID;
    }

    public int getQuantity() {
        return quantity;
    }

    public int getSizeIndex() {
        return sizeIndex;
    }

    public int getColorIndex() {
        return colorIndex;
    }

    public void setQuantity(int quantity) {
        // check if quantity is available
        if (Inventory.getProduct(productID).getQuantities().get(sizeIndex).get(colorIndex) - quantity < 0) {
            System.err.println("Quantity not available");
            return;
        }
        this.quantity = quantity;
    }

    public void setSizeIndex(int sizeIndex) {
        this.sizeIndex = sizeIndex;
    }

    public void setColorIndex(int colorIndex) {
        this.colorIndex = colorIndex;
    }

    public void incrementQuantity() {
        if (Inventory.getProduct(productID).getQuantities().get(sizeIndex).get(colorIndex) == 0) {
            System.err.println("Quantity not available");
            return;
        }
        this.quantity++;
    }

    public void decrementQuantity() {
        if (this.quantity == 0) {
            System.err.println("Quantity cannot be negative");
            return;
        }
        this.quantity--;
    }
}
