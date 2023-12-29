package com.example.coworking.mappers;

import com.example.coworking.dto.UserDto;
import com.example.coworking.model.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserDto toUserDto(User user);
}