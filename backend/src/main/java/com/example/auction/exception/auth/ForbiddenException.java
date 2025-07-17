package com.example.auction.exception.auth;


import com.example.auction.exception.base.BaseException;
import org.springframework.http.HttpStatus;

public class ForbiddenException extends BaseException {
    public ForbiddenException() {
        super("You don't have permission to access this resource", HttpStatus.FORBIDDEN);
    }

    public ForbiddenException(String errorMessage) {
        super(errorMessage, HttpStatus.FORBIDDEN);
    }
}