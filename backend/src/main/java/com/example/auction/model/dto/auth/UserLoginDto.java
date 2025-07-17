package com.example.auction.model.dto.auth;

import lombok.Data;
import lombok.Getter;

@Getter
@Data
public class UserLoginDto {
    private String username;
    private String password;
}
