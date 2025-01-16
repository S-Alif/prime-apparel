
// email validation
export const validateMail = (email) => {
    const regex = /^[\w.-]+@(gmail\.com|yahoo\.com|hotmail\.com)$/i
    return regex.test(email)
}

// password validation
export const validatePassword = (password) => {
    if(password.length < 8){
        alert('Password must be at least 8 characters')
        return false
    }

    const hasLetter = /[a-zA-Z]/.test(password)
    if(!hasLetter){
        alert('Password must contain at least one letter')
        return false
    }

    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password)
    if(!hasSymbol){
        alert('Password must contain at least one special character')
        return false
    }

    return true
}