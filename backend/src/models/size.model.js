import mongoose from "mongoose"

const sizeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        undefined: true,
        trim: true
    }
}, { timestamps: true, versionKey: false })

export default mongoose.model('size', sizeSchema)