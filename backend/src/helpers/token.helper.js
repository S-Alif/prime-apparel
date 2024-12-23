import jwt from 'jsonwebtoken'

export const issueToken = (data) => {
    const token = jwt.sign(data, process.env.TOKEN_SECRET, { expiresIn: '6h' })
    return token
}

export const verifyToken = async (token) => {
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