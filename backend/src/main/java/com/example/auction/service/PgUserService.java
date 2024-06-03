package com.example.auction.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

@Service
public class PgUserService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public boolean isExists(String username, String password) {
        try {
            Connection con = DriverManager.getConnection("jdbc:postgresql://localhost:5432/auction-system", username, password);
            return true;
        } catch (SQLException e) {
            // throw new RuntimeException(e);
            return false;
        }

        //        String sql = String.format("SELECT rolpassword FROM pg_authid where rolname = '%s'",
//                username);
//        String res = jdbcTemplate.queryForObject(sql, String.class);
//        return Boolean.TRUE.equals(jdbcTemplate.queryForObject(sql, Boolean.class));
    }

    public void createUser(String username, String password) {
        String sql = String.format("CREATE USER %s WITH PASSWORD '%s'",
                username, password);
        jdbcTemplate.execute(sql);
    }
}
