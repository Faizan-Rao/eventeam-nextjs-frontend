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
    <span className="flex gap-6 my-6 justify-end items-center">
      <button onClick={handleStepDec} className="flex justify-between select-none items-center gap-2 ">
        <ChevronLeft size={15} />
        <span>Previous</span>
      </button>
      {currentStep + 1 !== autoConfigSteps.length && (
        <button
          onClick={handleStepInc}
          className="bg-[#7655FA] text-white mx-4 px-7 py-2 rounded-full"
        >
          Continue
        </button>
      )}
      {currentStep + 1 === autoConfigSteps.length && (
        <button
          type="submit"
          className="bg-[#7655FA] mx-4 select-none text-white px-7 py-2 rounded-full"
        >
          Submit
        </button>
      )}
    </span>
  );
};
