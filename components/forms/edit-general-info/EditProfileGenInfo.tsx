"use client";
import { joditConfig } from "@/configs/joditConfig";
import JoditEditor from "jodit-react";
import { ImageOff } from "lucide-react";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Image as LucideImage } from "lucide-react";
const EditProfileGenInfo = () => {
  const hiddenInputRef = useRef(null);
  const [fileUrl, setFileUrl] = useState<string>();
  const methods = useForm();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const handleUpload = (e: React.MouseEvent) => {
    e.preventDefault();
    (hiddenInputRef.current as any).click();
  };

  const validateFileType = (file: any): boolean => {
    const validExtentions = ["png", "jpg", "svg"];
    const isValid = validExtentions.find((item) => file?.type && file.type.includes(item));
    if (isValid) {
      return true;
    } else {
      return false;
    }
  };

  const handleUploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    const isValid = validateFileType(file);
    if (!isValid) {
      toast.error("Invalid File..!", { position: "bottom-right" });
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file as any);
    reader.onloadend = function () {
      setFileUrl(`${reader.result}`);
    };
  };

  const handleClearFile = () => {
    (hiddenInputRef.current as any).value = null;
    setFileUrl("");
  };
  return (
    <div className="flex-1 flex flex-col gap-4 p-10 rounded-md bg-white ">
      <div className="flex justify-between items-center">
        <h1 className="text-[#4a4a4a] text-lg font-semibold">
          General Information
        </h1>
      </div>

      {/* File Upload */}
      <span className="text-[#999999] text-sm font-semibold">
        Upload Profile Pic
      </span>
      <div className="flex  items-center rounded-md border-[1px] p-4 gap-4">
        <input
          type="file"
          ref={hiddenInputRef}
          onChange={handleUploadFile}
          placeholder="Company Name"
          className="text-[#4a4a4a] text-base  p-2 border-[2px] outline-none rounded-md"
          hidden
        />
        <div className="flex justify-center items-center flex-col">
          {fileUrl && (
            <>
              <Image src={fileUrl} className=" h-[60px] w-[60px]" alt="logo" width={60} height={60} />
              <button onClick={handleClearFile} className="text-[#D04B4B]">
                Remove
              </button>
            </>
          )}

          {!fileUrl && <div className="flex justify-center items-center p-2 rounded-lg bg-[#7655fa26]">
            <LucideImage className="text-center  text-[#999999] h-[50px] w-[50px]" strokeWidth={1}  size={40} />
          </div> 
          }
        </div>

        <div
          onClick={handleUpload}
          className="flex cursor-pointer justify-center self-stretch bg-[#F7F6F9] rounded-md flex-col flex-1 items-center gap-1"
        >
          <h1 className="text-[#999999]">Click Here to upload new logo</h1>
          <h1 className="text-[#4a4a4a]">{"SVG, PNG, JPG. (1080x1080 Max)"}</h1>
        </div>
      </div>

      <div className="flex flex-col gap-4 ">
        <div className="flex flex-col gap-2">
          <span className="text-[#999999] text-sm font-semibold">
            Company Name
          </span>
          <input
            type="text"
            placeholder="Company Name"
            className="text-[#4a4a4a] text-base  p-2 border-[2px] outline-none rounded-md"
          />
        </div>

        <div className="flex justify-between items-center gap-4">
          <div className="flex-1 flex flex-col gap-2">
            <span className="text-[#999999] text-sm font-semibold">Email</span>
            <input
              type="text"
              placeholder="Email"
              className="text-[#4a4a4a] text-base  p-2 border-[2px] outline-none rounded-md"
            />
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <span className="text-[#999999] text-sm font-semibold">Phone</span>
            <input
              type="text"
              placeholder="Phone Number"
              className="text-[#4a4a4a] text-base  p-2 border-[2px] outline-none rounded-md"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex-1 flex flex-col">
          <span className="text-[#999999] text-sm font-semibold">About</span>
          <Controller
            name="gen_info.event_desc"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col gap-4">
                <JoditEditor
                  value={field.value}
                  config={joditConfig as any}
                  onChange={(newContent) => field.onChange(newContent)}
                />
              </div>
            )}
          />
        </div>
      </div>

      <div className="flex justify-end items-center gap-4">
        <button className="px-4 py-2 bg-[#7655fa] text-white rounded-full">
          {" "}
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditProfileGenInfo;
