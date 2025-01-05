import mongoose from "mongoose"

const productImageSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "product"
    },
    url: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true, versionKey: false })

export default mongoose.model("productImage", productImageSchema)