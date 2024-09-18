import { Input, InputProps } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { HTMLInputTypeAttribute, ReactNode } from "react";

export interface InputComponentProps extends InputProps {
    icon?: string | ReactNode,
    type?: HTMLInputTypeAttribute,
    placeholder?: string,
    classNameContainer?: string,
    classNameInput?: string
}


export default function InputIconComponent(props: InputComponentProps) {
    const {icon, type, placeholder, classNameContainer, classNameInput, ...other} = props
    return (
        <div className={`w-full max-w-sm items-center flex gap-1.5 border-input-dark rounded-lg pl-2 ${classNameContainer}`}>
        {icon}
        <Input type={type} id="email" placeholder={placeholder} className={`focus-visible:ring-0 ${classNameInput}`} {...other} />
      </div>
    )
}