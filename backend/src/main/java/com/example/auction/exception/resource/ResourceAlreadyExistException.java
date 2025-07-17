package com.example.auction.exception.resource;

import com.example.auction.exception.base.BaseException;
import org.springframework.http.HttpStatus;

public class ResourceAlreadyExistException extends BaseException {
    public ResourceAlreadyExistException(String resourceName) {
        super(resourceName + " already exists", HttpStatus.CONFLICT);
    }
}