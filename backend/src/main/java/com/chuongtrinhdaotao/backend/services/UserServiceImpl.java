package com.chuongtrinhdaotao.backend.services;

import com.chuongtrinhdaotao.backend.models.User;
import com.chuongtrinhdaotao.backend.repositories.UserRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

  @Autowired
  private UserRepository repository;

  @Override
  public List<User> getAll() {
    return repository.findAll();
  }

  @Override
  public Optional<User> getById(Integer id) {
    return repository.findById(id);
  }

  @Override
  public User create(User user) {
    return repository.save(user);
  }

  @Override
  public User update(Integer id, User user) {
    user.setId(id);
    return repository.save(user);
  }

  @Override
  public void delete(Integer id) {
    repository.deleteById(id);
  }
}
