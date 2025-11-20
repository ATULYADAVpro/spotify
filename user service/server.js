import express from 'express'
import connectDb from './configs/db.js';
import GlobalErrorHandler from './middlewares/GlobalErrorHandler.js';
import authRouter from './routers/Auth.js';

// Variable  
const app = express();
const PORT = process.env.PORT || 5002;


// middleware
app.use(express.json())

// Initail working check route.
app.get('/', (req, res) => res.send(`<h1>server started at http://localhost:${PORT}</h1>`))

// middleware for routes
app.use("/api/auth", authRouter)

// Global Error handling
app.use(GlobalErrorHandler)

// Check connection of database
connectDb()

//call to server 
app.listen(PORT, () => { console.log(`http://localhost:${PORT}`) })