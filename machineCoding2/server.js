import express from 'express';

const app = express();



app.use("", rateLimingRoute)

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})