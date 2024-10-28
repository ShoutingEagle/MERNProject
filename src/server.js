//packages
import mongoose from "mongoose"
import express from "express"
import dotenv from 'dotenv'

//file-import
import connectDB from "./db/index.js"


//constants
const PORT = process.env.PORT
dotenv.config({
    path: './env'
})
const app = express()


//DB connection
connectDB()


