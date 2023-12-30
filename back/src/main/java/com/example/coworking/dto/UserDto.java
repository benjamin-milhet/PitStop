package com.example.coworking.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDto {
    
    private long id;
    private String firstName;
    private String lastName;
    private String email;
    private String tel;
    private String token;
    
}
