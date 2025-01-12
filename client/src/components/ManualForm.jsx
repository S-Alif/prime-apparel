import { Button } from "./ui/button"


const ManualForm = ({ 
    formId = "form-section",
    buttonText = "submit",
    buttonSize = "default",
    buttonVariant = "default",
    onSubmit,
    children 
}) => {

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(e.target)
        const form = new FormData(e.target)
        const data = Object.fromEntries(form)
        onSubmit(data)
    }


  return (
    <div id="form-section">
        <form id={formId} onSubmit={handleSubmit}>
            {children}

            <Button type="submit" size={buttonSize} variant={buttonVariant}>{buttonText}</Button>
        </form>
    </div>
  )
}

export default ManualForm