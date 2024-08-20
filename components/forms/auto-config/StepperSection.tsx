import autoConfigSteps from '@/configs/autoConfigs'
import clsx from 'clsx'
import React from 'react'


interface IStepperSection {
    currentStep : number,

}
const StepperSection : React.FC<IStepperSection> = ({
    currentStep
}) => {
  return (
    <div className="bg-[white] py-6 min-w-[300px] flex flex-col gap-4 max-w-[45%] w-[35%] min-h-[400px] rounded-md container">
    {autoConfigSteps.map((el, index) => (
      <div
        className="inline-flex items-center text-nowrap    gap-4"
        key={el.title}
      >
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
  )
}

export default StepperSection