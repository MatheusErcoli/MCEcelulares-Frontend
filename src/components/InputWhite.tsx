import { InputHTMLAttributes } from "react";

interface InputWhiteProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string,
    type: string,
    placeholder: string,
    className?: string
}

export const InputWhite = ({
    name,
    type,
    placeholder,
    className = "w-full rounded-full bg-white px-6 py-4 text-gray-700 outline-none transition-all focus:ring-2 focus:ring-[#6211f1]/50",
    ...props
}: InputWhiteProps) => {
    return (
        <input
            name={name}
            type={type}
            placeholder={placeholder}
            className={className}
            {...props}
        />
    );
}