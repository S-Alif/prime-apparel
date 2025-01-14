import AuthPagesLayout from "@/components/AuthPagesLayout"
import ManualForm from "@/components/manual-form/ManualForm"
import ManualInput from "@/components/manual-form/ManualInput"
import { Button, buttonVariants } from "@/components/ui/button"
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp"
import { useState } from "react"

const Verification = () => {

    const [otp, setOtp] = useState("")

    const formSubmit = () => {
        console.log(otp)
    }

    return (
        <AuthPagesLayout
            pageImage="https://images.unsplash.com/photo-1596518998004-4c16ff8f97f6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            id="verification-page"
            pageTitle="Verify Account"
            belowTitleText="Enter the verification code sent to your email"
        >
            <p className="text-[18px] pb-4">Verification code</p>

            <InputOTP 
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e)}
            >
                <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                </InputOTPGroup>

                <InputOTPSeparator />

                <InputOTPGroup>
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                </InputOTPGroup>

                <InputOTPSeparator />

                <InputOTPGroup>
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                </InputOTPGroup>
            </InputOTP>

            <Button 
                type="submit"
                size={"lg"}
                variant={"default"}
                className="mt-10"
                onClick={formSubmit}
            >
                Verify Code
            </Button>


        </AuthPagesLayout>
    )
}

export default Verification