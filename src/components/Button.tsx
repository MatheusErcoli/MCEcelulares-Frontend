import { AllIcons, Icon } from "./Icon";


type ButtonProps = {
    text: string;
    className?: string;
    icon?: keyof typeof AllIcons; 
    onClick?: () => void;
}

export const Button = ({ 
  text, 
  className = "w-full text-lg flex items-center justify-center gap-2 bg-gradient-to-r from-[#5714d7] to-[#7929c8] font-bold text-white p-4 rounded-full hover:opacity-90 transition-opacity", 
  icon, 
  onClick 
}: ButtonProps) => {
    return (
        <button onClick={onClick} className={className}>
            {icon && <Icon name={icon} />} 
            {text}
        </button>
    );
}