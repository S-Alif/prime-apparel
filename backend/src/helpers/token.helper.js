import jwt from 'jsonwebtoken'

// access token
export const issueToken = (data) => {
    const token = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '6h' })
    return token
}

// verify access token
export const verifyToken = async (token) => {
    try {
        const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, result) => {
            if (err) return null
            return result
        })
        return decoded
    } catch (error) {
        return null
    }
}

// refresh token
export const issueRefreshToken = (data) => {
    const token = jwt.sign(data, process.env.TOKEN_SECRET, { expiresIn: '7d' })
    return token
}

// verify refresh token
export const verifyRefreshToken = async (token) => {
    try {
        const decoded = await jwt.verify(token, process.env.TOKEN_SECRET, (err, result) => {
            if (err) return null
            return result
        })
        return decoded
    } catch (error) {
        return null
    }
}