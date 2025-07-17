package com.example.auction.service;

import com.example.auction.repository.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.sql.DriverManager;
import java.sql.SQLException;

@Service
public class PgAuthService {
    @Value("${spring.datasource.url}")
    private String databaseUrl;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private UserRepository userRepository;

    public boolean checkConnection(String username, String password) {
        try {
            DriverManager.getConnection(databaseUrl, username, password);
            return true;
        } catch (SQLException e) {
            return false;
        }
    }

    public boolean isExists(String username, String password) {
        return checkConnection(username, password);
    }

    public String getRole(String username) {
        String sql = "SELECT rolname FROM pg_roles r WHERE r.rolname = ?";
        return jdbcTemplate.queryForObject(sql, String.class, username);
    }
}