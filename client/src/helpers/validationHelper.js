import { failToast } from "./toasts"

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


// product validation
export const validateProduct = (product, updating) => {
    if(!product?.name || product?.name.trim() == "" || product?.name.trim().length < 10){
        failToast("Product must be at least 10 characters")
        return false
    }
    if(isNaN(product?.price.trim()) || parseInt(product?.price.trim()) < 10){
        failToast("Price must be a integer and at least 10")
        return false
    }
    if(product?.category.trim() == "" || product?.category.trim().length != 24){
        failToast("Category must be selected")
        return false
    }
    if(product?.color.trim() == "" || product?.color.trim().length != 24){
        failToast("Category must be selected")
        return false
    }

    // for rich text parsing
    const parser = new DOMParser()
    const parsedDetail = parser.parseFromString(product?.detail, "text/html")
    const detail = parsedDetail.body.textContent.trim()

    if(detail == "" || detail.length < 50){
        failToast("Product detail must be at least 50 characters")
        return false
    }

    // when updating products
    if(updating){
        const options = [1, 0]
        if(isNaN(product?.published.trim()) || !options.includes(parseInt(product.published.trim()))){
            console.log(product?.published)
            failToast("Published status must be either Yes or No")
            return false
        }
        if (isNaN(product?.featured.trim()) || !options.includes(parseInt(product.featured.trim()))){
            failToast("Featured status must be either Yes or No")
            return false
        }
        if (isNaN(product?.discount.trim()) || product?.discount.trim().length > 3 || parseInt(product?.discount) < 0 || parseInt(product?.discount) > 100 ) {
            failToast("Discount percentage must be an integer between 0 and 100")
            return false
        }
    }

    return true
}