import { toast } from "sonner"

export const successToast = (message) => {
    toast.success(message, {
        className: "text-[16px]"
    })
}

export const failToast = (message) => {
    toast.error(message, {
        className: "text-[16px]"
    })
}

export const infoToast = (message) => {
    toast.info(message, {
        className: "text-[16px]"
    })
}