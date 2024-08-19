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
      <div className="flex justify-between items-center p-4 my-4">
        <h1 className="text-3xl font-semibold text-[#4a4a4a]">{title}</h1>
  
        <span className="text-[#7655FA] font-semibold">
          Steps {currentStep} of {totalSteps}
        </span>
      </div>
    );
  };