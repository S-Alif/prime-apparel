import { Input } from "../ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select"
import { useState } from "react"

// generate an input field
const GenerateInputField = ({
    fieldType,
    fieldLabel,
    name,
    defaultValue,
    placeholder,
    onChange
}) => {
    return (
        <div className="mb-8">
            <p className="text-[18px] pb-3">{fieldLabel}</p>
            <Input
                type={fieldType}
                name={name}
                value={defaultValue || ""}
                placeholder={placeholder}
                onChange={(e) => onChange(name, e.target.value)}
                id={`${name}-field`}
                className="h-12 !text-[17px]"
            />
        </div>
    )
}

// generate a select field
const GenerateSelectField = ({ 
    name,
    fieldLabel,
    selectValues,
    defaultValue = "",
    placeholder,
    onChange
}) => {

    const [value, setValue] = useState(defaultValue)

    return (
        <div>
            <label htmlFor={`${name}-field`}>{fieldLabel}</label>
            <Select 
                id={`${name}-field`}
                value={defaultValue || ""}
                onValueChange={(e) => onChange(name, e)}
                name={name}
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
    defaultValue = "",
    onChange
}) => {

    // return input fields
    if (field == "input") {
        return <GenerateInputField
            fieldLabel={fieldLabel}
            fieldType={fieldType}
            name={name}
            placeholder={placeholder}
            defaultValue={defaultValue}
            onChange={onChange}
        />
    }

    // return select fields
    if (field == "select") {
        return <GenerateSelectField
            fieldLabel={fieldLabel}
            selectValues={selectValues}
            defaultValue={defaultValue}
            name={name}
            placeholder={placeholder}
            onChange={onChange}
        />
    }
}

export default ManualInput