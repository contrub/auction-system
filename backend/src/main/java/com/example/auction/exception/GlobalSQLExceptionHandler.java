package com.example.auction.exception;

import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@ControllerAdvice
public class GlobalSQLExceptionHandler {
    @ExceptionHandler(DataAccessException.class)
    public ResponseEntity<Map<String, String>> handleDataAccessException(DataAccessException ex) {
        Map<String, String> errorResponse = new HashMap<>();

        if (ex.getMessage().contains("duplicate key")) {
            errorResponse.put("error", "Duplicate key violation occurred");
            return new ResponseEntity<>(errorResponse, HttpStatus.CONFLICT);
        }

        String errorMessage = extractErrorMessage(ex.getMessage());
        errorResponse.put("error", errorMessage);
        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private String extractErrorMessage(String errorMessage) {
        Pattern pattern = Pattern.compile("\\[ERROR: (.+?)\\s+Where:");
        Matcher matcher = pattern.matcher(errorMessage);
        if (matcher.find()) {
            return matcher.group(1);
        }
        return "Unknown error";
    }
}