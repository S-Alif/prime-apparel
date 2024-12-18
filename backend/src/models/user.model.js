import mongoose from "mongoose"

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
        validate: {
            validator: (value) => /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value),
            message: 'Please enter a valid email address.',
        },
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
    }
}, { timestamps: true, versionKey: false })

export default mongoose.model("user", userSchema)