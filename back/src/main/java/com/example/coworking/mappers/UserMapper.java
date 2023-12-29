package com.example.coworking.mappers;

import com.example.coworking.dto.SignUpDto;
import com.example.coworking.dto.UserDto;
import com.example.coworking.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserDto toUserDto(User user);

    @Mapping(target = "password", ignore = true)
    User signUpToUser(SignUpDto signUpDto);
}