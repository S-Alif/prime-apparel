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
    category: `${baseUrl}/api/v1/${publicEndpoint}/category`,
    colors: `${baseUrl}/api/v1/${publicEndpoint}/colors`,
    sizes: `${baseUrl}/api/v1/${publicEndpoint}/sizes`,
    products: `${baseUrl}/api/v1/${publicEndpoint}/products`,
    productVariation: `${baseUrl}/api/v1/${publicEndpoint}/products/variation`,
    productImages: `${baseUrl}/api/v1/${publicEndpoint}/products/images`,
    reviews: `${baseUrl}/api/v1/${publicEndpoint}/reviews`,
}

export const userRoutes = {
    profile: "",
    review: `${baseUrl}/api/v1/${userEndpoint}/review`
}

export const adminRoutes = {
    // category
    category: `${baseUrl}/api/v1/${adminEndpoint}/category`,
    // colors
    colors: `${baseUrl}/api/v1/${adminEndpoint}/colors`,
    // sizes
    sizes: `${baseUrl}/api/v1/${adminEndpoint}/size`,
    // products
    products: `${baseUrl}/api/v1/${adminEndpoint}/product`,
    productVariation: `${baseUrl}/api/v1/${adminEndpoint}/product/variation`,
    productImage: `${baseUrl}/api/v1/${adminEndpoint}/product/image`,
}