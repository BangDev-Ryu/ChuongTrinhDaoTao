package com.chuongtrinhdaotao.backend.repositories;

import com.chuongtrinhdaotao.backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {}
