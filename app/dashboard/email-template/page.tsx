import EmailTemplateMain from '@/components/EmailTemplateMain'
import MainContainer from '@/components/MainContainer'
import MainContentGrid from '@/components/MainContentGrid'
import PageTitleContainer from '@/components/PageTitleContainer'
import React from 'react'

const EmailTemplate = () => {
  return (
    <div className='flex flex-col p-4 min-h-[100vh] flex-1'>
      <PageTitleContainer title="Email Templates" />
        <EmailTemplateMain/>
    </div>
  )
}

export default EmailTemplate