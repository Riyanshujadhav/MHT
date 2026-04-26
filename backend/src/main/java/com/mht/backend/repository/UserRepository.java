package com.mht.backend.repository;

import com.mht.backend.model.Role;
import com.mht.backend.model.User;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {
    List<User> findByRole(Role role);
}
