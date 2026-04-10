import { InputHTMLAttributes } from "react";
import { IMaskInput } from "react-imask";

interface InputWhiteProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    type: string;
    placeholder: string;
    className?: string;
    mask?: string;
    onAccept?: (value: string) => void;
}

export const InputWhite = ({
    name,
    type,
    placeholder,
    className = "w-full rounded-full bg-white px-6 py-4 text-gray-700 outline-none transition-all focus:ring-2 focus:ring-[#6211f1]/50",
    mask,
    onAccept,
    ...props
}: InputWhiteProps) => {
    return (
        <IMaskInput
            name={name}
            type={type}
            placeholder={placeholder}
            className={className}
            onAccept={onAccept}
            {...(mask ? { mask } : {})}
            {...(props as object)}
        />
    );
};