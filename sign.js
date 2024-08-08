import "./App.css";
import { useState,useRef,useEffect } from "react";
import items from "./items"; 
import Temp from "./ppt";
import { BrowserRouter } from 'react-router-dom';
import { Route,Routes ,Link} from 'react-router-dom';
import axios from "axios";
import Signin from './asignin.js'

export default function Sign(){
    let li=[]
    const [name,setName]=useState(' ')
    
   
      axios.get('http://localhost:5000/name')
          .then(res => {
           console.log("res",res.data)
            setName(res.data);

          })
          .catch(err => {
            console.error('Error fetching name:', err);
          });
      console.log(name)
    return(
        <>
        <div>WELCOME HOMEPAGE</div>
        {name}
        </>
    )
}