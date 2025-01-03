"use client";
import { Switch } from "@/components/ui/switch";
import { EmailTempApi } from "@/configs/apiRoutes";
import { joditConfig } from "@/configs/joditConfig";
import { useMutation } from "@tanstack/react-query";
import JoditEditor from "jodit-react";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { queryClient } from "./MainLayoutGrid";

const EmailTempaleEditForm = ({
  data,
  setData,
  template
}: {
  data: any;
  setData: React.Dispatch<React.SetStateAction<any>>;
  template : any
}) => {
  const [emails, setEmails] = useState<string[]>( data && JSON.parse(template && template.cc_emails || "[]") || []);
  const [status, setStatus] = useState<boolean>(false);
  
  const handleEmailChange = (e: any) => {
    if (e.target.value?.endsWith(",") && !e.target.value?.includes(" ")) {
      const value = e.target.value.split(",")[0];
      let newEmails = [...emails];
      newEmails.push(value);
      setEmails(newEmails);
      e.target.value = "";
    }
  };

  const deleteEmail = (number: number) => {
    let newEmails = [...emails];
    const filtered = newEmails.filter((e, i) => i !== number);
    setEmails(filtered);
  };

  const handleDataChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const mutate = useMutation({
    mutationFn: EmailTempApi.save,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["email_templates"] });
      toast.info("Updated Successfully...");
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: ["email_templates"] });
      toast.error("Updated Failed...");
    },
  });

  return (
    <div className="flex flex-col p-6 rounded-xl bg-white flex-1 gap-3">
      <h1 className="text-2xl font-semibold leading-relaxed">Introduction</h1>
      <p>
        This is a visual editor for email template. You can edit the email
        template by entering the field here. <br />
        Once you have edited your desired section, just click save button
      </p>

      <h1 className="text-2xl font-semibold">General Settings</h1>
      <h1 className="text-sm font-semibold">Status</h1>
      <div className="flex justify-between border-[2px] rounded-md p-2">
        <span className="text-[#4a4a4a] flex-1">Active</span>
        {template && (
          <Switch
            defaultChecked={template.status === "1" ? true : false}
            onCheckedChange={(value: any) => {
              setStatus(value)
            }}
          />
        )}
        
        
      </div>

      <h1 className="text-sm font-semibold">CC email*</h1>
      <div className="flex  border-[2px] rounded-md p-2 w-auto flex-wrap">
        {emails.map((e, i) => {
          return (
            <p
              className="px-4 py-1 my-1 active:scale-[0.95] transition-all text-center rounded-full mx-1 cursor-pointer bg-[#7655fa26]"
              key={i}
              onClick={() => deleteEmail(i)}
            >
              {e}
            </p>
          );
        })}
        <input
          type="text"
          onChange={handleEmailChange}
          className="outline-none w-full my-1"
          placeholder="Enter CC Emails"
         
        />
      </div>

      <h1 className="text-sm font-semibold">Subject*</h1>

      <input
        type="text"
        onChange={handleDataChange}
        className=" border-[2px] outline-none rounded-md p-2 w-auto"
        placeholder="Enter CC Emails"
        name="subject"
        defaultValue={data.subject}
        id=""
      />

      <h1 className="text-sm font-semibold">Body*</h1>

      <JoditEditor
        onChange={(value) => setData({ ...data, body: value })}
        value={data.body}
        config={joditConfig as any}
      />

      <button onClick={()=>{
        mutate.mutate({
          id: template.id,
          type: template.type,
          body: data.body,
          subject: data.subject,
          cc_emails: emails,
          status: status ? 1 : 0
        })
      }} className="px-4 py-2 active:scale-[0.95] transition-all text-white rounded-full bg-[#7655fa] ml-auto my-3">
        Save Changes
      </button>
    </div>
  );
};

export default EmailTempaleEditForm;
