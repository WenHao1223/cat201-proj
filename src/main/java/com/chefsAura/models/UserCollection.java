package com.chefsAura.models;

import java.util.ArrayList;

public class UserCollection {
    ArrayList<User> users;
    User currentUser;

    // empty constructor
    public UserCollection() {
        this.users = new ArrayList<User>();
        this.currentUser = new User();
    }

    // add user from file
    public void addUser(User user) {
        this.users.add(user);
        // System.out.println("User " + user.getFirstName() + " added successfully");
    }

    // get all users
    public ArrayList<User> getAllUsers() {
        return this.users;
    }
}
