package com.example.auction.datasource;

import org.springframework.stereotype.Component;

import java.util.concurrent.ConcurrentHashMap;

@Component
public class UserCredentialStore {
    private final ConcurrentHashMap<String, String> credentials = new ConcurrentHashMap<>();

    public void store(String username, String password) {
        credentials.put(username, password);
    }

    public String getPassword(String username) {
        return credentials.get(username);
    }

    public void remove(String username) {
        credentials.remove(username);
    }
}
