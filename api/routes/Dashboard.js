import express from 'express';

import { newAddProject,getProject } from '../controllers/newproject.js';
import { verifyToken } from '../controllers/auth.js';

const router = express.Router(); 

router.post('/dashboardproject',verifyToken,newAddProject)
router.get('/getdashboardproject',verifyToken,getProject)


export const dashboardRoutes = router;