import { forwardRef, useImperativeHandle, useRef, useState } from "react"
import { Button } from "../ui/button"
import React from "react"


const ManualForm = forwardRef(({
    formId = "form-section",
    buttonText = "submit",
    buttonSize = "default",
    buttonVariant = "default",
    onSubmit,
    defaultValues = {},
    children
}, ref) => {

    const formRef = useRef()
    const [values, setValues] = useState(defaultValues)

    useImperativeHandle(ref, () => ({
        resetForm: () => {
            setValues(defaultValues)
        }
    }))

    const handleChange = (name, value) => {
        setValues(prev => ({ ...prev, [name]: value }));
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(values)
    }


    return (
        <div id="form-section">
            <form id={formId} ref={formRef} onSubmit={handleSubmit}>

                {
                    React.Children.map(children, (child) => {
                        return React.cloneElement(child, {
                            ...child.props,
                            defaultValue: values[child.props.name],
                            onChange: handleChange,
                        })
                    })
                }

                <Button type="submit" size={buttonSize} variant={buttonVariant}>{buttonText}</Button>
            </form>
        </div>
    )
})

export default ManualForm