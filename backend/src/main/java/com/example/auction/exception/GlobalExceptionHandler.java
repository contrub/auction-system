package com.example.auction.exception;

import com.example.auction.exception.base.BaseException;
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
public class GlobalExceptionHandler {
    @ExceptionHandler(BaseException.class)
    public ResponseEntity<Map<String, String>> handleBaseException(BaseException ex) {
        Map<String, String> errorResponse = new HashMap<>();
        errorResponse.put("message", ex.getMessage());
        errorResponse.put("status", String.valueOf(ex.getStatus().value()));
        errorResponse.put("timestamp", ex.getTimestamp());
        return new ResponseEntity<>(errorResponse, ex.getStatus());
    }
    
    @ExceptionHandler(DataAccessException.class)
    public ResponseEntity<Map<String, String>> handleDataAccessException(DataAccessException ex) {
        Map<String, String> errorResponse = new HashMap<>();
        errorResponse.put("message", ex.getMessage());
        errorResponse.put("timestamp", String.valueOf(System.currentTimeMillis()));

        if (ex.getMessage().contains("duplicate key")) {
            errorResponse.put("message", "Duplicate key violation occurred");
            errorResponse.put("status", HttpStatus.CONFLICT.toString());
            return new ResponseEntity<>(errorResponse, HttpStatus.CONFLICT);
        }

        String errorMessage = extractErrorMessage(ex.getMessage());
        errorResponse.put("message", errorMessage);
        errorResponse.put("status", String.valueOf(HttpStatus.INTERNAL_SERVER_ERROR.value()));
        errorResponse.put("timestamp", String.valueOf(System.currentTimeMillis()));
        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private String extractErrorMessage(String errorMessage) {
        Pattern fkPattern = Pattern.compile("violates foreign key constraint \"(.*?)\" on table \"(.*?)\"");
        Matcher fkMatcher = fkPattern.matcher(errorMessage);
        if (fkMatcher.find()) {
            String constraint = fkMatcher.group(1);
            String table = fkMatcher.group(2);
            return String.format("Cannot delete or update: the record is still referenced in table \"%s\" (constraint \"%s\")", table, constraint);
        }

        Pattern generalPattern = Pattern.compile("\\[ERROR: (.+?)(\\r?\\n|\\s+Where:|\\s+Detail:|])");
        Matcher generalMatcher = generalPattern.matcher(errorMessage);
        if (generalMatcher.find()) {
            return generalMatcher.group(1).trim();
        }

        return "Unknown database error";
    }
}