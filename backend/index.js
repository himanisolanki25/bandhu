// NODEMON--> to refresh the webpage without starting the server again
// "type": "module"--> to use import instead of const

// const express = require('express')
import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors"
import path from "path"
import userRoute from "./routes/user.route.js";
import messageRoute from "./routes/message.route.js"
import { app, server } from "./socketIO/server.js";

// const app = express()

// middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors())

dotenv.config();
const PORT = process.env.PORT || 5000
const URI=process.env.MONGODB_URI

try{
  mongoose.connect(URI)
  console.log("Connected to MongoDB")
} catch (error) {
  console.log(error)
}

// routes
app.use("/api/user", userRoute);
app.use("/api/message",messageRoute);


// ------------------------ code for deployment ------------------------
if(process.env.NODE_ENV === "production"){
  const dirPath = path.resolve();

  app.use(express.static("./frontend/dist"))
  app.get("*",(req,res)=>{
    res.sendFile(path.resolve(dirPath,"./frontend/dist","index.html"))
  })
}


server.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})

