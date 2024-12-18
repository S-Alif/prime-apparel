import mongoose from "mongoose"

const paymentConfigSchema = new mongoose.Schema({
    storeId: {
        type: String,
        required: true,
        trim: true
    },
    storePass: {
        type: String,
        required: true,
        trim: true
    },
    currency: {
        type: String,
        required: true,
        trim: true,
        default: "BDT"
    },
    successUrl: {
        type: String,
        required: true,
        trim: true
    },
    failUrl: {
        type: String,
        required: true,
        trim: true
    },
    cancelUrl: {
        type: String,
        required: true,
        trim: true
    },
    ipnUrl: {
        type: String,
        required: true,
        trim: true
    },
    initUrl: {
        type: String,
        required: true,
        trim: true
    }

}, {timestamps: true, versionKey: false})

export default mongoose.model("paymentConfig", paymentConfigSchema)