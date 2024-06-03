package com.example.auction.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Value("${spring.graphql.cors.allowed-origins}")
    String[] allowedOrigins;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry
                .addMapping("/api/**")
                .allowedMethods("*")
                .allowedHeaders("*")
                .allowedOrigins(allowedOrigins)
                .exposedHeaders("Authorization")
                .allowCredentials(true);
        registry
                .addMapping("/auth/**")
                .allowedMethods("*")
                .allowedHeaders("*")
                .allowedOrigins(allowedOrigins)
                .exposedHeaders("Authorization")
                .allowCredentials(true);
    }
}
