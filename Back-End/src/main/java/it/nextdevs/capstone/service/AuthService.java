package it.nextdevs.capstone.service;


import it.nextdevs.capstone.dto.AuthDataDto;
import it.nextdevs.capstone.dto.UserDataDto;
import it.nextdevs.capstone.dto.UserLoginDto;
import it.nextdevs.capstone.exceptions.UnauthorizedException;
import it.nextdevs.capstone.model.User;
import it.nextdevs.capstone.security.JwtTool;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserService userService;
    @Autowired
    private JwtTool jwtTool;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public AuthDataDto authenticateUserAndCreateToken(UserLoginDto userLoginDTO) {
        Optional<User> userOptional = userService.getUserByEmail(userLoginDTO.getEmail());
        System.err.println(userOptional.isEmpty());
        if (userOptional.isEmpty()) {
            throw new UnauthorizedException("Error in authorization, relogin!");
        } else {
            User user = userOptional.get();
            if (passwordEncoder.matches(userLoginDTO.getPassword(), user.getPassword())) {
                AuthDataDto authDataDto = new AuthDataDto();
                authDataDto.setAccessToken(jwtTool.createToken(user));
                authDataDto.setUser(user);
                return authDataDto;
            } else {
                throw new UnauthorizedException("Error in authorization, relogin!");
            }
        }
    }
}
