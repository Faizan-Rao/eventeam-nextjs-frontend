"use client";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { USDollar } from "@/configs/currentFormat";
import { CircleCheck, PencilIcon, PencilLine } from "lucide-react";
import clsx from "clsx";
import joi from "joi";
import { toast } from "react-toastify";

const AddRegistrantDialog = ({
  formData,
  type,
  editData,
  settings,
}: {
  formData: any;
  type?: string;
  editData?: any;
  settings?: any;
}) => {
  const schema = joi.object({
    name: joi.string(),
    email: joi.string().email({ tlds: { allow: false } }),
    phone: joi.string().custom((value, helper) => {
      if (!new RegExp(/^[0-9]+$/).test(value)) {
        return helper.message("Input must be numeric" as any);
      }
      console.log(value, "custom validation error");
      return value;
    }),
    ticketType: joi.array<string>().min(1).required(),
    subEvents: joi.array<number>().min(1).required(),
  });

  const [ticketTypes, setTicketTypes] = useState<string[]>([]);
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSeletedTickets] = useState<string>("");
  const defaultFormState = {
    name: "",
    email: "",
    phone: "",
    ticketType: [
      `${formData?.sub_events?.[0].products?.[0].title}`,
    ] as string[],
    subEvents: [] as string[],
  };
  const [guestData, setGuestData] = useState(
    type === "edit" ? editData : defaultFormState
  );
  const [total, setTotal] = useState(0);
  const [error, setErrors] = useState<any>();
  const [isOpen, setOpen] = useState<any>(false);

  const {
    register,
    control,
    setValue,
    getValues,
    trigger,
    // formState: { errors },
  } = useFormContext();
  const { replace, swap, remove, append } = useFieldArray({
    control,
    name: "guests",
  });
  const watch = useWatch({ control });

  const handleFieldChange = (e: any) =>
    setGuestData({ ...guestData, [e.target.name]: e.target.value });

  const filterTicketTypes = useCallback(() => {
    formData.sub_events.map((el: any, i: number) => {
      const products = new Set(
        el.products.map((el2: any, j: number) => {
          return el2.title;
        })
      );

      setTicketTypes([...products] as string[]);
    });
  }, [formData]);

  const getTicketsWithPrices = useCallback(() => {
    let tickets = formData.sub_events.map((el: any, i: number) => {
      return el.products.map((el2: any, j: number) => {
        if (guestData.ticketType[0]) {
          return el2.title === guestData.ticketType[0] && el2;
        }
      });
    });

    let products = tickets.flat().filter((e: any) => e && e) || [];
    if (products.includes(tickets[0])) {
      setTickets([]);

      setTotal(0);
    } else {
      setTickets(products);
      setTotal(0);
    }
  }, [guestData.ticketType, formData]);

  const addSubEventInGuest = (data: any) => {
    const element = { ...guestData };
    if (!element.subEvents.includes(data.id)) {
      if (tickets.length > element.subEvents.length) {
        element.subEvents.push(data.id);
        setTotal((prev) => (prev += data.price));
        setGuestData(element);
      }
    } else {
      const filtered = element.subEvents.filter((el: any) => el !== data.id);
      element.subEvents = filtered;
      if (total > 0) {
        setTotal((prev) => (prev -= data.price));
      }
      setGuestData(element);
    }
  };

  console.log("registrant watch", watch);
  const addGuest = (e: any) => {
    e.preventDefault();

    const { value, error } = schema.validate(guestData, { abortEarly: false });
    const errors = error?.details
      .map((el: any) => {
        if (
          (settings.guest_name_required === "0" && el.path[0] === "name") ||
          (settings.guest_phone_required === "0" && el.path[0] === "phone") ||
          (settings.guest_email_required === "0" && el.path[0] === "email")
        ) {
          return false;
        }

        return el.path[0];
      })
      .filter((el) => el && el);
    const { guests } = getValues();

    setErrors(errors);
    if (
      (guests.length <= 0 && errors?.includes("email")) ||
      (guests.length <= 1 &&
        settings.guest_email_required === "1" &&
        errors?.includes("email"))
    ) {
      return;
    }

    if (
      (guests.length <= 0 && errors?.includes("phone")) ||
      (guests.length <= 1 &&
        settings.guest_phone_required === "1" &&
        errors?.includes("phone"))
    ) {
      return;
    }
    // Code for Addition
    if (!errors?.includes("subEvents") && type !== "edit") {
      append(guestData);

      setOpen(false);
      setValue("totalAmount", `${parseFloat(watch.totalAmount) + total}`);
      setTotal(0);
      setGuestData(defaultFormState);
    }
    // Code for Guest edition
    if (((errors || []).length as any) <= 0 && type === "edit") {
      const guests = [...watch.guests];
      let find = guests.findIndex((el: any) => {
        return el.email === guestData.email;
      });
      if (find !== -1) {
        guests[find] = guestData;
      }
      replace(guests);
      setOpen(false);
      setValue("totalAmount", `${parseFloat(watch.totalAmount) + total}`);
      setTotal(0);
    }
  };

  useEffect(() => {
    filterTicketTypes();
    getTicketsWithPrices();
  }, [filterTicketTypes, getTicketsWithPrices]);

  console.log("This is error Data", error);
  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger className="active:scale-[0.98] transition-all">
        {type === "edit" ? (
          <PencilLine className="text-[#7655fa]" strokeWidth={1.2} />
        ) : (
          <p className="border-[2px] w-full outline-none border-[#7655fa] text-[#7655fa] sm:text-sm md:text-base rounded-full p-2 font-semibold">
            Add New Guest
          </p>
        )}
      </DialogTrigger>
      <DialogContent className="md:min-w-[600px]">
        <DialogHeader>
          <DialogTitle className="my-2">
            {type === "edit" ? "Edit Guest" : "Add New Guest"}
          </DialogTitle>
          <DialogDescription>
            <form className="flex flex-col gap-4 row-span-2">
              {(watch.guests.length <= 0 ||
                settings.guest_name_required === "1") && (
                <div className="flex flex-col gap-2">
                  <label htmlFor="full_name">Full Name</label>
                  <input
                    type="text"
                    className=" outline-none p-2 flex-1 border-[2px] focus:border-[#7655fa] rounded-lg"
                    id="full_name"
                    onChange={handleFieldChange}
                    placeholder="name"
                    name="name"
                    defaultValue={guestData.name}
                    required
                  />
                  {error && error.includes("name") && (
                    <span className="text-red-700">{`"Name" is not allowed to be empty`}</span>
                  )}
                </div>
              )}

              <div className="flex sm:flex-col md:flex-row gap-2  min-h-[30px]">
                {(watch.guests.length <= 0 ||
                  settings.guest_email_required === "1") && (
                  <div className="flex flex-col flex-1 gap-2">
                    <label htmlFor="full_name">Email</label>
                    <input
                      type="email"
                      className=" outline-none p-2 max-h-[40px] flex-1 border-[2px] focus:border-[#7655fa] rounded-lg"
                      onChange={handleFieldChange}
                      placeholder="email"
                      name="email"
                      defaultValue={guestData.email}
                      disabled={type === "edit"}
                      required
                    />
                    {error && error.includes("email") && (
                      <span className="text-red-700">
                        {`"Email" is not allowed to be empty and in correct format`}
                      </span>
                    )}
                  </div>
                )}
                {(watch.guests.length <= 0 ||
                  settings.guest_phone_required === "1") && (
                  <div className="flex flex-col flex-1 gap-2">
                    <label htmlFor="full_name">Phone</label>
                    <input
                      type="text"
                      className=" outline-none p-2 max-h-[40px] flex-1 border-[2px] focus:border-[#7655fa] rounded-lg"
                      onChange={(e) => {
                        handleFieldChange(e);
                      }}
                      placeholder="phone"
                      name="phone"
                      defaultValue={guestData.phone}
                      required
                    />
                    {error && error.includes("phone") && (
                      <span className="text-red-700">
                        {`"Phone" is not allowed to be empty and numeric only`}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {
                <div className="flex flex-col gap-2">
                  <label htmlFor="full_name">Ticket Type</label>
                  <Select
                    disabled={type === "edit"}
                    required
                    defaultValue={
                      guestData.ticketType[0] ||
                      formData.sub_events[0].products[0].title
                    }
                    onValueChange={(value) => {
                      getTicketsWithPrices();
                      setGuestData({ ...guestData, ticketType: [value] });
                      setSeletedTickets(value as string);
                    }}
                  >
                    <SelectTrigger className="open:border-[#7655fa]">
                      <SelectValue placeholder={"Select Ticket Type..."} />
                    </SelectTrigger>
                    <SelectContent>
                      {ticketTypes.length > 0 &&
                        ticketTypes.map((el, i) => {
                          return (
                            <SelectItem
                              key={i}
                              className="mx-0 active:scale-[0.95] transition-all"
                              value={el as string}
                            >
                              {el as string}
                            </SelectItem>
                          );
                        })}
                    </SelectContent>
                  </Select>
                </div>
              }
              <div className="grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-3 gap-2">
                {type !== "edit" &&
                  tickets.length > 0 &&
                  tickets.map((el: any, i: number) => {
                    return (
                      formData.sub_events[i] && (
                        <div
                          key={i}
                          onClick={() => {
                            addSubEventInGuest(el);
                          }}
                          className={clsx(
                            "grid grid-cols-2  active:scale-[0.98] transition-all gap-2 border-[2px] px-4 py-2 rounded-lg cursor-pointer",
                            guestData.subEvents.includes(el.id) &&
                              "border-[#7655fa]"
                          )}
                        >
                          <div className="grid grid-cols-1 gap-1">
                            <h1 className="text-2xl font-semibold">
                              {USDollar.format(el.price)}
                            </h1>
                            <p className="text-sm">
                              {formData.sub_events[i] &&
                                formData.sub_events[i].title}{" "}
                              {el.title}
                            </p>
                          </div>
                          <div
                            className={clsx(
                              "justify-self-end self-center",
                              guestData.subEvents.includes(el.id) &&
                                "bg-[#7655fa] text-white rounded-full"
                            )}
                          >
                            <CircleCheck strokeWidth={1.2} />
                          </div>
                        </div>
                      )
                    );
                  })}
                {error && error.includes("subEvents") && total === 0 && (
                  <span className="text-red-700">
                    {`"Ticket Type" is required select atleast one`}
                  </span>
                )}
              </div>

              {type !== "edit" && (
                <div className="flex border-b-[1px] justify-between">
                  <h1 className="text-[#7655fa] text-base font-semibold">
                    Total
                  </h1>
                  <h1 className="text-[#4a4a4a] text-base font-semibold">
                    {USDollar.format(total)}
                  </h1>
                </div>
              )}

              <button
                className="p-2 rounded-full active:scale-[0.95] transition-all bg-[#7655fa] text-white"
                onClick={async (e) => {
                  addGuest(e);
                }}
              >
                {type === "edit" ? "Edit Guest" : "Add New Guest"}
              </button>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddRegistrantDialog;
