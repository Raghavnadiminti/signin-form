const express = require('express')
const bodyParser = require('body-parser');
const app=express()
const cors = require('cors');
const mongoose=require('mongodb')
let dataitem=[]
let port=5000;
app.use(cors({
    origin: '*',  
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  }));
  let li=[]
app.use(express.json())
app.post('/',(req,res)=>{
 
    const data=req.body;
    dataitem.push(data)
    res.send(dataitem)

})
app.post('/name',(req,res)=>{
   const {nam,ps}=req.body
   res.send(nam)
   console.log(req.body)
   console.log(nam)
   li.shift()
   li.push(nam)
   

})
app.get('/name', (req,res)=>{
  
    console.log(li);
     res.send(li[0]);  
     


  
  
})


app.listen(port,()=>{console.log("server started")})