package com.example.auction.model.auth;

import lombok.Getter;
import lombok.Setter;

import jakarta.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "pg_user", schema = "pg_catalog")
public class PgUser {
    @Id
    private String usename;

    @Column
    private String passwd;
}