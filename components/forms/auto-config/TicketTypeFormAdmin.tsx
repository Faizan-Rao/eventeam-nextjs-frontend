import { CircleX, Plus } from "lucide-react";
import {
  
  useFieldArray,
  useFormContext,
  
  useWatch,
} from "react-hook-form";

import { ErrorMessage } from "@hookform/error-message";
import { useTranslation } from "react-i18next";

import { useEffect } from "react";
export const TicketTypes = ({}: { errors?: string[] }) => {
  const {
    control,
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "tickets",
  });
  const {t} = useTranslation("translation")
const watch = useWatch({control, name: "tickets"})
  useEffect(()=>{
    
        const values = getValues()
        const {sub_events, tickets} = values

        if(sub_events.length > 0)
        {
          let ticketLength = tickets.length
          let newSubEvents = sub_events.map((el : any) =>{
            const slicedTicketTypes = el.ticket_types.slice(0, ticketLength)
            const mutatedTicketType = slicedTicketTypes.map((el : any, index : number)=>{
              return {
                ...el,
                title: tickets[index].title
              }
            })
            return {
              ...el,
              ticket_types: mutatedTicketType
            }
          })
          setValue(
            "sub_events",
            newSubEvents
          )
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[watch])
    
  return (
    <div className="flex  flex-col   gap-6  ">
      {/* Event Name */}
      <div className="flex -1 w-full gap-2 flex-col">
        <label className={"text-[#4a4a4a] font-semibold"}>{t("Ticket Names")}</label>
        {fields.map((el, index: number) => {
          return (
            <>
            
            <div className="flex gap-4 justify-between items-center border-[2px] md:max-w-xl" key={index}>
              <input
                type="text"
                className=" outline-none p-2 sm:max-w-[80%] md:max-w-[90%] flex-1"
                placeholder="Enter Ticket Name"
                {...register(`tickets.${index}.title`, {
                  required: true,
                })}
                />
                {index > 0 && (
                  <CircleX
                    onClick={() => remove(index)}
                    className="text-[red] mx-2 cursor-pointer active:scale-[0.90] transition-all"
                    strokeWidth={1}
                  />
                )}
            </div>
              <ErrorMessage
                errors={errors}
                name={`tickets.${index}.title`}
                message="This field is required."
                render={({ message }) =>
                  message && <p className="text-red-800 ">{message}</p>
                }
              />
            </>
          );
        })}

        <div>
          <button
            onClick={() => append({ title: "" })}
            className="flex items-center gap-4 my-4 active:scale-[0.95] transition-all  justify-self-start sm:text-sm md:text-base text-[#7655fA]"
          >
            {" "}
            <Plus /> <span>{t("Add Another Ticket")}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
