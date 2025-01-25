import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'user',
    },
    items: [{
        product: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'product',
        },
        size: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'size',
        },
        quantity: {
            type: Number,
            required: true,
        },
    }],
    totalAmount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled', 'returned'],
        default: 'pending',
        index: true
    },
    district: {
        type: String,
        required: true,
        trim: true,
        maxlength: 20,
    },
    phone: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 15,
    },
    orderInstructions: {
        type: String,
        maxlength: 300,
        trim: true
    },
    shippingAddress: {
        type: String,
        required: true,
        maxlength: 300,
        trim: true
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'success', 'failed'],
        default: 'pending',
    },
    paymentMethod: {
        type: String,
        enum: ['cash on delivery', 'online'],
        default: 'cash on delivery',
    }
}, {timestamps: true, versionKey: false})


export default mongoose.model('order', orderSchema)