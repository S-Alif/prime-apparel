import {apiError} from '../helpers/apiError.helper.js'
import { verifyToken } from '../helpers/token.helper.js'

const authMiddleware = (allowedRoles = []) => {
    return async (req, res, next) => {
        try {
            let token = req.headers?.token
            if (!token) token = req.cookies?.token

            if (!token) throw new apiError(401, "Token not found")

            let decoded = await verifyToken(token)
            if (!decoded) throw new apiError(403, "Access forbidden")

            if (allowedRoles.length > 0 && !allowedRoles.includes(decoded.role)) {
                throw new apiError(403, "Insufficient permissions")
            }

            req.headers.id = decoded?.id
            req.headers.email = decoded?.email
            req.headers.role = decoded?.role

            next()

        } catch (error) {
            next(error)
        }
    }
}

export default authMiddleware