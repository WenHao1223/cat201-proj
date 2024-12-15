package com.chefsAura;

import org.json.JSONArray;
import org.json.JSONObject;

import com.chefsAura.models.UserCollection;
import com.chefsAura.models.User;
import com.chefsAura.utils.ReadJson;

public class Main {
    public static void main(String[] args) {
        System.out.println("Hello world!");

        // initialize user collection
        UserCollection userCollection = new UserCollection();

        loadUserCollection(userCollection);
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

        // Print out the users to verify
        for (User user : userCollection.getUsers()) {
            System.out.println(user.getFirstName());
        }
    }
}