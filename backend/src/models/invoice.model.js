import mongoose from "mongoose"

const invoiceSchema = new mongoose.Schema({
    order: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "order"
    },
    user: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "user"
    },
    invoiceNumber: {
        type: String,
        required: true,
        unique: true
    },
    district: {
        type: String,
        required: true,
        maxlength: 20
    },
    billingAddress: {
        type: String,
        required: true,
        maxlength: 300
    },
    totalAmount: {
        type: Number,
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'success', 'failed'],
        default: 'pending',
    }

}, {timestamps: true, versionKey: false})