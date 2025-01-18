import apiHandler from "@/api/apiHandler"
import AuthPagesLayout from "@/components/layouts/AuthPagesLayout"
import ManualForm from "@/components/manual-form/ManualForm"
import ManualInput from "@/components/manual-form/ManualInput"
import { patchMethod, publicRoutes } from "@/constants/apiConstants"
import { successToast } from "@/helpers/toasts"
import { validatePassword } from "@/helpers/validationHelper"
import { format } from "date-fns"
import { useEffect, useRef } from "react"
import { useLocation, useNavigate } from "react-router"


const CreateNewPass = () => {

    const formRef = useRef()

    const location = useLocation()
    const userEmail = location.state?.email

    const navigate = useNavigate()

    // checking if the email is there
    useEffect(() => {
        if (!userEmail) {
            navigate(-1)
        }
    }, [])

    
    // update the password
    const formSubmit = async (e) => {
        if(e.newPass !== e.confirmPass) return alert("Pasword don't match")
        if(!validatePassword(e.newPass)) return
        if(!validatePassword(e.confirmPass)) return

        e.email = userEmail
        e.date = format(new Date(), 'MMMM dd, yyyy hh:mm a')
        let result = await apiHandler(publicRoutes.updatePass, patchMethod, e)
        if(!result) return

        successToast(result?.data)
        navigate("/login")

        formRef.current.resetForm()
    }


    return (
        <AuthPagesLayout
            pageImage="https://images.unsplash.com/photo-1492447273231-0f8fecec1e3a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            id="create-new-pass-page"
            pageTitle="Create New Password"
            belowTitleText="Create your new password. Include symbols and numbers to strengthen your password"
        >
            <ManualForm
                formId="create-new-pass-form"
                buttonText="Reset Password"
                buttonSize="lg"
                onSubmit={formSubmit}
                ref={formRef}
                defaultValues={{
                    newPass: "",
                    confirmPass: ""
                }}
            >
                <ManualInput 
                    field="input"
                    fieldType="password"
                    fieldLabel="New password"
                    name="newPass"
                    placeholder="Your new password"
                />

                <ManualInput
                    field="input"
                    fieldType="password"
                    fieldLabel="Confirm new password"
                    name="confirmPass"
                    placeholder="Confirm your new password"
                />

            </ManualForm>

        </AuthPagesLayout>
    )
}

export default CreateNewPass