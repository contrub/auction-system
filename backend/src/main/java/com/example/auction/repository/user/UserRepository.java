package com.example.auction.repository.user;

import com.example.auction.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    @Query(value = "SELECT * FROM \"user\" WHERE username = :p_username", nativeQuery = true)
    User findByUsername(@Param("p_username") String name);

    @Modifying
    @Transactional
    @Query(value = "CALL register_user(:p_username, :p_first_name, :p_last_name, :p_password, :p_role)", nativeQuery = true)
    void registerUser(
            @Param("p_username") String username, @Param("p_first_name") String firstName,
            @Param("p_last_name") String lastName, @Param("p_password") String password,
            @Param("p_role") String role);

    @Query(value = "SELECT r.rolname FROM pg_roles r " +
            "JOIN pg_auth_members m ON r.oid = m.roleid " +
            "JOIN pg_roles u ON u.oid = m.member " +
            "WHERE u.rolname = :p_role AND r.rolcanlogin = false", nativeQuery = true)
    List<String> getRoles(@Param("p_role") String username);
}