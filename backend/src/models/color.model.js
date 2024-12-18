import mongoose from "mongoose"

const colorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    colorValue: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
}, { timestamps: true, versionKey: false })

export default mongoose.model("color", colorSchema)