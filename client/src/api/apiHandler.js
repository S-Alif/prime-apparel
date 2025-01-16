import { failToast } from "@/helpers/toasts"
import apiCaller from "./apiConfig"

const apiHandler = async (api, method="GET", data = {}) => {
    try {
        const options = {
            method: method,
            url: api
        }
        if(Object.keys(data).length > 0){
            options.data = data
        }

        let result = await apiCaller(options)

        return result.data
    } catch (error) {
        if(error?.response?.data){
            failToast(error.response.data.data)
        }
        return false
    }
}

export default apiHandler