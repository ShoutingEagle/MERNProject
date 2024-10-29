//package
import mongoose from "mongoose"

//files
import { DB_NAME } from "../constant.js"

//mongoDb url
const MONGO_URI = process.env.MONGO_URI

//db connection
const connectDB = async () => {
    try {
    const dbResponse = await mongoose.connect(MONGO_URI+`/${DB_NAME}`)
    console.log(`\n MongoDB connected !! DB Host ${dbResponse.connection.host}`)
        
    } catch (error) {
        console.log("ERROR",error);
        process.exit(1)      
    }
}

export default connectDB