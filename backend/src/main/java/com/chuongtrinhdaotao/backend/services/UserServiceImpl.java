package com.chuongtrinhdaotao.backend.services;

import com.chuongtrinhdaotao.backend.models.User;
import com.chuongtrinhdaotao.backend.repositories.UserRepository;
import java.util.List;
import java.util.Optional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

  @Autowired
  private UserRepository repository;

  @Autowired
  private BCryptPasswordEncoder passwordEncoder;

  @Autowired
  private ModelMapper modelMapper;

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
    if (user.getPassword() != null && !user.getPassword().isBlank()) {
      user.setPassword(passwordEncoder.encode(user.getPassword()));
    }
    return repository.save(user);
  }

  @Override
  public User update(Integer id, User user) {
    Optional<User> existingOpt = repository.findById(id);

    if (existingOpt.isPresent()) {
      User existingUser = existingOpt.get();

      // Store the current password before mapping, if it's not being updated
      String oldHashedPassword = existingUser.getPassword();

      // Hash the new password if provided in the input 'user' object
      String newPlainPassword = user.getPassword();
      if (newPlainPassword != null && !newPlainPassword.isBlank()) {
        user.setPassword(passwordEncoder.encode(newPlainPassword));
      } else {
        // If no new password is provided, set password in 'user' to null
        // so ModelMapper (with setSkipNullEnabled(true)) ignores it
        user.setPassword(null);
      }

      // Map non-null properties from 'user' (update payload) to 'existingUser'
      // ModelMapper's setSkipNullEnabled(true) handles ignoring nulls
      modelMapper.map(user, existingUser);

      // If the password was not provided in the 'user' object,
      // ModelMapper would have skipped it. We ensure old password is kept if needed.
      // This line is technically redundant if setSkipNullEnabled(true) works as expected
      // and the input password was set to null when not provided.
      if (user.getPassword() == null && oldHashedPassword != null) {
        existingUser.setPassword(oldHashedPassword);
      }

      // set giang vien again because can unlink giang vien from user
      existingUser.setGiangVien(user.getGiangVien());
      
      return repository.save(existingUser);
    } else {
      if (user.getPassword() != null && !user.getPassword().isBlank()) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
      }
      user.setId(id);
      return repository.save(user);
    }
  }

  @Override
  public void delete(Integer id) {
    repository.deleteById(id);
  }
}
