package com.example.auction.exception.auth;

import com.example.auction.exception.base.BaseException;
import org.springframework.http.HttpStatus;

public class UnauthorizedException extends BaseException {
    public UnauthorizedException() {
        super("Authentication Error", HttpStatus.UNAUTHORIZED);
    }

    public UnauthorizedException(String errorMessage) {
        super(errorMessage, HttpStatus.UNAUTHORIZED);
    }
}