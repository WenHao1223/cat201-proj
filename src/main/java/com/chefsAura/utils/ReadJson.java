package com.chefsAura.utils;

import org.json.JSONArray;
import java.nio.file.Files;
import java.nio.file.Paths;

public class ReadJson {
    String filePath;

    public JSONArray readJson(String option) {
        switch (option) {
            case "user":
                filePath = "src/main/resources/data/userData.json";
                return loadFile();
            case "product":
                filePath =  "src/main/resources/data/productData.json";
                return loadFile();
            default:
                System.err.println("Invalid option");
                return null;
        }
    }

    public JSONArray loadFile() {
        JSONArray jsonArray = new JSONArray();
        try {
            String content = new String(Files.readAllBytes(Paths.get(filePath)));
            jsonArray = new JSONArray(content);
        } catch (Exception e) {
            e.printStackTrace();
        }
        System.out.println(filePath + " loaded successfully");
        return jsonArray;
    }
}