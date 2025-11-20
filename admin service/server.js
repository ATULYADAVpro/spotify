import express from 'express'
import { PORT } from './configs/index.js'
import connectDb from './configs/db.js'
import GlobalErrorHandler from './middlewares/globalErrorHandler.js'
const app = express()
const port = PORT || 5002

// middleware 
app.use(express.json())



//check server 
app.get('/', (req, res) => {
    res.send(`<h1>Admin Server working</h1>`)
})


//Global Error Handler
app.use(GlobalErrorHandler)

// initialize sql
connectDb().then(() => {
    //call to server 
    app.listen(PORT, () => { console.log(`http://localhost:${PORT}`) })
})
