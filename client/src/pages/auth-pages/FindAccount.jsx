import AuthPagesLayout from "@/components/AuthPagesLayout"
import ManualForm from "@/components/manual-form/ManualForm"
import ManualInput from "@/components/manual-form/ManualInput"
import { buttonVariants } from "@/components/ui/button"
import { useRef } from "react"
import { NavLink } from "react-router"


const FindAccount = () => {

    const formRef = useRef()

    const formSubmit = (e) => {
        console.log(e)
        formRef.current.resetForm()
    }

    return (
        <AuthPagesLayout
            pageImage="https://images.unsplash.com/photo-1667222324601-cd856d36a99a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            id="find-account-page"
            pageTitle="Reset Your Password"
            belowTitleText="Enter your email and we'll send you a link to reset your password"
        >
            <ManualForm
                formId="find-account-form"
                buttonText="Send reset link"
                buttonSize="lg"
                onSubmit={formSubmit}
                ref={formRef}
            >
                <ManualInput
                    field="input"
                    fieldType="email"
                    fieldLabel="Email address"
                    name="email"
                    placeholder="Enter your email"
                />
            </ManualForm>

            <p className="!text-[17px] pt-10">
                Back to 
                <NavLink to="/login" className={`!pl-2 !text-[17px] ${buttonVariants({ variant: "link" })}`}>Log in</NavLink>
            </p>

        </AuthPagesLayout>
    )
}

export default FindAccount