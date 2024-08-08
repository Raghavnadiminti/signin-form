import "./App.css";
import { useState,useRef } from "react";
import items from "./items"; 
import Temp from "./ppt";
import { BrowserRouter} from 'react-router-dom';
import { Route,Routes ,Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import axios from "axios";


export default function Signin() {
   
    let inpt1=useRef(null)
    let inpt2=useRef(null)
    const [name,setName]=useState(" ")
    const [pswd,setPswd]=useState(" ")
    const [check,setCheck]=useState('low')
    const [di,setDi]=useState(false) 
    const [verify,setVerify]=useState(false)
    const [btn,setBtn]=useState(false)
    const history=useNavigate();
    
    function usnchane(e){
     setName(inpt1.current.value)
       e.preventDefault()
    }
   
   
    function pswdChnge(e){
     setPswd(inpt2.current.value)
     e.preventDefault()

    
     }
     
   
    
   
   
    function validate(nam){
     const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    
     if ( typeof nam === 'string')
     {
       if(nam.length>=6){
         for(let i=0;i<nam.length;i++){
                  if( specialChars.test(nam[i])){
                   return false
                  }
         }
       }
       else{
         return false
       }
     }
     return true
   }
   
   
   function handleClick(e){
     e.preventDefault()
    axios.post('http://localhost:4000/verify',{nam:name,ps:pswd}).then( (res)=>{
      console.log(res.data)
      if (!res.data){
        setBtn(true)
      }
      else{
     axios.post('http://localhost:5000/name',{nam:name,ps:pswd}).then( (res)=>{console.log("dat sent")
        
        })
        history('/sinup/homepage')
        setVerify(true)
      }
     } ).catch(err=>{alert('db error')})
     
     
      
     
     

    }
   
   return( <>
           <div id="form">
             <form>
        <label className="incls">username</label><input type="text" placeholder="enter full name" ref={inpt1} onChange={usnchane}></input><br></br>
        <label className="incls">password</label><input type="password" placeholder="enter password" ref={inpt2} onChange={pswdChnge}></input><br></br>
        <div></div>
       {btn&&<div className="warning">user name or password did not match</div>}
          {verify&& <Link to='/sinup/homepage'>  <button onClick={handleClick} className="signinbtn">SIGN IN</button><br></br></Link>}
          {!verify&& <><button onClick={handleClick} className="signinbtn">SIGN IN</button><br></br></>}
           not have account
        
        <Link to='/'>   <a>sign up</a> </Link>  </form> 
             
           </div>
   
   
   
   
   
   
   </> )
   };
  
