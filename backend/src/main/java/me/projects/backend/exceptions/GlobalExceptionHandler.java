package me.projects.backend.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
@RestController
public class GlobalExceptionHandler {

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<Map<String, Object>> handleAccessDeniedException(AccessDeniedException ex) {
        // Custom JSON response for forbidden access
        Map<String, Object> responseBody = new HashMap<>();
        responseBody.put("error", "Forbidden");
        responseBody.put("message", "You are forbidden from accessing this resource.");
        responseBody.put("status", HttpStatus.FORBIDDEN.value());
        responseBody.put("timestamp", System.currentTimeMillis());

        return new ResponseEntity<>(responseBody, HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(TokenExpiredException.class)
    public ResponseEntity<Map<String, Object>> handleTokenExpiredException(TokenExpiredException ex) {
        Map<String, Object> responseBody = new HashMap<>();
        responseBody.put("error", "Unauthorized");
        responseBody.put("message", ex.getMessage());
        responseBody.put("status", HttpStatus.UNAUTHORIZED.value());
        responseBody.put("timestamp", System.currentTimeMillis());

        return new ResponseEntity<>(responseBody, HttpStatus.UNAUTHORIZED);
    }

}
