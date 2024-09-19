import { HTMLInputTypeAttribute } from "react";
import { Input, InputProps } from "../ui/input";
import { Label } from "../ui/label";

export interface InputComponentProps extends InputProps {
    label?: string,
    type?: HTMLInputTypeAttribute,
    placeholder?: string,
    classNameContainer?: string,
    classNameInput?: string,
    classNameLabel?: string
}


export default function InputComponent(props: InputComponentProps) {
    const {label, type, placeholder, classNameContainer, classNameInput, classNameLabel, ...other} = props
    return (
        <div className={`grid w-full max-w-sm items-center gap-1.5 ${classNameContainer}`}>
        <Label className={classNameLabel} htmlFor="email">{label}</Label>
        <Input type={type} id="email" placeholder={placeholder} className={classNameInput} {...other} />
      </div>
    )
}