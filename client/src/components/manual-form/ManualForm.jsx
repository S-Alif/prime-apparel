import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react"
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

    useEffect(() => {
        setValues(defaultValues)
    }, [defaultValues])

    // handle input value changes
    const handleChange = (name, value) => {
        setValues(prev => ({ ...prev, [name]: value }))
    }

    // handle submit
    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(values)
    }

    // add other handlers to the input children
    const addHandlerToChildren = (children) => {
        return React.Children.map(children, (child) => {
            if(!React.isValidElement(child)) return child

            if(child.props?.children){
                return React.cloneElement(child, {
                    ...child.props,
                    children: addHandlerToChildren(child.props.children),
                })
            }

            return React.cloneElement(child, {
                ...child.props,
                ...(Object.keys(defaultValues).length > 0 && { defaultValue: values[child.props.name] }),
                onChange: handleChange,
            })
        })
    }


    return (
        <div id="form-section">
            <form id={formId} ref={formRef} onSubmit={handleSubmit}>

                {
                    addHandlerToChildren(children)
                }

                <Button type="submit" size={buttonSize} variant={buttonVariant}>{buttonText}</Button>
            </form>
        </div>
    )
})

export default ManualForm