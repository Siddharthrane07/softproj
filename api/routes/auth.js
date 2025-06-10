import { Router } from 'express';
import express from 'express';
const router = express.Router();
import {login,logout,register} from '../controllers/auth.js';

export const authRoutes = (req,res) => {
    router.post('/register', register);
    router.post('/login', login);
    router.post('/logout', logout);
}
