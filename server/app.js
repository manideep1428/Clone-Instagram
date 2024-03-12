const express = require('express');
const app =express();
const userRoutes = require('./routes/userRoutes')
const bodyParser =require("body-parser")
const cors = require('cors')
const axios =require('axios')
const cookieParser = require('cookie-parser');


app.use(cors());
app.use(cookieParser());


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use("/api",userRoutes)


app.use((error,req,res,next)=>{
    axios.post("http://localhost:3000/v1/signup",error)
})

app.listen(8080,()=>console.log("Server Started to 8080"))