import express from 'express';
import dotenv from 'dotenv';

import connect from './config/connection.js';
//create a login page 
const app = express()

connect()
app.post('/login', (req, res) => {
    const {username, password, email} = req.body


})

app.listen(3000, () => {})