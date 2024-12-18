import express from "express"
import cors from 'cors'
import cookieParser from "cookie-parser"
import helmet from 'helmet'
import hpp from 'hpp'
import ExpressMongoSanitize from "express-mongo-sanitize"

// routes
import mainRoutes from './src/routes/main.route.js'


const app = express()

app.use(express.json({ limit: "6mb" }))
app.use(express.urlencoded({ extended: true, limit: "6mb" }))

// security

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentils: true
}))
app.use(helmet())
app.use(hpp())
app.use(ExpressMongoSanitize())
app.use(cookieParser())


// add routes
app.use('/api/v1/', mainRoutes)

// global error handling middleware

export {app}