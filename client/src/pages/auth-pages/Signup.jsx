import AuthPagesLayout from "@/components/AuthPagesLayout"
import ManualForm from "@/components/manual-form/ManualForm"
import ManualInput from "@/components/manual-form/ManualInput"
import { buttonVariants } from "@/components/ui/button"
import { useRef } from "react"
import { NavLink } from "react-router"

const Signup = () => {

    const formRef = useRef()

    const formSubmit = (e) => {
        console.log(e)
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