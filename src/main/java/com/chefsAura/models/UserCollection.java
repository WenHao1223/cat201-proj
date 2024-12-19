package com.chefsAura.models;

import java.util.ArrayList;

public class UserCollection {
    static ArrayList<User> users;
    static User currentUser;

    // empty constructor
    public UserCollection() {
        users = new ArrayList<User>();
        currentUser = new User();
    }

    // add user from file
    public void addUser(User user) {
        users.add(user);
        // System.out.println("User " + user.getFirstName() + " added successfully");
    }

    // get all users
    public ArrayList<User> getAllUsers() {
        return users;
    }

    // login user
    public boolean loginUser(String email, String password) {
        for (User user : users) {
            if (user.getEmail().equals(email) && user.validatePassword(password)) {
                currentUser = user;
                System.out.println(currentUser.getFirstName() + " logged in successfully");
                return true;
            }
        }
        System.err.println("Invalid email or password");
        return false;
    }
}
