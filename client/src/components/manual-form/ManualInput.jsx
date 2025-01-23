import RichTextEditor from "../RichTextEditor/Index"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select"
import { useEffect, useState } from "react"

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
        <div className="mb-4 lg:mb-8">
            <p className="text-[18px] pb-3 capitalize">{fieldLabel}</p>
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
    useEffect(() => {setValue(defaultValue)}, [defaultValue])

    return (
        <div className="mb-4 lg:mb-8">
            <p className="text-[18px] pb-3 capitalize">{fieldLabel}</p>
            <Select 
                id={`${name}-field`}
                value={value}
                onValueChange={(e) => {
                    onChange(name, e)
                    setValue(e)
                }}
                name={name}
            >
                <SelectTrigger className="w-full h-12">
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {
                            selectValues.map((e, index) => (
                                <SelectItem className="hover:cursor-pointer hover:!bg-primary hover:!text-white" key={index} value={e?._id}>{e?.name}</SelectItem>
                            ))
                        }
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}

// rich text editor
const GenerateRichTextEditor = ({
    fieldLabel,
    name,
    defaultValue,
    onChange
}) => {
    return(
        <div className="mb-8">
            <p className="text-[18px] pb-3 capitalize">{fieldLabel}</p>
            <RichTextEditor 
                defaultValue={defaultValue}
                onChange={(e) => onChange(name, e)}
            />
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
    selectValues = [],
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

    // return rich text editor
    if(field == "richText"){
        return <GenerateRichTextEditor
            fieldLabel={fieldLabel}
            name={name}
            defaultValue={defaultValue}
            onChange={onChange}
        />
    }
}

export default ManualInput