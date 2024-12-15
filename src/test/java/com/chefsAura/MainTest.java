package com.chefsAura;

import static org.junit.jupiter.api.Assertions.assertEquals;

import com.chefsAura.models.Inventory;
import com.chefsAura.models.UserCollection;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class MainTest {

    private UserCollection userCollection;
    private Inventory inventory;

    @BeforeEach
    public void setUp() {
        userCollection = new UserCollection();
        Main.loadUserCollection(userCollection);

        inventory = new Inventory();
        Main.loadInventory(inventory);
    }

    @Test
    public void testAddQuantity() {
        int initialQuantity = inventory.getProduct("U006").getQuantities().get(0).get(0);
        inventory.addQuantity("U006", 0, 0, 1);
        int updatedQuantity = inventory.getProduct("U006").getQuantities().get(0).get(0);
        assertEquals(initialQuantity + 1, updatedQuantity);
    }

    @Test
    public void testRemoveQuantity() {
        int initialQuantity = inventory.getProduct("U006").getQuantities().get(0).get(0);
        inventory.removeQuantity("U006", 0, 0, 1);
        int updatedQuantity = inventory.getProduct("U006").getQuantities().get(0).get(0);
        assertEquals(initialQuantity - 1, updatedQuantity);
    }
}
