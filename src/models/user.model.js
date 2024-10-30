//package
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

// constant
const Schema = mongoose.Schema
const saltRounds = Number(process.env.saltRounds)
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET
const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET
const REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY

const userModel = new Schema({
    watchHistory: [
        {
        type: Schema.Types.ObjectId,
        ref: 'Video',
        }
    ],
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    fullname: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    avatar: {
        type: String, // cloudinary url
    },
    coverImage: {
        type: String,
    },
    password: {
        type: String,
        required: [true,'password is required']
    },
    refreshToken: {
        type: String,
    },
},{timestamps: true})

// Pre-save middleware to hash password
userModel.pre('save',async function (next) {
    if(!this.isModified('password')) return next()
    
    try {
        this.password = await bcrypt.hash(this.password,saltRounds)
        next()
    } catch (error) {
        console.log("Something Wrong: ",error);
    }
})

userModel.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password,this.password)
}

userModel.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            usernam: this.username,
            fullname: this.fullname
        },
        ACCESS_TOKEN_SECRET,
        {
            expriresIn: ACCESS_TOKEN_EXPIRY
        }
    )
}

userModel.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        REFRESH_TOKEN_SECRET,
        {
            expriresIn: REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model('User',userModel)