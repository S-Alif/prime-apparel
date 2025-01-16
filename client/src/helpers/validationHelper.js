
// email validation
export const validateMail = (email) => {
    const regex = /^[\w.-]+@(gmail\.com|yahoo\.com|hotmail\.com)$/i
    return regex.test(email)
}

// password validation
export const validatePassword = (password) => {
    if(password.length < 8){
        return alert('Password must be at least 8 characters')
    }

    const hasLetter = /[a-zA-Z]/.test(password)
    if(!hasLetter){
        return alert('Password must contain at least one letter')
    }

    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password)
    if(!hasSymbol){
        return alert('Password must contain at least one special character')
    }

    return true
}