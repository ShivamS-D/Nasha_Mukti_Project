import React, { useEffect, useState } from 'react';
import './Login.css';
import {motion} from 'framer-motion'
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [giveTitle, setGiveTitle] = useState('Login');
    const [showPassword, setShowPassword] = useState(false);
const [flipped,setFlipped]=useState(false);
const [isAnimating,setIsAnimating]=useState(false);
const navigate=useNavigate();
    const flipCard = () => {
        if(!isAnimating){
            setFlipped(!flipped)
            setIsAnimating(true)
        }
        setIsLoggedIn(!isLoggedIn);
    };

    const hideShow = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        if(flipped){

        }
    }, [isLoggedIn]);

const [error,setError]=useState()

    const [formData,setFormData]=useState({
        email:'',
        password:'',
        name:"",
     
      })

    const [loginFormData,setLoginFormData]=useState({
        email:'',
        password:''
    })

      const handleChange=(e)=>{
        const {name,value}=e.target;
        setFormData({...formData,[name]:value})
        
      }
      const handleLoginChange=(e)=>{
        const {name,value}=e.target;
        setLoginFormData({...loginFormData,[name]:value})
        
      }
      const handleSubmit=async (e)=>{
        e.preventDefault()
       
        const response=await fetch('http://localhost:9090/',{
          method:"POST",
          body:JSON.stringify(formData),
          headers:{
            'Content-Type':'application/json'
          }
    
        })
        const json=await response.json()
        if(!response.ok){
            setError("User already Exists");  
            console.log(error) 
        }
        if(response.ok){
          
          setFormData({email:'',password:''})
          setError('')
          console.log('User created',json);
          navigate('/')
    
    
        }
        
        
        
      }

      const handleLoginSubmit=async (e)=>{
        e.preventDefault()
       
        const response=await fetch('http://localhost:9090/login',{
          method:"POST",
          body:JSON.stringify(loginFormData),
          headers:{
            'Content-Type':'application/json'
          }
    
        })
        const json=await response.json()
        if(!response.ok){
            setError("Invalid credentials");  
            console.log(error) 
            console.log(json)
        }
        if(response.ok){
          console.log(response.status)
          setLoginFormData({email:'',password:''})
          setError('')
          localStorage.setItem("json",json);
          navigate('/')

          console.log(json);
    
    
        }
      }
    return (
        
        <div className="contained">
            {error?<p style={{color:'red'}}>{error}</p>:null}
            <div className="card" >
                <motion.div  className="inner-box" initial={false} animate={{rotateY:flipped?180:360}} transition={{duration:0.6}} onAnimationComplete={()=>{setIsAnimating(false); 
            setGiveTitle(isLoggedIn ? 'Register' : 'Login')}
            
            }>
                    <div className="card-front">
                        <h2>{giveTitle}</h2>
                        <form action="" onSubmit={handleLoginSubmit}>
                            <input type="email" className="input-box" placeholder="Your Email ID" name='email' required onChange={handleLoginChange}/>
                            <input type={showPassword ? 'text' : 'password'} name='password' className="input-box" id="password" placeholder="Password" required onChange={handleLoginChange}/>
                            <input type="checkbox" onChange={hideShow} /><span>Show Password</span>
                            <button type="submit" className="submit-btni">Submit</button>
                            <input type="checkbox" name="" id="" /><span>Remember Me</span>
                        </form>
                        <button type="button" className="btni" onClick={flipCard}>New User</button>
                        <a href="">Forgot Password</a>
                    </div>
                    <div className="card-back">
                        <h2>REGISTER</h2>
                        <form action="" onSubmit={handleSubmit}>
                            <input type="text" className="input-box" name='name' onChange={handleChange} placeholder="Your Name" required />
                            <input type="email" className="input-box" name="email" 
                            onChange={handleChange} 
                            placeholder="Your Email ID" required />
                            <input type={showPassword ? 'text' : 'password'} 
                            name="password" className="input-box" id="password"
                            onChange={handleChange} 
                            placeholder="Password" required />
                            <input type="checkbox" onChange={hideShow} /><span>Show Password</span>
                            <button type="submit" className="submit-btn">CREATE</button>
                            <input type="checkbox" name="" id="" /><span>Remember Me</span>
                        </form>
                        <button type="button" className="btni" onClick={flipCard}>Already have an Account?<span><i className="fas fa-user"></i> Login</span></button>
                        <a href="">Forgot Password</a>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Login;
