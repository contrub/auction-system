package com.example.auction.filter;

import com.example.auction.datasource.DynamicDataSource;
import com.example.auction.datasource.UserCredentialStore;
import com.example.auction.service.JwtService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.Nonnull;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final ObjectMapper objectMapper;
    private final UserCredentialStore credentialStore;

    public JwtAuthenticationFilter(JwtService jwtService,
                                   ObjectMapper objectMapper,
                                   UserCredentialStore credentialStore) {
        this.jwtService = jwtService;
        this.objectMapper = objectMapper;
        this.credentialStore = credentialStore;
    }

    @Override
    protected void doFilterInternal(@Nonnull HttpServletRequest request,
                                    @Nonnull HttpServletResponse response,
                                    @Nonnull FilterChain filterChain) throws ServletException, IOException {
        String path = request.getRequestURI();

        if (path.contains("/auth/signup") || path.equals("/auth/login")) {
            filterChain.doFilter(request, response);
            return;
        }

        String jwt = getJwtFromRequest(request);

        try {
            if (!StringUtils.hasText(jwt)) {
                sendErrorResponse(response, "Missing authentication token");
                return;
            }

            if (jwtService.isTokenExpired(jwt)) {
                sendErrorResponse(response, "Token has expired");
                return;
            }

            String username = jwtService.extractUsername(jwt);
            if (username == null) {
                sendErrorResponse(response, "Invalid token");
                return;
            }

            List<String> roles = jwtService.extractRoles(jwt);
            List<String> roleAuthorizes = roles.stream()
                    .map(role -> "ROLE_" + role.toUpperCase())
                    .toList();
            List<SimpleGrantedAuthority> authorities = roleAuthorizes.stream()
                    .map(SimpleGrantedAuthority::new)
                    .toList();

            UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(
                            username,
                            null,
                            authorities
                    );

            String password = credentialStore.getPassword(username);
            DynamicDataSource.setCurrentUser(username, password);

            authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            request.setAttribute("username", username);

            filterChain.doFilter(request, response);
        } catch (Exception e) {
            sendErrorResponse(response, "Authentication failed: " + e.getMessage());
        } finally {
            DynamicDataSource.clear();
        }
    }

    private void sendErrorResponse(HttpServletResponse response, String message) throws IOException {
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setCharacterEncoding("UTF-8");

        Map<String, String> errorResponse = new HashMap<>();
        errorResponse.put("message", message);
        errorResponse.put("timestamp", String.valueOf(System.currentTimeMillis()));
        errorResponse.put("status", "401");

        String jsonResponse = objectMapper.writeValueAsString(errorResponse);
        response.getWriter().write(jsonResponse);
    }

    private String getJwtFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}