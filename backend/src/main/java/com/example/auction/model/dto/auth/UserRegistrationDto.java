package com.example.auction.model.dto.auth;

import lombok.Data;
import lombok.Getter;

@Getter
@Data
public class UserRegistrationDto {
    private String username;
    private String password;
    private String firstName;
    private String lastName;
}
