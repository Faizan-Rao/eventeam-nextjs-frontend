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
import { useRouter } from "next/navigation";
import parser from "html-react-parser"
import { useTranslation } from "react-i18next";
const EmailTempaleEditForm = ({
  data,
  setData,
  template,
}: {
  data: any;
  setData: React.Dispatch<React.SetStateAction<any>>;
  template: any;
}) => {
  const [emails, setEmails] = useState<string[]>(
    (data && JSON.parse((template && template.cc_emails) || "[]")) || []
  );
  const [status, setStatus] = useState<boolean>(false);
  const router = useRouter()
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
  const {t} = useTranslation(["translation"])
  const mutate = useMutation({
    mutationFn: EmailTempApi.save,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["email_templates"] });
      toast.info("Updated Successfully...");
      router.push("/dashboard/email-template");
    },
    onError: (error) => {
      queryClient.invalidateQueries({ queryKey: ["email_templates"] });
      if ((error as any).status !== 200) {
        Object.values((error as any)?.response?.data.data ?? {}).forEach(
          (el: any) => {
            el.forEach((el: any) => {
              toast(el, { type: "error" });
            });
          }
        );
      }
    },
  });

  return (
    <div className="flex flex-col p-6 rounded-xl bg-white flex-1 gap-3">
      <h1 className="text-2xl font-semibold leading-relaxed">{t("Introduction")}</h1>
      <p>
        {t("This is a visual editor for email template. You can edit the email template by entering the field here.")} <br />
        {t("Once you have edited your desired section, just click save button")}
      </p>

      <h1 className="text-2xl font-semibold">{t("General Settings")}</h1>
      <h1 className="text-sm font-semibold">{t("Status")}</h1>
      <div className="flex justify-between border-[2px] rounded-md p-2">
        <span className="text-[#4a4a4a] flex-1">{t("Active")}</span>
       
        <Switch
        dir="ltr"
          defaultChecked={template?.status === "1" ? true : false}
          onCheckedChange={(value: any) => {
            setStatus(value);
          }}
        />
       
        
        
      </div>

      <h1 className="text-sm font-semibold">{t("CC email")}*</h1>
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

      <h1 className="text-sm font-semibold">{t("Subject")}*</h1>

      <input
        type="text"
        onChange={handleDataChange}
        className=" border-[2px] outline-none rounded-md p-2 w-auto"
        placeholder="Enter CC Emails"
        name="subject"
        defaultValue={data.subject}
        id=""
      />

      <h1 className="text-sm font-semibold">{t("Body")}*</h1>
        
      <JoditEditor
        onChange={(value) => setData({ ...data, body: value })}
        value={parser(data?.body).toString().trim() !== "" ? data?.body : "<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non totam blanditiis voluptatem aliquid ducimus esse vitae impedit explicabo! Accusantium molestias, officia, exercitationem nemo quas deserunt ex natus quam iusto quo recusandae fugit.</p>"}
        
        config={joditConfig as any}
      />

      <button
        onClick={() => {
          mutate.mutate({
            id: template?.id,
            type: template?.type,
            body: data?.body,
            subject: data?.subject,
            cc_emails: emails,
            status: status ? 1 : 0,
          });
        }}
        className="px-4 py-2 active:scale-[0.95] transition-all text-white rounded-full bg-[#7655fa] ml-auto my-3"
      >
        {t("Save Changes")}
      </button>
    </div>
  );
};

export default EmailTempaleEditForm;
