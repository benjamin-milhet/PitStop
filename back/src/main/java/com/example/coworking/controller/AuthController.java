package com.example.coworking.controller;

import com.example.coworking.dto.CredentialDto;
import com.example.coworking.dto.UserDto;
import com.example.coworking.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AuthController {
    
    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<UserDto> login(@RequestBody CredentialDto credentialDto) {
        UserDto userDto = userService.login(credentialDto);
        return ResponseEntity.ok(userDto);
    }
}