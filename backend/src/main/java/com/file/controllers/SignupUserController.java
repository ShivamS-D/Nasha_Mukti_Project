package com.file.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.file.dtos.LoginDTO;
import com.file.dtos.UserDTO;
import com.file.models.User;
import com.file.repositories.UserRepository;
import com.file.services.AuthService;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class SignupUserController {
	
	
	@Autowired
	private AuthService authService;
	@PostMapping("/")
	public  ResponseEntity<?> createUsers(@RequestBody UserDTO userDTO){
		Boolean createUser= authService.createUser(userDTO);
		if(createUser==false)
			return new ResponseEntity<>(false,HttpStatus.BAD_REQUEST);
	   return new ResponseEntity<>(true, HttpStatus.CREATED);	
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> authenticateUser(@RequestBody LoginDTO loginDto){
		User authUser=authService.authenticateUser(loginDto);
		if(authUser==null) {
			return new ResponseEntity<>(false,HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(true,HttpStatus.ACCEPTED);
	}
	
	
	
}
