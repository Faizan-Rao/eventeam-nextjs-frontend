"use client";
import React, { useState, useDeferredValue } from "react";
import autoConfigSteps from "@/configs/autoConfigs";
import clsx from "clsx";
import { ChevronLeft } from "lucide-react";
const AutoConfigForm = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const deferStep = useDeferredValue(currentStep);
  const handleStepInc = (e : React.MouseEvent) => {
    e.preventDefault()
    if (deferStep < autoConfigSteps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleStepDec = (e : React.MouseEvent) => {
    e.preventDefault()
    if (deferStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };
  return (
    <div className="flex gap-5  container p-0">
      <div className="bg-[white] justify-center min-w-[300px] flex flex-col gap-4 max-w-[45%] w-[35%] min-h-[400px] rounded-md container">
        {autoConfigSteps.map((el, index) => (
          <div className="inline-flex items-center text-nowrap    gap-4" key={el.title}>
            <span
              className={clsx(
                "rounded-full border-[2px] p-1  text-[#4a4a4a] mix-blend-multiply",
                currentStep > index && "bg-[#7655FA]   text-white",
                currentStep < index && "  border-[#4a4a4a] ",
                currentStep === index && "text-[#7655FA] border-[#7655FA]"
              )}
            >
              <el.icon size={10} absoluteStrokeWidth={true} />
            </span>
            <span className="flex flex-col ">
              <p
                className={clsx(
                  "flex-1 text-[#4a4a4a] font-semibold",
                  currentStep === index && "text-[#7655FA] border-[#7655FA]"
                )}
              >
                {el.title}
              </p>
              <p className="flex-1 text-[#4a4a4a] text-sm">{el.description}</p>
            </span>
          </div>
        ))}
      </div>
      <form className="bg-[white] container">
        <span className="flex gap-4 justify-end items-center">
          <button onClick={handleStepDec} className="flex items-center gap-2 ">
            <ChevronLeft size={15} />
            <span>Previous</span>
          </button>
          {currentStep + 1 !== autoConfigSteps.length && (
            <button
              onClick={handleStepInc}
              className="bg-[#7655FA] text-white px-4 py-2 rounded-full"
            >
              Continue
            </button>
          )}
          {currentStep + 1 === autoConfigSteps.length && (
            <button
              onClick={handleStepInc}
              className="bg-[#7655FA] text-white px-4 py-2 rounded-full"
            >
              Submit
            </button>
          )}
        </span>
      </form>
    </div>
  );
};

export default AutoConfigForm;
