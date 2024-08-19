import autoConfigSteps from "@/configs/autoConfigs";
import { ChevronLeft } from "lucide-react";

export const FormStepperButtons = ({
    currentStep,
    handleStepInc,
    handleStepDec,
  }: {
    currentStep: number;
    handleStepInc: (e: React.MouseEvent) => void;
    handleStepDec: (e: React.MouseEvent) => void;
  }) => {
    return (
      <span className="flex gap-4 my-4 justify-end items-center">
        <button onClick={handleStepDec} className="flex items-center gap-2 ">
          <ChevronLeft size={15} />
          <span>Previous</span>
        </button>
        {currentStep + 1 !== autoConfigSteps.length && (
          <button
            onClick={handleStepInc}
            className="bg-[#7655FA] text-white px-7 py-2 rounded-full"
          >
            Continue
          </button>
        )}
        {currentStep + 1 === autoConfigSteps.length && (
          <button
            type="submit"
            className="bg-[#7655FA] text-white px-7 py-2 rounded-full"
          >
            Submit
          </button>
        )}
      </span>
    );
  };