import apiHandler from "@/api/apiHandler"
import AuthPagesLayout from "@/components/layouts/AuthPagesLayout"
import ManualForm from "@/components/manual-form/ManualForm"
import ManualInput from "@/components/manual-form/ManualInput"
import { buttonVariants } from "@/components/ui/button"
import { postMethod, publicRoutes } from "@/constants/apiConstants"
import { successToast } from "@/helpers/toasts"
import { validateMail, validatePassword } from "@/helpers/validationHelper"
import { useRef } from "react"
import { NavLink, useLocation, useNavigate } from "react-router"

const Signup = () => {

    const formRef = useRef()
    const navigate = useNavigate()
    const location = useLocation()
    const isSecuredPath = location.pathname == "/secured"

    const formSubmit = async (e) => {

        // validation
        if (!validateMail(e.email)) return alert("Invalid email")
        if (e.fName.trim() == "" || e.fName.trim().length < 2) return alert("First name must be at least 2 characters")
        if (e.lName.trim() == "" || e.lName.trim().length < 2) return alert("Last name must be at least 2 characters")
        if (!validatePassword(e.pass)) return
        
        // change the role for admin in secured admin signup path
        if(isSecuredPath) e.role = 1999

        // signup
        let result = await apiHandler(publicRoutes.signup, postMethod, e)
        if(!result) return alert("Signup failed")

        successToast("Signup successful")

        // send the otp
        let sendOtp = await apiHandler(publicRoutes.sendOtp, postMethod, {email: e.email})
        if(!sendOtp) return

        successToast(sendOtp.data)

        // navigate to Verification
        navigate("/verification", {state: {email: e.email}})

        formRef.current.resetForm()
    }
    
    return (
        <AuthPagesLayout
            pageImage="https://images.unsplash.com/photo-1620511469298-7c119cc6982c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            id="signup-page"
            pageTitle="Sign up"
            belowTitleText="Sign up to buy our products"
        >
            <ManualForm
                formId="signup-form"
                buttonText="Signup"
                buttonSize="lg"
                onSubmit={formSubmit}
                ref={formRef}
                defaultValues={{
                    fName: "",
                    lName: "",
                    email: "",
                    pass: ""
                }}
            >
                <ManualInput
                    field="input"
                    fieldType="text"
                    fieldLabel="First name"
                    name="fName"
                    placeholder="Your first name"
                />

                <ManualInput
                    field="input"
                    fieldType="text"
                    fieldLabel="Last name"
                    name="lName"
                    placeholder="Your last name"
                />

                <ManualInput
                    field="input"
                    fieldType="email"
                    fieldLabel="Your email"
                    name="email"
                    placeholder="Enter your email"
                />

                <ManualInput
                    field="input"
                    fieldType="password"
                    fieldLabel="Your password"
                    name="pass"
                    placeholder="Enter your password"
                />
            </ManualForm>

            <p className="!text-[17px] pt-10">
                Already have an account ?
                <NavLink to="/login" className={`!pl-2 !text-[17px] ${buttonVariants({ variant: "link" })}`}>Log in</NavLink>
            </p>

        </AuthPagesLayout>
    )
}

export default Signup