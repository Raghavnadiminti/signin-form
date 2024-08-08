import "./App.css";
import { useState,useRef } from "react";
import items from "./items"; 
import Temp from "./ppt";
import { BrowserRouter } from 'react-router-dom';
import { Route,Routes ,Link} from 'react-router-dom';
import axios from "axios";
import Signin from './asignin.js'
import Sign from './sign.js'

export function App(){
  
    
};

function Classdiv(cls){

  return(
    <>
    <div className={ cls.cls }><label> {cls.cls=='high'&&"good"}  </label></div></>
  )
}
///////////////////////////////////////////////////////////////////////////

export function Routing() {


  let inpt3=useRef(null)
 let inpt1=useRef(null)
 let inpt2=useRef(null)
 const [name,setName]=useState(" ")
 const [pswd,setPswd]=useState(" ")
 const [check,setCheck]=useState('low')
 const [di,setDi]=useState(false)
 const [email,setmail]=useState("")
 const [find,setFind]=useState(false)
 const [ew,setEw]=useState(false)
///////////////////////////////////////////////////////////////////////
 function usnchane(e){
  setName(inpt1.current.value)
    e.preventDefault()
    axios.post('http://localhost:5000/',{data:{nam:name,ps:pswd}}).then((res)=>{console.log('posted')}).catch(error=>{alert('enter proper data')})

 }
///////////////////////////////////////////////////////////////////

 function pswdChnge(e){
  setPswd(inpt2.current.value)
  e.preventDefault()
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  if(typeof pswd=="string"){
    if(pswd.length>1){
      setDi(true)
    }
    else{
      setDi(false)
    }
    if(pswd.length<3){
          setCheck('low')
    }
    if(pswd.length>3 ){setCheck('medium')}
    if(pswd.length>3 && specialChars.test(pswd) ){setCheck('medium')}
    if(pswd.length>8 && specialChars.test(pswd) ){setCheck('high')}
  }
  
  axios.post('http://localhost:5000/',{data:{nam:name,ps:pswd}}).then((res)=>{console.log('posted')}).catch(error=>{alert('enter proper data')})
 
 }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
////////////////////////////////////////////////////////////////////////////////////////////
function contain(){
    
}
//////////////////////////////////////////////////////////////////////////////////
 function HandleClick(e){
 
  e.preventDefault()
  setmail(inpt3.current.value)
    if(validate(name)){
      if(check=="high"){
        axios.post('http://localhost:4000/',{nam:name,ps:pswd,email:email}).then((res)=>{setFind(!res.data)
          setEw(res.data)
        }).catch(error=>{alert('enter proper data')})
      
        
      }
      else{
        alert('password not good -should  contain special charaters-length greater than 8')
      }
 
    }
    else{
      alert('enter proper data -should not contain special charaters-length greater than 6')
    }
   
 }
//////////////////////////////////////////////////////////////////////////////////
return( <>
        <div id="form">
          <form>
          <label className="incls">E-Mail</label><input type="email" placeholder="enter email" ref={inpt3}></input><br></br>
     <label className="incls">username</label><input type="text" placeholder="enter full name" ref={inpt1} onChange={usnchane}></input><br></br>
     <label className="incls">password</label><input type="password" placeholder="enter password" ref={inpt2} onChange={pswdChnge}></input><br></br>
     <div></div>
      {di && <Classdiv cls={check}/>}
      {find&&<p>name already taken cannot save data</p>}
      {ew&&<p id="ew">sucessfully created account </p>}
        <button onClick={HandleClick} className="signinbtn">SIGN UP </button><br></br>
        
        already have account?
     <Link to='/sinup'>    <a>sign in</a> </Link> </form> 
          
        </div>






</> )
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export default function Signinpage(){
   return(
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Routing/>}>
      </Route>
      <Route path='/sinup' element={<Signin/>}></Route>
      <Route path='/sinup/homepage' element={<Sign/>}></Route>
    </Routes>
    </BrowserRouter>
   )
}