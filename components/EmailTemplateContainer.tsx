"use client";

import React, { useState } from "react";
import EmailTempaleEditForm from "./EmailTempaleEditForm";
import EmailTemplateView from "./EmailTemplateView";
import { useParams } from "next/navigation";
import parser from 'html-react-parser'
import clsx from "clsx";
const EmailTemplateContainer = ({ data }: { data: any }) => {
  const params = useParams();
   const [tab, setTab] = useState("view");
  const template = data?.data.data.find((e: any) =>
    e.type.includes(params.template)
  );
  const [emailBody, setEmailBody] = useState({
    body: (template && `${parser(template?.body)}`.trim() !== "" ? template?.body : "<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non totam blanditiis voluptatem aliquid ducimus esse vitae impedit explicabo! Accusantium molestias, officia, exercitationem nemo quas deserunt ex natus quam iusto quo recusandae fugit.</p>") || "",
    subject: (template && template.subject) || "",
  });
  return (
    <>
    <div className="sm:hidden md:grid md:grid-cols-2 justify-items-stretch gap-4">
      <EmailTemplateView data={emailBody} />
      <EmailTempaleEditForm
        template={template}
        data={emailBody}
        setData={setEmailBody}
      />
    </div>
    <div className="sm:block md:hidden  ">
     
      <div className="sm:flex md:hidden py-4 bg-[white] px-4 font-semibold min-w-[100vw] items-center gap-4">
        <button
          onClick={() => setTab("view")}
          className={clsx(
            "text-[#7655fa] ",
            tab === "view" && "border-b-[2px] border-[#7655fa] "
          )}
        >
         View
        </button>
        <button
          onClick={() => setTab("edit")}
          className={clsx(
            "text-[#7655fa] ",
            tab === "edit" && "border-b-[2px] border-[#7655fa] "
          )}
        >
          {" "}
          Edit
        </button>
       
      </div>
        {tab === "view" &&   <EmailTemplateView data={emailBody} />}
        {tab === "edit" &&  <EmailTempaleEditForm
        template={template}
        data={emailBody}
        setData={setEmailBody}
      />}
        
      </div>
    
    </>
  );
};

export default EmailTemplateContainer;
