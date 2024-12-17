import dotenv from 'dotenv'
import connectDB from './dbConnection.js'
import { app } from './app.js'

dotenv.config({path: "./env"})

const PORT = process.env.PORT || 5200

connectDB()
.then(() => {
    app.listen(PORT, () => {
        console.log('Server running on port ' + PORT)
    })
})
.catch(error => {
    console.log("Mongodb connection failed !! ", error)
})
