package me.projects.backend.controllers;

import lombok.AllArgsConstructor;
import me.projects.backend.dtos.LoginResponse;
import me.projects.backend.dtos.LoginUserDto;
import me.projects.backend.dtos.RegisterUserDto;
import me.projects.backend.entities.User;
import me.projects.backend.services.AuthenticationService;
import me.projects.backend.services.JwtService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RequestMapping("/auth")
@RestController
@AllArgsConstructor
public class AuthenticationController {
    private final JwtService jwtService;

    private final AuthenticationService authenticationService;
    private UserDetailsService userDetailsService;

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(@RequestBody RegisterUserDto registerUserDto) {
        authenticationService.signup(registerUserDto);
        Map<String, String> response = new HashMap<>();
        response.put("message", "done");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginUserDto loginUserDto) {
        User authenticatedUser = authenticationService.authenticate(loginUserDto);

        String jwtToken = jwtService.generateToken(authenticatedUser);
        String refreshToken = jwtService.generateRefreshToken(authenticatedUser);

        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setToken(jwtToken);
        loginResponse.setExpiresIn(jwtService.getExpirationTime());
        loginResponse.setRefreshToken(refreshToken);

        return ResponseEntity.ok(loginResponse);
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshToken(@RequestBody Map<String, String> body) {
        String refreshToken = body.get("refreshToken");
        if (refreshToken == null || !jwtService.isTokenValid(refreshToken, userDetailsService.loadUserByUsername(jwtService.extractUsername(refreshToken)))) {
            return ResponseEntity.badRequest().body("Invalid refresh token");
        }
        UserDetails userDetails = userDetailsService.loadUserByUsername(jwtService.extractUsername(refreshToken));
        String newAccessToken = jwtService.generateToken(userDetails);
        return ResponseEntity.ok(Map.of("accessToken", newAccessToken));
    }

    public String getCurrentUser(@AuthenticationPrincipal UserDetails user) {
        return user.getUsername();
    }


}