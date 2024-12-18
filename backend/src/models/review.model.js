import mongoose from "mongoose"

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "user",
    },
    product: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "product",
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
    },
    comment: {
        type: String,
        required: true,
        minlength: 20,
        maxlength: 300,
        trim: true
    },
    type: {
        type: String,
        required: true,
        enum: ["product", "site"]
    }
}, { timestamps: true, versionKey: false })

export default mongoose.model("review", reviewSchema)