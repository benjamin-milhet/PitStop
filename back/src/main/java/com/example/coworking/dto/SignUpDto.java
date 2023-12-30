package com.example.coworking.dto;

public record SignUpDto (String firstName, String lastName, String email, String tel, char[] password) { }