import mongoose from "mongoose"

const categorySchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    image: {
        type: String,
        required: true,
    }
}, { timestamps: true, versionKey: false })

export default mongoose.model("category", categorySchema)