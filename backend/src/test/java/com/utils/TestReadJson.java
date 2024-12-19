package com.utils;

import static org.junit.jupiter.api.Assertions.assertEquals;

import com.chefsAura.utils.ReadJson;
import org.json.JSONArray;
import org.junit.jupiter.api.Test;

public class TestReadJson {

    @Test
    public void testReadUserJson() {
        ReadJson reader = new ReadJson();
        JSONArray userData = reader.readJson("user");
        assertEquals("jdoe123", userData.getJSONObject(0).getString("username"));
    }

    @Test
    public void testReadProductJson() {
        ReadJson reader = new ReadJson();
        JSONArray productData = reader.readJson("product");
        assertEquals("Chef Knife", productData.getJSONObject(0).getString("name"));
    }
}
