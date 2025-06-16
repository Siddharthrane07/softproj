import {db} from '../db.js';
import jwt from 'jsonwebtoken';


export const addTask = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in");
  
    jwt.verify(token, "secretkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is invalid");
  
      const q = `
        INSERT INTO tasks (title, description, person, deadline, priority, status, project_id)
        VALUES (?, ?, ?, ?, ?, ?, ?)`;
  
      const values = [
        req.body.title,
        req.body.description,
        req.body.person,
        req.body.deadline,
        req.body.priority,
        "todo", // default Kanban column
        req.body.projectId,
      ];
  
      db.query(q, values, (err, data) => {
        if (err) return res.status(500).json(err);
        res.status(200).json({ message: "Task created" });
      });
    });
  };
  
  // GET /api/tasks/:projectId
  export const getTasksByProject = (req, res) => {
    const [projectId] = req.params.projectId;
    const q = "SELECT * FROM tasks WHERE project_id = ?";
    db.query(q, [projectId], (err, data) => {
      if (err) return res.status(500).json(err);
      res.status(200).json(data);
    });
  };