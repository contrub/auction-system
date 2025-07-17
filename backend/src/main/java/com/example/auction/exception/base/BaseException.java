package com.example.auction.exception.base;

import lombok.Getter;
import org.springframework.http.HttpStatus;

public abstract class BaseException extends RuntimeException {
    @Getter
    private final HttpStatus status;
    @Getter
    private final String timestamp = String.valueOf(System.currentTimeMillis());

    public BaseException(String message, HttpStatus status) {
        super(message);
        this.status = status;
    }
}