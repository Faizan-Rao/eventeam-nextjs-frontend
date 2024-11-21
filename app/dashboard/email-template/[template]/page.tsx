'use client'
import EmailTempaleEditForm from '@/components/EmailTempaleEditForm'
import EmailTemplateView from '@/components/EmailTemplateView'
import PageTitleContainer from '@/components/PageTitleContainer'
import { EmailTempApi } from '@/configs/apiRoutes'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'

const EditEmailTemplate = () => {
    const params = useParams()
    const {data} = useQuery({queryKey: ["email_templates"], queryFn: EmailTempApi.get})
    const template = data?.data.data.find((e:any)=> e.type.includes(params.template))
    const [emailBody, setEmailBody]= useState({
      body : template && template.body || "",
      subject: template &&  template.subject || ""
    })
  return (
    <div className='flex flex-col gap-4 p-4'>
         <PageTitleContainer title={`Edit Email Template`} />
         <div className='flex h-auto flex-1 gap-4'>
                <EmailTemplateView template={template} data={emailBody} />
                <EmailTempaleEditForm template={template} data={emailBody} setData={setEmailBody}/>
         </div>
    </div>
  )
}

export default EditEmailTemplate