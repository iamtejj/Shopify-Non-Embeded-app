import express from 'express';
import { signup } from '../Controller/signup.js';
const merchantRouter = express.Router()

merchantRouter.post('/signup',signup);

export {merchantRouter}