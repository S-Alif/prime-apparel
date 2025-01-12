import ManualForm from "@/components/ManualForm"
import { Input } from "@/components/ui/input"

const Login = () => {

  const formSubmit = (e) => {
    console.log(e)
  } 

  return (
    <div>
        <ManualForm
            formId="login-form"
            buttonText="Login"
            buttonSize="lg"
            onSubmit={formSubmit}
        >
            <Input type="Email" name="email" placeholder="Enter email" />

        </ManualForm>
    </div>
  )
}

export default Login