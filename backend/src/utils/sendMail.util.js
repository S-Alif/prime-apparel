// get packages
import nodemailer from 'nodemailer'

const sendEmail = async (mailto, mailText, mailSubject) => {
    try {
        let transporter = nodemailer.createTransport({
            host: `${process.env.MAIL_HOST}`,
            port: process.env.MAIL_PORT,
            secure: false,
            auth: {
                user: `${process.env.MAIL_URL}`,
                pass: `${process.env.MAIL_PASS}`
            },
            tls: {
                rejectUnauthorized: false
            }
        })

        let mailOption = {
            from: `Prime Apparel<${process.env.MAIL_URL}>`,
            to: mailto,
            subject: mailSubject,
            text: mailText
        }

        return await transporter.sendMail(mailOption)
    } catch (error) {
        return false
    }
}

export default sendEmail