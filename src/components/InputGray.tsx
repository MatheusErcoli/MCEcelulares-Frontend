import { InputHTMLAttributes } from "react";

interface InputGrayProps extends InputHTMLAttributes<HTMLInputElement>{
    name: string,
    type: string,
    placeholder: string,
    className?: string,
}

export const InputGray = ({
    name, 
    type, 
    placeholder, 
    className="w-full rounded-full bg-gray-200 px-6 py-4 text-gray-700 outline-none transition-all focus:ring-2 focus:ring-[#6211f1]/50",
    ...props}: InputGrayProps) => {
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