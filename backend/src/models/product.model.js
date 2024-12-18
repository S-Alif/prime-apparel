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
    variations: [
        {
            size: {
                type: mongoose.Types.ObjectId,
                required: true,
                ref: "size"
            },
            color: {
                type: mongoose.Types.ObjectId,
                required: true,
                ref: "color"
            },
            stock: {
                type: Number,
                required: true,
                min: 1
            }
        }
    ],
    images: [
        {
            url: {
                type: String,
                required: true,
                trim: true
            },
            deletUrl: {
                type: String,
                required: true,
                trim: true
            }
        }
    ],
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
    currentRating: {
        type: Double,
        default: 0,
        min: 0,
        max: 5
    },
    published: {
        type: Boolean,
        required: true,
        default: false
    },
    featured: {
        type: Boolean,
        required: true,
        default: false
    }
}, { timestamps: true, versionKey: false })

export default mongoose.model("product", productSchema)