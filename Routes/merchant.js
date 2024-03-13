import express from 'express';
import { signin } from '../Controller/signin.js';
import { signup } from '../Controller/signup.js';

const merchantRouter = express.Router()

merchantRouter.post('/signup',signup);
merchantRouter.post('/signin',signin)

export {merchantRouter}