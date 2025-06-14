import express from 'express';
import {db} from '../db.js';
import { newAddProject } from '../controllers/newproject.js';

const router = express.Router(); 

router.post('/dashboardproject',newAddProject)

export const dashboardRoutes = router;