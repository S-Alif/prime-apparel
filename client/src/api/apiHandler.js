import { failToast, infoToast } from "@/helpers/toasts"
import apiCaller from "./apiConfig"

const apiHandler = async (api, method="GET", data = {}) => {
    try {
        const options = {
            method: method,
            url: api
        }
        
        if(data instanceof FormData){
            options.data = data
        }
        else if(Object.keys(data).length > 0){
            options.data = data
        }

        if(method == "PATCH" || method == "POST"){
            console.log(api)
            infoToast("please wait....")
        }
        if(method == "DELETE"){
            infoToast("Removing data.....please wait")
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