package me.projects.backend.services;


import lombok.AllArgsConstructor;
import me.projects.backend.entities.User;
import me.projects.backend.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public List<User> allUsers() {

        return userRepository.findAll();
    }
}
