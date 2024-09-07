import React from "react";
interface IAdvanceFormOption {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}
const AdvanceFormOption: React.FC<IAdvanceFormOption> = ({
  title,
  description,
  icon,
  children,
}) => {
  return (
    <div className="flex justify-between items-center rounded-md overflow-hidden border-[2px]  mx-4">
      <div className="flex gap-4">
        <span className="sm:hidden md:flex place-items-center  p-4 aspect-square overflow-hidden object-cover text-[#7655fa] bg-[#7655FA26]">
          {icon && icon}
        </span>
        <span className="flex flex-col p-4 gap-1">
          <h1 className="font-semibold">{title}</h1>
          <p className="text-sm">{description}</p>
        </span>
      </div>
      <span className="mx-4">

      {children}
      </span>
    </div>
  );
};

export default AdvanceFormOption;
