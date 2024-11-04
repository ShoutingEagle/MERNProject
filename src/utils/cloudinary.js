// package
import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'


// constant
const cloud_name= process.env.CLOUD_NAME
const api_key= process.env.API_KEY
const api_secret= process.env.API_SECRET


// cloudinary config
cloudinary.config({
    cloud_name,
    api_key,
    api_secret
})


// Upload an image

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null
        //upload file on coludinary
        const uploadResult = await cloudinary.uploader
            .upload(localFilePath, {
                resource_type: 'auto'
        })
        fs.unlinkSync(localFilePath)
        return uploadResult
    } catch (error) {
        fs.unlinkSync(localFilePath) //remove locally saved temp files 
        return null
    }
}


export {uploadOnCloudinary}




