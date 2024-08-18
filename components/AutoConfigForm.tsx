"use client";
import React, { useState, useDeferredValue, useRef, useId } from "react";
import autoConfigSteps from "@/configs/autoConfigs";
import clsx from "clsx";
import { ChevronLeft, CircleX, PenBoxIcon, Plus } from "lucide-react";
import {
  useForm,
  SubmitHandler,
  Controller,
  UseFormRegister,
  Control,
  useFieldArray,
} from "react-hook-form";
const JoditEditor = dynamic(async () => await import("jodit-react"));
import i18n from "@/configs/i18n";
import { format } from "date-fns";
import dynamic from "next/dynamic";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface IAutoConfig {
  gen_info: {
    event_name: string;
    start_date: Date;
    end_date: Date;
    event_desc: string;
  };
  tickets: { ticket: string }[];
  sub_events: {
    name: string;
    start_time: Date;
    end_time: Date;
    date: Date;
    active: boolean;
  }[];
}
const AutoConfigForm = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const deferStep = useDeferredValue(currentStep);
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [ticket, setTicket] = useState([{ ticket: "" }]);
  const id = useId();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAutoConfig>({
    defaultValues: {
      tickets: [
        {
          ticket: "Male",
        },
      ],
      sub_events: [
        {
          name: "Sub Event",
          start_time: new Date(),
          end_time: new Date(),
          date: new Date(),
          active: true,
        },
      ],
    },
  });

  const handleStepInc = (e: React.MouseEvent) => {
    e.preventDefault();
    if (deferStep < autoConfigSteps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleStepDec = (e: React.MouseEvent) => {
    e.preventDefault();
    if (deferStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  console.log(errors);
  const onSubmit: SubmitHandler<IAutoConfig> = (data) => console.log(data);
  return (
    <div className="flex gap-5   container p-0">
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

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-[white] container p-4 rounded-md"
      >
        {deferStep === 0 && (
          <>
            <FormHeader
              title="General Information"
              currentStep={currentStep + 1}
              totalSteps={autoConfigSteps.length}
            />
            <GeneralInfoInput
              register={register as any}
              control={control}
              id={id}
              errors={errors as any}
            />
          </>
        )}

        {deferStep === 1 && (
          <>
            <FormHeader
              title="Ticket Types"
              currentStep={currentStep + 1}
              totalSteps={autoConfigSteps.length}
            />
            <TicketTypes
              register={register as any}
              control={control}
              errors={errors as any}
            />
          </>
        )}

        {deferStep === 2 && (
          <>
            <FormHeader
              title="Sub Events"
              currentStep={currentStep + 1}
              totalSteps={autoConfigSteps.length}
            />
            <SubEventInput
              register={register as any}
              control={control}
              errors={errors as any}
            />
          </>
        )}
        <FormStepperButtons
          currentStep={currentStep}
          handleStepDec={handleStepDec}
          handleStepInc={handleStepInc}
        />
      </form>
    </div>
  );
};

export default AutoConfigForm;

export const GeneralInfoInput = ({
  register,
  control,
  id,
  errors,
}: {
  register: UseFormRegister<IAutoConfig>;
  control: Control<IAutoConfig, any>;
  id: string;
  errors: string[];
}) => {
  return (
    <div className="flex flex-col gap-6 p-4">
      {/* Event Name */}
      <span className="flex gap-2 flex-col">
        <label className={"text-[#4a4a4a] font-semibold"}>Event Name</label>
        <input
          type="text"
          className="border-[2px] outline-none p-2 w-full"
          placeholder="Enter Name"
          {...register("gen_info.event_name", { required: true })}
        />
      </span>

      {/* Event Dates */}
      <div className="flex gap-3">
        <span className="flex-1 flex gap-3 flex-col">
          <label className={"text-[#4a4a4a] font-semibold"}>Start Date</label>
          <input
            type="date"
            className="border-[2px] outline-none p-2 w-full cursor-pointer"
            {...register("gen_info.start_date", { required: true })}
          />
        </span>
        <span className="flex-1 flex gap-3 flex-col">
          <label className={"text-[#4a4a4a] font-semibold"}>End Date</label>
          <input
            type="date"
            className="border-[2px] outline-none p-2 w-full "
            {...register("gen_info.end_date", { required: true })}
          />
        </span>
      </div>
      {/* Event Description */}
      <Controller
        name="gen_info.event_desc"
        control={control}
        render={({ field }) => (
          <div className="flex flex-col gap-4">
            <label htmlFor={id} className={"text-[#4a4a4a] font-semibold"}>
              Event Description
            </label>
            <JoditEditor
              key={id}
              value={field.value}
              config={joditConfig as any}
              onChange={(newContent) => field.onChange(newContent)}
            />
          </div>
        )}
      />
    </div>
  );
};

export const TicketTypes = ({
  register,
  control,
  errors,
}: {
  register: UseFormRegister<IAutoConfig>;
  control: Control<IAutoConfig, any>;
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

export const SubEventInput = ({
  register,
  control,
  errors,
}: {
  register: UseFormRegister<IAutoConfig>;
  control: Control<IAutoConfig, any>;
  errors: string[];
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "sub_events",
  });
  return (
    <div className="flex flex-col  gap-6 p-4">
      {/* Dynamic Events */}
      <span className="flex gap-2 flex-wrap">
        {fields.map((el, index) => {
          return (
            <div
              className="flex gap-4 items-center bg-[#f6f6f6]  rounded-lg overflow-hidden min-w-[41%] "
              key={el.id}
            >
              {/* Card Content */}
              <div className="flex gap-1  ">
                <div className="flex  text-white flex-col place-items-center  p-4  bg-[#7655fa] ">
                  <span>{format(el.date, "MMM")}</span>
                  <span className="text-4xl">{format(el.date, "dd")}</span>
                </div>
                <div className="flex flex-col p-4 gap-3">
                  <h1 className="text-xl font-semibold">{el.name}</h1>

                  <h1 className="text-sm text-[#4a4a4a] font-semibold">
                    {format(el.start_time, "KK:mm aa")} -{" "}
                    {format(el.end_time, "KK:mm aa")}
                  </h1>

                  <button
                    onClick={() => (el.active = !el.active)}
                    className={clsx(
                      "font-semibold",
                      el.active && "bg-[#C2FFCC] rounded-full",
                      !el.active && "bg-[#FF9395]   rounded-full"
                    )}
                  >
                    {el.active ? "Active" : "Inactive"}
                  </button>
                </div>
              </div>
              {/* Card Controls */}
              <div className="flex gap-4 p-2 bg-[#fffefe] rounded-full">
                <Dialog>
                  <DialogTrigger>
                    <PenBoxIcon className="cursor-pointer" strokeWidth={1} />
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{el.name}</DialogTitle>
                      <DialogDescription>
                        <div className="flex flex-col gap-6 p-4">
                          {/* Event Name */}
                          <span className="flex gap-2 flex-col">
                            <label className={"text-[#4a4a4a] font-semibold"}>
                              Event Name
                            </label>
                            <input
                              type="text"
                              onChange={(e) => {
                                el.name = e.target.value;
                              }}
                              defaultValue={el.name}
                              className="border-[2px] outline-none p-2 w-full"
                              placeholder="Enter Name"
                            />
                          </span>

                          {/* Event Dates */}
                          <div className="flex gap-3">
                            <span className="flex-1 flex gap-3 flex-col">
                              <label className={"text-[#4a4a4a] font-semibold"}>
                                Start Time
                              </label>
                              <input
                                type="time"
                                onChangeCapture={(e) =>
                                  (el.end_time = new Date(e.timeStamp))
                                }
                                className="border-[2px] outline-none p-2 w-full cursor-pointer"
                              />
                            </span>
                            <span className="flex-1 flex gap-3 flex-col">
                              <label className={"text-[#4a4a4a] font-semibold"}>
                                End Time
                              </label>
                              <input
                                type="time"
                                onChange={(e) => {
                                  el.end_time = new Date(e.timeStamp);
                                }}
                                className="border-[2px] outline-none p-2 w-full "
                              />
                            </span>
                          </div>
                        </div>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>

                {index > 0 && (
                  <CircleX
                    onClick={() => remove(index)}
                    className="text-[red] cursor-pointer"
                    strokeWidth={1}
                  />
                )}
              </div>
            </div>
          );
        })}
        <div>
          <button
            onClick={() =>
              append({
                name: "Sub Event",
                start_time: new Date(),
                end_time: new Date(),
                date: new Date(),
                active: true,
              })
            }
            className="flex items-center gap-4 my-4  justify-self-start  text-[#7655fA]"
          >
            {" "}
            <Plus /> <span>Add Another Subevent</span>
          </button>
        </div>
      </span>
    </div>
  );
};

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

export const FormErrorMessage = ({ error }: { error: string }) => {
  return <span className="text-red-700 font-semibold ">{error}</span>;
};
export const joditConfig = {
  // direction: i18n.dir(),
  language: i18n.language,
  i18n,
  hidePoweredByJodit: true,
  readonly: false, // Set to true to make editor read-only
  useSplitMode: false,
  disablePlugins: [
    "code",
    "source",
    "print",
    "about",
    "dots",
    "video",
    "file",
    "break",
    "symbols",
    "table",
    "voice",
    "format",
    "superscript",
    "subscript",
    "classSpan",
    "speechRecognize",
    "copyformat",
    "ai-commands",
    "ai-assistant",
  ],
  showCharsCounter: false,
  showWordsCounter: false,
  showXPathInStatusbar: false,
  uploader: {
    insertImageAsBase64URI: true,
    imagesExtensions: ["jpg", "png", "jpeg", "gif", "svg", "webp"],
  },
};
