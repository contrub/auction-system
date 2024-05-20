package com.example.auction.repository;

import com.example.auction.model.PermissionUsers;
import com.example.auction.model.key.PermissionUsersId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PermissionUsersRepository extends JpaRepository<PermissionUsers, PermissionUsersId> {
}
