export const baseUrl = "http://127.0.0.1:5200"

const publicEndpoint = "public"
const adminEndpoint = "admin"
const userEndpoint = "user"

export const getMethod = "GET"
export const postMethod = "POST"
export const patchMethod = "PATCH"
export const deleteMethod = "DELETE"



export const publicRoutes = {
    login: `${baseUrl}/api/v1/${publicEndpoint}/login`,
    signup: `${baseUrl}/api/v1/${publicEndpoint}/signup`,
    sendOtp: `${baseUrl}/api/v1/${publicEndpoint}/send-otp`,
    verifyOtp: `${baseUrl}/api/v1/${publicEndpoint}/verify`,
    updatePass: `${baseUrl}/api/v1/${publicEndpoint}/update-pass`,
}

export const adminRoutes = {
    // category
    category: `${baseUrl}/api/v1/${adminEndpoint}/category`,
    // colors
    colors: `${baseUrl}/api/v1/${adminEndpoint}/colors`,
    // sizes
    sizes: `${baseUrl}/api/v1/${adminEndpoint}/size`,
}