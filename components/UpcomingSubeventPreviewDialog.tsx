import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import clsx from "clsx";
import React from "react";
import SubeventPreview from "./SubeventPreview";
import { DialogHeader } from "./ui/dialog";
import ViewEye from "./icons/ViewEye";
import { Eye, Flame, Info, Star } from "lucide-react";
import { useTranslation } from "react-i18next";
import SubActivitiesPreview from "./SubActivtiesPreview";
import { usePathname } from "next/navigation";
import { format } from "date-fns";

const UpcomingSubeventPreviewDialog = ({
  data,
  type,
}: {
  data: any;
  type?: string;
}) => {
  const { t } = useTranslation(["translation"]);
  const pathname = usePathname();
  return (
    <Dialog>
      <DialogTrigger className="active:scale-[0.95] p-2 transition-all hover:bg-[#7655fa26] rounded-full">
        {type !== "comp_events" && (
          <span>
            <Eye className="cursor-pointer text-[#b7b7b7] justify-self-end self-center" />
          </span>
        )}

        {type === "comp_events" && (
          <span
            className={clsx(
              "bg-[#7655fa26] active:scale-[0.95]  hover:text-white hover:bg-[#7655fa] transition-all sm:text-sm  md:text-sm mb-4 mt-2 my-4 px-4 py-2 text-center  rounded-full text-[#7655fa] font-semibold"
            )}
          >
            {t("View Details")}
          </span>
        )}
      </DialogTrigger>
      <DialogContent className="sm:min-w-full md:min-w-[800px] max-h-[600px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{data.title}</DialogTitle>
          <DialogDescription>
            <div className="flex  justify-center    flex-wrap flex-col">
              {pathname.includes("/companies") && data.auto_id !== null && (
                <>
                  <h1 className="text-base my-4 text-[#7655fa] font-semibold ">
                    {t("Important Times")}
                  </h1>
                  <div className="flex  justify-center   flex-wrap   gap-4">
                    <div className="flex flex-1 pb-4 border-b-[1px] max-h-[140px] gap-2 justify-stretch">
                      <span className=" flex-1 p-4 flex-col flex justify-center items-center rounded-md gap-1 ">
                        <Flame className="text-[#E0A450]" size={35} />
                        <span className="text-[#E0A450] sm:text-sm md:text-sm font-semibold">
                          {
                            data.sub_events?.[0].hebTimes?.prayer_times?.[0]
                              .title_orig
                          }
                        </span>
                        <span className="text-[#E0A450] sm:text-base md:text-lg font-semibold">
                          {}

                          {(() => {
                            try {
                             
                              const date = format(
                              
                                new Date(
                                  data.sub_events?.[0].hebTimes?.prayer_times?.[0].date.slice(
                                    0,
                                    16
                                  )
                                ),
                                "HH:mm, dd/MM/yyyy"
                              );
                             
                              return `${date}`;
                            } catch {
                              const time =
                                data.sub_events?.[0].hebTimes?.prayer_times?.[0].title.split(
                                  " "
                                );
                              const date =
                                data.sub_events?.[0].hebTimes?.prayer_times?.[0].date.split(
                                  "T"
                                )[0];
                              return `${time[time.length - 1]}, ${date}`;
                            }
                          })()}
                        </span>
                      </span>
                      <span className=" flex-1 p-4 flex-col flex justify-center items-center rounded-md gap-1 ">
                        <Star className="text-[#E0A450]" size={35} />
                        <span className="text-[#E0A450] sm:text-sm md:text-sm font-semibold">
                          {
                            data.sub_events?.[0].hebTimes?.prayer_times?.[1]
                              .title_orig
                          }
                        </span>
                        <span className="text-[#E0A450] sm:text-base md:text-lg font-semibold">
                          {}

                          {(() => {
                            try {
                              const date = format(
                                new Date(
                                  data.sub_events?.[0].hebTimes?.prayer_times?.[1].date.slice(
                                    0,
                                    16
                                  )
                                ),
                                "HH:mm, dd/MM/yyyy"
                              );
                             
                              return `${date}`;
                            } catch {
                              const time =
                                data.sub_events?.[0].hebTimes?.prayer_times?.[1].title.split(
                                  " "
                                );
                              const date =
                                data.sub_events?.[0].hebTimes?.prayer_times?.[1].date.split(
                                  "T"
                                )[0];
                              return `${time[time.length - 1]}, ${date}`;
                            }
                          })()}
                        </span>
                      </span>
                    </div>
                  </div>
                </>
              )}

              {pathname.includes("/companies") && (
                <h1 className="text-base mt-4 text-[#7655fa] font-semibold ">
                  {t("Subevents")}
                </h1>
              )}
              <div className="grid sm:grid-cols-1 md:grid-cols-2  justify-items-stretch  gap-4">
                {data.sub_events.map((el: any, i: number) => {
                  return (
                    <SubeventPreview
                      key={i}
                      data={el}
                      className={clsx(
                        i % 2 === 1 && "bg-[#f7f6f9]  rounded-md"
                      )}
                    />
                  );
                })}
              </div>
              {pathname.includes("/companies") && (
                <>
                  <h1 className="text-base my-4 text-[#7655fa] font-semibold ">
                    {t("Activities")}
                  </h1>
                  <div className="grid sm:grid-cols-1 md:grid-cols-2  justify-items-stretch  gap-4">
                    {data.sub_events.map((el: any, i: number) => {
                      return (
                        <SubActivitiesPreview
                          key={i}
                          data={el}
                          className={clsx(
                            i % 2 === 1 && "bg-[#f7f6f9]  rounded-md"
                          )}
                        />
                      );
                    })}
                  </div>
                </>
              )}
              {data.sub_events.length <= 0 && (
                <p className="border-[4px] flex-1 mt-4 p-4 border-dashed text-center text-[#999999]">
                  {t("No Upcoming Events Right Now")}
                </p>
              )}
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default UpcomingSubeventPreviewDialog;
