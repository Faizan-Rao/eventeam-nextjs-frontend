'use client'
import EmailTempaleEditForm from '@/components/EmailTempaleEditForm'
import EmailTemplateContainer from '@/components/EmailTemplateContainer'
import EmailTemplateView from '@/components/EmailTemplateView'
import PageTitleContainer from '@/components/PageTitleContainer'
import { EmailTempApi } from '@/configs/apiRoutes'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'

const EditEmailTemplate = () => {
  const {data} = useQuery({queryKey: ["email_templates"], queryFn: EmailTempApi.get})
  
  return (
    <div className='flex flex-col gap-4 p-4'>
         <PageTitleContainer title={`Edit Email Template`} />
        {data && <EmailTemplateContainer data={data}/>}
    </div>
  )
}

export default EditEmailTemplate