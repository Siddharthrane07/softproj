import express from 'express';
import { verifyToken } from '../controllers/auth.js';
import { addTask,getTasksByProject } from '../controllers/projectDetails.js';
const router = express.Router(); 

router.post('/projectdetails/', verifyToken, addTask);
router.get('/projectdetails/:projectId', verifyToken, getTasksByProject);

export const projectDetailsRoutes = router;