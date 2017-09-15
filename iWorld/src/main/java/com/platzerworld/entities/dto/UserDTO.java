package com.platzerworld.entities.dto;

/**
 * Created by platzerworld on 06.09.17.
 */
public class UserDTO {
    private String username;
    private String password;
    private String token;

    public UserDTO() {

    }

    public UserDTO(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
