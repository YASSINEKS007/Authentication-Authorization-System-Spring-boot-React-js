package me.projects.backend.dtos;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor @NoArgsConstructor
public class LoginResponse {
    private String token;

    private long expiresIn;

}
