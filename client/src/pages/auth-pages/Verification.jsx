import apiHandler from "@/api/apiHandler"
import AuthPagesLayout from "@/components/AuthPagesLayout"
import { Button } from "@/components/ui/button"
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp"
import { patchMethod, postMethod, publicRoutes } from "@/constants/apiConstants"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router"

const Verification = () => {

    const [otp, setOtp] = useState("")
    const [countdown, setCountdown] = useState(100)
    const [isDisabled, setIsDisabled] = useState(true)

    // get the user email from state
    const location = useLocation()
    const userEmail = location.state?.email
    const nextDestination = location.state?.to
    
    const navigate = useNavigate()

    // checking if the email is there
    useEffect(() => {
        if (!userEmail) {
            navigate(-1)
        }
    }, [])

    // email resent countdown
    useEffect(() => {
        if (countdown > 0) {
            const timer = setInterval(() => {
                setCountdown(prev => prev - 1)
            }, 1000)
            return () => clearInterval(timer)
        } else {
            setIsDisabled(false)
        }
    }, [countdown])

    // verify the code
    const formSubmit = async () => {
        let result = await apiHandler(publicRoutes.verifyOtp, patchMethod, {
            email: userEmail,
            otpCode: otp,
            type: 10
        })
        if(!result) return alert("Could not verify OTP")

        if(nextDestination) return navigate(nextDestination, { state: {email: userEmail} })
        navigate("/login")
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

            {/* resend code */}
            <div className="flex mt-10 items-center">
                <p className="text-[17px]">Didn't receive the code ?</p>
                <Button
                    type="submit"
                    size={"lg"}
                    variant={"link"}
                    className="text-[17px] !px-2"
                    disabled={isDisabled}
                    onClick={async () => {
                        let sendOtp = await apiHandler(publicRoutes.sendOtp, postMethod, { email: userEmail })
                        if (!sendOtp) return alert("Failed to send OTP")
                        setOtp("")
                        setCountdown(100)
                        setIsDisabled(true)
                    }}
                >
                    Resend
                </Button>
                {isDisabled && <p className="text-[17px]">in {`(${countdown}s)`}</p>}
            </div>


        </AuthPagesLayout>
    )
}

export default Verification