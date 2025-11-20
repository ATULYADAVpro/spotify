import express from 'express'
import connectDb from './configs/db.js';
import GlobalErrorHandler from './middlewares/GlobalErrorHandler.js';

// Variable  
const app = express();
const PORT = process.env.PORT || 5002;

// Initail working check route.
app.get('/', (req, res) => res.send(`<h1>server started at http://localhost:${PORT}</h1>`))


// Global Error handling
app.use(GlobalErrorHandler)

// Check connection of database
connectDb()

//call to server 
app.listen(PORT, () => { console.log(`http://localhost:${PORT}`) })