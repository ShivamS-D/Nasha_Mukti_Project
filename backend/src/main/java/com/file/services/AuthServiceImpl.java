package com.file.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestBody;

import com.file.dtos.LoginDTO;
import com.file.dtos.UserDTO;
import com.file.models.User;
import com.file.repositories.UserRepository;
@Component
public class AuthServiceImpl implements AuthService {
	
	@Autowired
	private UserRepository userRepo;
   public Boolean createUser(UserDTO userDTO){
      User existedUser=this.userRepo.findByEmail(userDTO.getEmail());
      if(existedUser!=null) {
    	  return false;
      }
	 User user =  userDTOtouser(userDTO);
	  User createdUser= this.userRepo.save(user);
	   return true;
   }
   
   @Override
   public User authenticateUser( LoginDTO loginDto) {
	   User withEmail=this.userRepo.findByEmailAndPassword(loginDto.getEmail(),loginDto.getPassword());
	   
	   return withEmail;
	   
   }

	public User userDTOtouser(UserDTO userDTO) {
		User user = new User();
		 user.setEmail(userDTO.getEmail());
		 
		   user.setName(userDTO.getName());
		   user.setPassword(userDTO.getPassword());
		   return user;
	}
	
	public UserDTO usertouserDTO(User user) {
		UserDTO userDTO = new UserDTO();
		 userDTO.setEmail(user.getEmail());
		
		   userDTO.setName(user.getName());
		   userDTO.setPassword(user.getPassword());
		   return userDTO;
	}
	
	
}




		
	   
