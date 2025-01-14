import AuthPagesLayout from "@/components/AuthPagesLayout"
import ManualForm from "@/components/manual-form/ManualForm"
import ManualInput from "@/components/manual-form/ManualInput"
import { buttonVariants } from "@/components/ui/button"
import { useRef } from "react"
import { NavLink } from "react-router"

const Login = () => {

    const formRef = useRef()

    const formSubmit = (e) => {
        console.log(e)
        formRef.current.resetForm()
    }

    return (
        <AuthPagesLayout
            pageImage="https://images.unsplash.com/photo-1617039346892-d72191157374?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            id="login-page"
            pageTitle="Login"
            belowTitleText="Please sign-in to your account"
        >
            <ManualForm
                formId="login-form"
                buttonText="Login"
                buttonSize="lg"
                onSubmit={formSubmit}
                ref={formRef}
                defaultValues={{
                    email: "",
                    pass: ""
                }}
            >
                <ManualInput
                    field="input"
                    fieldType="email"
                    fieldLabel="Email address"
                    name="email"
                    placeholder="Enter email"
                />

                <ManualInput
                    field="input"
                    fieldType="password"
                    fieldLabel="Your Password"
                    name="pass"
                    placeholder="Enter password"
                />

            </ManualForm>

            <p className="!text-[17px] pt-10">
                Don't have an account ?
                <NavLink className={`!pl-2 text-[17px] ${buttonVariants({ variant: "link" })}`}>Sign in</NavLink>
            </p>
        </AuthPagesLayout>
    )
}

export default Login