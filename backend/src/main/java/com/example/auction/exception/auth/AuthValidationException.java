package com.example.auction.exception.auth;

import com.example.auction.exception.base.BaseException;
import org.springframework.http.HttpStatus;

public class AuthValidationException extends BaseException {
    public AuthValidationException(String message) {
        super(message, HttpStatus.BAD_REQUEST);
    }
}