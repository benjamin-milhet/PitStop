package com.example.coworking.service;

import com.example.coworking.payload.request.AuthenticationRequest;
import com.example.coworking.payload.request.RegisterRequest;
import com.example.coworking.payload.response.AuthenticationResponse;

public interface AuthenticationService {
    AuthenticationResponse register(RegisterRequest request);
    AuthenticationResponse authenticate(AuthenticationRequest request);
}
