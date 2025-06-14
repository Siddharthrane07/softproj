import express from 'express';
import {dashboardRoutes} from "./routes/Dashboard.js";
import {userRoutes} from './routes/auth.js';
import {projectDetailsRoutes} from './routes/ProjectDetails.js';
import cors from 'cors';
import cookieParser from "cookie-parser";


const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());

app.use((req,res,next)=>{
  res.header("Access-Control-Allow-Credentials",true)
  next();
})
app.use("/api/auth",userRoutes)
app.use("/api/user",userRoutes)
app.use("/api/project",projectDetailsRoutes)
app.use("/api/dashboard",dashboardRoutes)



app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next();
  })

app.listen(8800,()=>
    {
        console.log("Api Working")
    })
    
    
app.use((req,res,next)=>{
        console.log(req.path,req.method)
        next();
      })