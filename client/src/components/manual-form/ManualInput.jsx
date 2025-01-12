import { Input } from "../ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select"
import { useState } from "react"

// generate an input field
const GenerateInputField = ({
    fieldType,
    fieldLabel,
    name,
    defaultValue,
    placeholder
}) => {
    const [value, setValue] = useState(defaultValue)
    return (
        <div>
            <label htmlFor={`${name}-field`}>{fieldLabel}</label>
            <Input
                type={fieldType}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={(e) => setValue(e.target.value)}
                id={`${name}-field`}
            />
        </div>
    )
}

// generate a select field
const GenerateSelectField = ({ 
    name,
    fieldLabel,
    selectValues,
    defaultSelectValue,
    placeholder
}) => {

    const [value, setValue] = useState(defaultSelectValue)

    return (
        <div>
            <label htmlFor={`${name}-field`}>{fieldLabel}</label>
            <Select 
                id={`${name}-field`}
                value={value}
                onValueChange={(e) => setValue(e)}
            >
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {
                            selectValues.map((e, index) => (
                                <SelectItem key={index} value={e?._id}>{e?.name}</SelectItem>
                            ))
                        }
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}

// default exported manual input component
const ManualInput = ({
    field = "input",
    fieldType = "text",
    fieldLabel = "Field label",
    name = "giveAName",
    placeholder = "A placeholder",
    selectValues = [],
    defaultValue = ""
}) => {

    // return input fields
    if (field == "input") {
        return <GenerateInputField
            fieldLabel={fieldLabel}
            fieldType={fieldType}
            name={name}
            placeholder={placeholder}
            defaultValue={defaultValue}
        />
    }

    // return select fields
    if (field == "select") {
        return <GenerateSelectField
            fieldLabel={fieldLabel}
            selectValues={selectValues}
            defaultSelectValue={defaultValue}
            name={name}
            placeholder={placeholder}
        />
    }
}

export default ManualInput