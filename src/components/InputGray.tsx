import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    name: string,
    type: string,
    placeholder: string,
    className?: string,
    required:boolean
}

export const InputGray = ({name, type, placeholder, className="w-full rounded-full bg-gray-200 px-6 py-4 text-gray-700 outline-none transition-all focus:ring-2 focus:ring-[#6211f1]/50", required}: InputProps) => {
    return (
        <input
            name={name}
            type={type}
            placeholder={placeholder}
            className={className}
            required={required}
        />
    );
}