import mongoose from "mongoose"

const productVariationSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "product"
    },
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
}, { timestamps: true, versionKey: false })

export default mongoose.model("productVariation", productVariationSchema)