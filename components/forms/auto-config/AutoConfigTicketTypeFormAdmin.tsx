import { CircleX, Plus } from "lucide-react";
import { UseFormRegister, Control, useFieldArray } from "react-hook-form";

export const TicketTypes = ({
    register,
    control,
    errors,
  }: {
    register: any;
    control: any;
    errors: string[];
  }) => {
    const { fields, append, remove } = useFieldArray({
      control,
      name: "tickets",
    });
    return (
      <div className="flex flex-col  gap-6 p-4">
        {/* Event Name */}
        <span className="flex gap-2 flex-col">
          <label className={"text-[#4a4a4a] font-semibold"}>Ticket Names</label>
          {fields.map((el, index) => {
            return (
              <div className="flex gap-4 items-center" key={el.id}>
                <input
                  type="text"
                  className="border-[2px] outline-none p-2 max-w-[90%] flex-1"
                  placeholder="Enter Ticket Name"
                  {...register(`tickets.${index}.ticket`, {
                    required: true,
                  })}
                />
                {index > 0 && (
                  <CircleX
                    onClick={() => remove(index)}
                    className="text-[red] cursor-pointer"
                    strokeWidth={1}
                  />
                )}
              </div>
            );
          })}
          <div>
            <button
              onClick={() => append({ ticket: "" })}
              className="flex items-center gap-4 my-4  justify-self-start  text-[#7655fA]"
            >
              {" "}
              <Plus /> <span>Add Another Ticket</span>
            </button>
          </div>
        </span>
      </div>
    );
  };