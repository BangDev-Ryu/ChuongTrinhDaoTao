package com.chuongtrinhdaotao.backend.config;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder; // Import it

@Configuration
// IMPORTANT: DO NOT add @EnableWebSecurity here if you don't want full Spring Security
public class AppConfig {

  @Bean
  public BCryptPasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  public ModelMapper modelMapper() {
    ModelMapper modelMapper = new ModelMapper();
    // Configure ModelMapper to ignore null values when mapping
    // This is crucial for partial updates
    modelMapper.getConfiguration().setSkipNullEnabled(true);
    // You might also want to set the matching strategy if field names differ
    modelMapper
      .getConfiguration()
      .setMatchingStrategy(MatchingStrategies.STRICT); // or STANDARD, LOOSE
    return modelMapper;
  }
}
