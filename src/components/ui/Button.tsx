import { Icon } from "./Icon";
import { AllIcons } from "./Icon";

type ButtonProps = {
    text:string;
    className:string;
    icon: keyof typeof AllIcons;
    onClick: () => void;
}

export const Button = ({ text, className, icon, onClick }: ButtonProps) => {
    return (
        <button onClick={onClick} className={className}><Icon name={icon} /> {text}</button>
    );
}