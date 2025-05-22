package com.chuongtrinhdaotao.backend.services;

import com.chuongtrinhdaotao.backend.models.User;
import java.util.List;
import java.util.Optional;

public interface UserService {
  List<User> getAll();
  Optional<User> getById(Integer id);
  User create(User user);
  User update(Integer id, User user);
  void delete(Integer id);
}
