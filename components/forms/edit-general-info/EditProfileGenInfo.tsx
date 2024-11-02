"use client";
import { joditConfig } from "@/configs/joditConfig";
import JoditEditor from "jodit-react";
import { ImageOff } from "lucide-react";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Image as LucideImage } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { queryClient } from "@/components/MainLayoutGrid";
import { useMutation } from "@tanstack/react-query";
import { Profile } from "@/configs/apiRoutes";
const EditProfileGenInfo = ({ profile }: { profile: any }) => {
  const hiddenInputRef = useRef(null);
  const [fileUrl, setFileUrl] = useState<string>(profile?.photo);
  const [fileData, setFile] = useState<any>();
  // console.log(profile)
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      company: profile?.full_name,
      email: profile?.email,
      phone: profile?.phone,
      about: profile?.about,
    },
  });

  const mutateProfile = useMutation({
    mutationFn: Profile.updateGenInfo,
    onSuccess: ()=>{
      queryClient.invalidateQueries({queryKey: ["profile"]})
      toast("Update Successfull.." ,{
        type: "success"
      })
    },
    onError: ()=>{
      toast("Updation Failed.." , {
        type: "error"
      })
    }
  })
  const handleUpload = (e: React.MouseEvent) => {
    e.preventDefault();
    (hiddenInputRef.current as any).click();
  };

  const validateFileType = (file: any): boolean => {
    const validExtentions = ["png", "jpg", "svg"];
    const isValid = validExtentions.find(
      (item) => file?.type && file.type.includes(item)
    );
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

    setFile(file);
  };

  const handleClearFile = () => {
    (hiddenInputRef.current as any).value = null;
    setFileUrl("");
  };

  const onSubmit = (data: any) => {
    let formData = new FormData();

    if (data) {
      formData.append("photo", fileData);
      formData.append("company_name", data.company);
      formData.append("about", data.about);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
    }
    // console.log(formData.get("company"))
    mutateProfile.mutate(formData)
  };

  return (
    <>
    
      { (
        <div className="flex-1 flex flex-col gap-4 sm:px-4 sm:py-6 md:p-10 rounded-md bg-white sm:flex-wrap md:flex-nowrap ">
          <div className="flex justify-between items-center">
            <h1 className="text-[#4a4a4a] text-lg font-semibold">
              General Information
            </h1>
          </div>

          {/* File Upload */}
          <span className="text-[#999999] text-sm font-semibold">
            Upload Profile Pic
          </span>
          <div className="flex sm:flex-col md:flex-row  items-center rounded-md border-[1px] p-4 gap-4">
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
                  <Image
                    src={fileUrl}
                    className=" h-[60px] w-[60px]"
                    alt="logo"
                    width={60}
                    height={60}
                  />
                  <button onClick={handleClearFile} className="text-[#D04B4B]">
                    Remove
                  </button>
                </>
              )}

              {!fileUrl && (
                <div className="flex justify-center items-center p-2 rounded-lg bg-[#7655fa26]">
                  <LucideImage
                    className="text-center  text-[#999999] h-[50px] w-[50px]"
                    strokeWidth={1}
                    size={40}
                  />
                </div>
              )}
            </div>

            <div
              onClick={handleUpload}
              className="flex cursor-pointer justify-center self-stretch bg-[#F7F6F9] rounded-md flex-col flex-1 items-center gap-1"
            >
              <h1 className="text-[#999999]">Click Here to upload new logo</h1>
              <h1 className="text-[#4a4a4a]">
                {"SVG, PNG, JPG. (1080x1080 Max)"}
              </h1>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4 ">
              <div className="flex flex-col gap-2">
                <span className="text-[#999999] text-sm font-semibold">
                  Company Name
                </span>
                <input
                  type="text"
                  defaultValue={profile?.full_name}
                  placeholder="Company Name"
                  className="text-[#4a4a4a] text-base  p-2 border-[2px] outline-none rounded-md"
                  {...register("company")}
                />
              </div>

              <div className="flex justify-between items-center gap-4">
                <div className="flex-1 flex flex-col gap-2">
                  <span className="text-[#999999] text-sm font-semibold">
                    Email
                  </span>
                  <input
                    type="text"
                    placeholder="Email"
                    defaultValue={profile?.email}
                    className="text-[#4a4a4a] text-base  p-2 border-[2px] outline-none rounded-md"
                    {...register("email")}
                  />
                </div>
                <div className="flex-1 flex flex-col gap-2">
                  <span className="text-[#999999] text-sm font-semibold">
                    Phone
                  </span>
                  <input
                    type="number"
                    placeholder="Phone Number"
                    defaultValue={profile?.phone}
                    className="text-[#4a4a4a] text-base  p-2 border-[2px] outline-none rounded-md"
                    {...register("phone", {setValueAs: String})}
                  />
                </div>
              </div>
            </div>

            <div className="flex mt-4 flex-col gap-4">
              <div className="flex-1 flex flex-col">
                <span className="text-[#999999] text-sm mb-1 font-semibold">
                  About
                </span>
                <Controller
                  name="about"
                  control={control}
                  render={({ field }) => (
                    <div className="flex flex-col gap-4">
                      <JoditEditor
                        value={field.value || profile?.about}
                        config={joditConfig as any}
                        onChange={(newContent) => field.onChange(newContent)}
                      />
                    </div>
                  )}
                />
              </div>
            </div>

            <div className="flex justify-end items-center gap-4">
              <button className="px-4 mt-5 py-2 bg-[#7655fa] text-white rounded-full">
                {" "}
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default EditProfileGenInfo;
