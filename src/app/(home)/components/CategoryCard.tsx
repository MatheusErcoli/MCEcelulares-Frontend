import { AllIcons } from "@/src/components/ui/Icon";
import { Button } from "@/src/components/ui/Button";

type CategoryProps = {
    name:string;
    icon: keyof typeof AllIcons;
}

export const CategoryCard = ({ name, icon }: CategoryProps) => {

    return (
        <Button
            text={name}
            icon={icon}
            onClick={() => { }}
            className="flex gap-5 flex-col items-center justify-center w-32 h-40 bg-[#E5E7EB] rounded-[30px] shadow-sm hover:bg-gray-300 transition-colors text-gray-700 text-2xl"
        />
    );
}