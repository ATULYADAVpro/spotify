import express, { urlencoded } from 'express'
import { PORT } from './configs/index.js'
import connectDb from './configs/db.js'
import GlobalErrorHandler from './middlewares/globalErrorHandler.js'
import albumRouter from './routes/albumRoutes.js'
const app = express()
const port = PORT || 5002

// middleware 
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


//check server 
app.get('/', (req, res) => {
    res.send(`<h1>Admin Server working</h1>`)
})
app.use('/api', albumRouter)

//Global Error Handler
app.use(GlobalErrorHandler)

// initialize sql
connectDb().then(() => {
    //call to server 
    app.listen(port, () => { console.log(`http://localhost:${PORT}`) })
})
