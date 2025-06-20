import {db} from "../db.js"
import jwt from "jsonwebtoken";

export const newAddProject = (req,res) =>{
    try {
            const token = req.cookies.accessToken;
            if (!token) return res.status(401).json("Not logged in!");

        jwt.verify(token,"secretkey",(err,userInfo)=>{
            if(err) return res.status(403).json("Token is not valid")
        const q  = "INSERT INTO projects (`pname` , `pdesc`,`tasks`,`members`,`deadline`,`progress`,`userid`) VALUES (?)"
            const values = [
                req.body.title,
                req.body.description,
                req.body.tasks,
                req.body.members,
                req.body.deadline,
                req.body.progress,
                userInfo.id,
            ]
            db.query(q,[values],(err,data)=>{
                if (err) return res.status(500).json(err);
                return res.status(200).json("Project has been created");
            })
              });
        // }) 
    } catch (error) {
        console.log(error)
    }

}
export const getProject = (req,res) =>{
    try {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const q = `SELECT * FROM projects WHERE userid = ?`;

    db.query(q, [userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
}
     catch (error) {
        console.log(error)
    }


}