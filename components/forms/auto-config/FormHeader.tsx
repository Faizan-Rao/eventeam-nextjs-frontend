export const FormHeader = ({
    title,
    currentStep,
    totalSteps,
  }: {
    title: string;
    currentStep: number;
    totalSteps: number;
  }) => {
    return (
      <div className="flex sm:flex-col-reverse md:flex-row justify-between items-center p-4 my-4">
        <h1 className="sm:text-xl md:text-3xl font-semibold text-[#4a4a4a]">{title}</h1>
  
        <span className="text-[#7655FA] sm:text-sm md:text-base font-semibold">
          Steps {currentStep} of {totalSteps}
        </span>
      </div>
    );
  };