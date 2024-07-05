package it.nextdevs.capstone.dto;

import it.nextdevs.capstone.model.User;
import lombok.Data;

@Data
public class AuthDataDto {
    private String accessToken;
    private User user;
}
