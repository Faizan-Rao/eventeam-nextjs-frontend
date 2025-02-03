"use client";

import React, { useState } from "react";
import EmailTempaleEditForm from "./EmailTempaleEditForm";
import EmailTemplateView from "./EmailTemplateView";
import { useParams } from "next/navigation";
import parser from 'html-react-parser'
const EmailTemplateContainer = ({ data }: { data: any }) => {
  const params = useParams();
  const template = data?.data.data.find((e: any) =>
    e.type.includes(params.template)
  );
  const [emailBody, setEmailBody] = useState({
    body: (template && `${parser(template?.body)}`.trim() !== "" ? template?.body : "<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non totam blanditiis voluptatem aliquid ducimus esse vitae impedit explicabo! Accusantium molestias, officia, exercitationem nemo quas deserunt ex natus quam iusto quo recusandae fugit.</p>") || "",
    subject: (template && template.subject) || "",
  });
  return (
    <div className="grid md:grid-cols-2 justify-items-stretch gap-4">
      <EmailTemplateView data={emailBody} />
      <EmailTempaleEditForm
        template={template}
        data={emailBody}
        setData={setEmailBody}
      />
    </div>
  );
};

export default EmailTemplateContainer;
