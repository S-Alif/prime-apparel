import sendEmail from "../utils/sendMail.util.js"

const mailHelper = async (mailto, subject, text) => {
    try {
        const result = await sendEmail(mailto, text, subject)
        if(!result) return false
        return true
    } catch (error) {
        console.error("Error sending email:", error)
        return false
    }
}

export default mailHelper