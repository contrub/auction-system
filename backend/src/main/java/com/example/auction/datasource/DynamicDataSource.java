package com.example.auction.datasource;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.jdbc.datasource.lookup.AbstractRoutingDataSource;

import javax.sql.DataSource;
import java.util.HashMap;
import java.util.Map;

public class DynamicDataSource extends AbstractRoutingDataSource {
    private static final ThreadLocal<String> currentUsername = new ThreadLocal<>();
    private static final ThreadLocal<String> currentPassword = new ThreadLocal<>();

    private final Map<Object, Object> resolvedDataSources = new HashMap<>();
    private final String defaultUsername;
    private final String defaultPassword;

    @Value("${spring.datasource.url}")
    private String defaultUrl;

    @Value("${spring.datasource.driver-class-name}")
    private String defaultDriver;

    public DynamicDataSource(String defaultUsername, String defaultPassword) {
        this.defaultUsername = defaultUsername;
        this.defaultPassword = defaultPassword;
    }

    public static void setCurrentUser(String username, String password) {
        currentUsername.set(username);
        currentPassword.set(password);
    }

    public static void clear() {
        currentUsername.remove();
        currentPassword.remove();
    }

    @Override
    protected Object determineCurrentLookupKey() {
        return currentUsername.get();
    }

    @Override
    protected DataSource determineTargetDataSource() {
        String username = currentUsername.get();
        String password = currentPassword.get();

        if (username == null || password == null) {
            username = defaultUsername;
            password = defaultPassword;
        }

        String dataSourceKey = username;

        if (!resolvedDataSources.containsKey(dataSourceKey)) {
            DataSource newDataSource = DataSourceBuilder.create()
                    .url(defaultUrl)
                    .driverClassName(defaultDriver)
                    .username(username)
                    .password(password)
                    .build();
            resolvedDataSources.put(dataSourceKey, newDataSource);
            setTargetDataSources(resolvedDataSources);
            afterPropertiesSet();
        }

        return (DataSource) resolvedDataSources.get(dataSourceKey);
    }
}
