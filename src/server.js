//packages
import dotenv from 'dotenv'
import express from "express"

//file-import
import connectDB from "./db/index.js"
import {app} from "../src/app.js"

//constants
dotenv.config({
    path: './env'       //dotenv configuration
})
const PORT = process.env.PORT || 8000

//DB connection
connectDB()
.then((response) => {
    app.listen(PORT,() => {
        console.log(`server is running at http://localhost:${PORT}`)
    })
})
.catch((error) => {
    console.log("mongoDB connection failer !!! ", err);
})

