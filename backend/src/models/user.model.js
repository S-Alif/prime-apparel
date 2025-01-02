import mongoose from "mongoose"
import { encryptPassword, checkEncryptedPassword } from '../helpers/password.helper.js'
import { issueToken } from "../helpers/token.helper.js"

const userSchema = new mongoose.Schema({
    fName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
        trim: true,
    },
    lName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        index: true
    },
    phone: {
        typeof: String,
    },
    pass: {
        type: String,
        required: true
    },
    district: {
        type: String,
        trim: true,
    },
    address: {
        type: String,
        trim: true,
    },
    role: {
        type: Number,
        default: 2024,
        enum: [2024, 1999],
        required: true
    },
    verified: {
        type: Boolean,
        default: false,
    },
    isBlocked: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true, versionKey: false })


userSchema.pre('save', async function (next) {
    if(!this.isModified('pass')) return next()
    this.pass = await encryptPassword(this.pass)
    next()
})

userSchema.methods.verifyPassword = async function (pass) {
    return await checkEncryptedPassword(pass, this.pass)
}

userSchema.methods.generateToken = function () {
    return issueToken({ id: this._id, email: this.email, role: this.role })
}

export default mongoose.model("user", userSchema)