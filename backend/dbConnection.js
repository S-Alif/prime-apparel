import mongoose from "mongoose";

const DB_URL = process.env.DB_URL
const DB_NAME = process.env.DB_NAME
const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS

const connectDB = async () => {
    try {
        const result = await mongoose.connect(
            `${DB_URL}/${DB_NAME}`,
            {
                autoIndex: true
            }
        )
        console.log("MongoDB Connected...\nhost : ", result.connection.host)
    } catch (error) {
        console.error(`Error connecting to MongoDB: \n${error}`)
    }
}

export default connectDB