"use client";
import React, { createRef, useRef } from "react";
import SimplePancilLine from "./icons/SimplePancilLine";
import ArrowDown from "./icons/ArrowDown";
import ArrowDownWhite from "./icons/ArrowDownWhite";
import SubeventPreview from "./SubeventPreview";

const EventDashContainer = () => {
  let ref = useRef(null);
  console.log(ref)
  return (
    <div className="flex container p-8 gap-6 rounded-md flex-col bg-[#1E1640] text-white">
      <div className="flex sm:justify-center md:justify-between items-center gap-4 flex-wrap">
        <div className="flex flex-col gap-1">
          <h4 className="text-2xl">Eid ul Fitr Event</h4>
          <p className="text-base text-[#BABABA]">Augest 16th to 18th-2024</p>
        </div>
        <span className="flex items-center gap-2">
          <button className="bg-[#7655FA] text-base rounded-full px-7 py-3 text-center">
            Publish Directly
          </button>
          <button className="bg-[#E0A450] text-base rounded-full aspect-square object-cover py-2 px-3 text-center">
            <SimplePancilLine />
          </button>
          <button
            className="bg-[#7655FA26] hover:rotate-[-180deg] transition-all flex place-items-center rounded-full aspect-square object-cover py-2 px-5 text-center"
            onClick={() => {
               (ref.current as any).classList.toggle('hidden')
            }}
          
          >
            <ArrowDownWhite />
          </button>
        </span>
      </div>

      <div ref={ref} className="hidden">
        <div className="flex gap-4 my-2">
          <span className="font-bold text-4xl">“”</span>
          <p className="text-center m-4">
            This part of the card can be used to put some textual description
            about this event. The description can be small or large. This part
            of the card can be used to put some textual description about this
            event. The description can be small or large. This part of the card
            can be used to put some textual description about this event. The
            description can be small or large.
          </p>
          <span className="font-bold text-4xl self-end">“”</span>
        </div>

        <div className="flex items-center justify-center container  flex-wrap">
          <SubeventPreview />
          <SubeventPreview className="bg-[#7655FA26] rounded-md"/>
          <SubeventPreview />
        </div>
      </div>
    </div>
  );
};

export default EventDashContainer;
