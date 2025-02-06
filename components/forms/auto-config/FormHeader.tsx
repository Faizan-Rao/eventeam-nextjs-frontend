import { useTranslation } from "react-i18next";

export const FormHeader = ({
    title,
    currentStep,
    totalSteps,
  }: {
    title: string;
    currentStep: number;
    totalSteps: number;
  }) => {
    const {t} = useTranslation(["translation"])
    return (
      <div className="flex sm:flex-col-reverse md:flex-row justify-between items-center py-4 my-4">
        <h1 className="sm:text-xl md:text-3xl font-semibold text-[#4a4a4a]">{title}</h1>
  
        <span className="text-[#7655FA] sm:text-sm md:text-base font-semibold">
          {t("Steps")} {currentStep} of {totalSteps}
        </span>
      </div>
    );
  };