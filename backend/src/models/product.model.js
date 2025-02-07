import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    detail: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 100
    },
    category: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "category"
    },
    color: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "color"
    },
    totalRating: {
        type: Number,
        default: 0,
        min: 0
    },
    reviewCount: {
        type: Number,
        default: 0,
        min: 0
    },
    published: {
        type: Boolean,
        default: false
    },
    discount: {
        type: Number,
        default: 0,
        min: 0
    },
    featured: {
        type: Boolean,
        default: false
    },
    setAsNewArrival: {
        type: Boolean,
        default: false,
    },
    unitsSold:{
        type: Number,
        default: 0,
        min: 0
    }
}, { timestamps: true, versionKey: false })

export default mongoose.model("product", productSchema)