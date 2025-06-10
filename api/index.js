import express from 'express';
import dashboardRoutes from './routes/Dashboard.js';
import userRoutes from './routes/auth.js';
import projectDetailsRoutes from './routes/ProjectDetails.js';

const app = express();
app.use(express.json())

app.use("/api/auth",userRoutes)
app.use("/api/user",userRoutes)
app.use("/api/project",projectDetailsRoutes)
app.use("/api/dashboard",dashboardRoutes)


app.listen(8800,()=>
    {
        console.log("Api Working")
    })
    
    
app.use((req,res,next)=>{
        console.log(req.path,req.method)
        next();
      })