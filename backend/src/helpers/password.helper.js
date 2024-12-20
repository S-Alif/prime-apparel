import bcrypt from 'bcryptjs'

export const encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(password, salt)
    return hashedPass
}

export const checkEncryptedPassword = (password, encryptedPassword) => {
    try {
        const result = bcrypt.compare(password, encryptedPassword)
        return result
    } catch (error) {
        return false
    }
}