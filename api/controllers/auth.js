import {db} from "../db.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const  register = (req,res) =>{
    //CHECK USER IF EXISTS
    const q = "SELECT * FROM users WHERE name=?"
    db.query(q,[req.body.name],(err,data)=>
    {
        if(data.length) return res.status(409).json("User already exists!")
        if(err) return res.status(500).json(err)
      
        //CREATE A NEW USER
          //HASH the password
          const salt = bcrypt.genSaltSync(10);
          const hashedPassword = bcrypt.hashSync(req.body.pswd,salt)
    
        const q = "INSERT INTO users (`name` , `email` , `password` ) VALUE (?)"
        const values = [req.body.name,req.body.email,hashedPassword]
        
        db.query(q,[values],(err,data)=>{
            if (err) return res.status(500).json(err);
            return res.status(200).json("User has been created")
        })
        
    })
}

export const login = (req,res) =>{
    const q = "SELECT * FROM users WHERE email=?"
    db.query(q,[req.body.email],(err,data)=>
    {
        if(data.length === 0) return res.status(409).json("User not found")
        if(err) return res.status(500).json(err)

        const checkPassword = bcrypt.compareSync(req.body.pswd,data[0].password)
        if(!checkPassword) return res.status(400).json("Wrong password or name")

        const {password, ...others} = data[0]
        const token = jwt.sign({id: data[0].id}, "secretkey")

        // ✅ Send token in HTTP-only cookie only
        res.cookie("accessToken", token, {
            httpOnly: true,
            secure: false, // set to true in production with HTTPS
            sameSite: "strict"
        }).status(200).json(others) // send only user data
    })
}

export const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    req.user = userInfo;
    next();
  });
};

export const logout = (req, res) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: false, 
    sameSite: "strict",
  }).status(200).json("User has been logged out");
};