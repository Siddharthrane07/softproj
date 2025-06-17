import express from 'express';
import { verifyToken } from '../controllers/auth.js';
import { addTask,getTasksByProject,updateTask } from '../controllers/projectDetails.js';
const router = express.Router(); 

router.post('/projectdetails/', verifyToken, addTask);
router.get('/projectdetails/:projectId', verifyToken, getTasksByProject);
router.put('/projectdetails/:taskId', verifyToken, updateTask );

export const projectDetailsRoutes = router;