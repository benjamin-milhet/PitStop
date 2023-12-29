package com.example.coworking.service;

import com.example.coworking.dto.CredentialDto;
import com.example.coworking.dto.UserDto;
import com.example.coworking.exceptions.AppException;
import com.example.coworking.mappers.UserMapper;
import com.example.coworking.model.User;
import com.example.coworking.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.nio.CharBuffer;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;
    
    public UserDto login(CredentialDto credentialDto) {
        User user = this.userRepository.findByLogin(credentialDto.login())
                .orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));
        
        if (passwordEncoder.matches(CharBuffer.wrap(credentialDto.password()), user.getPassword())) {
            return userMapper.toUserDto(user);
        }
        throw new AppException("Invalid password", HttpStatus.BAD_REQUEST);
    }
}
