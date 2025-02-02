"use client";

import React, { useState } from "react";
import EmailTempaleEditForm from "./EmailTempaleEditForm";
import EmailTemplateView from "./EmailTemplateView";
import { useParams } from "next/navigation";

const EmailTemplateContainer = ({ data }: { data: any }) => {
  const params = useParams();
  const template = data?.data.data.find((e: any) =>
    e.type.includes(params.template)
  );
  const [emailBody, setEmailBody] = useState({
    body: (template && template.body) || "",
    subject: (template && template.subject) || "",
  });
  return (
    <div className="grid md:grid-cols-2 gap-4">
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
