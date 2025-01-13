import ManualForm from "@/components/manual-form/ManualForm"
import ManualInput from "@/components/manual-form/ManualInput"

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
            <ManualInput 
                field="input"
                fieldType="email"
                fieldLabel="Email"
                name="email"
                placeholder="Enter email"
                defaultValue="mail@mail.com"
            />

            <ManualInput 
                field="input"
                fieldType="password"
                fieldLabel="Password"
                name="pass"
                placeholder="Enter pass"
            />

            <ManualInput 
                field="select"
                fieldLabel="Select an option"
                name="option"
                placeholder="Select option"
                selectValues={[
                    { _id: "1", name: 'Option 1' },
                    { _id: "2", name: 'Option 2' },
                    { _id:" 3", name: 'Option 3' },
                ]}
                defaultValue={"1"}
            />

        </ManualForm>
    </div>
  )
}

export default Login