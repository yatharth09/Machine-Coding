import express from 'express';
import {body} from 'express-validator';


const router = express.Router();

const registerValidation = [
    body('username').length({min: 5}).withMessage('Username must be at least 5 characters long'),
    body('email').isEmail().withMessage('Invalid email address'),    
]

const loginValidation = [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').notEmpty().withMessage('Password cannot be empty'),
]

router.post('/register', registerValidation, regFunction)
router.post('/login', loginValidation, loginFunction)

export default router;