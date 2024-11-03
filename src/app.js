//package
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'



//constant
const CORS_ORIGIN = process.env.CORS_ORIGIN
const app = express()       // Creates an Express application instance to handle incoming HTTP requests and define routes
const corsOptions = {
    origin: CORS_ORIGIN, 
    credentials: true
}

const limit = '16kb';

//middlewares
app.use(cors(corsOptions))
app.use(express.json({
    limit,
}))
app.use(express.urlencoded({
    extended: true,
    limit,
}))
app.use(express.static('public'))
app.use(cookieParser()) 


//routes import
import userRouter from './routes/user.routes.js'


//routes declaration
app.use('/api/v1/users',userRouter)



export {app}