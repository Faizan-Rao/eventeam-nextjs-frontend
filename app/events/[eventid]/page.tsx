import CompanyFooter from '@/components/CompanyFooter'
import CompanyHeader from '@/components/CompanyHeader'
import MainContentGrid from '@/components/MainContentGrid'
import PageTitleContainer from '@/components/PageTitleContainer'
import RegisterForEventForm1 from '@/components/RegisterForEventForm1'
import RegisterForEventForm2 from '@/components/RegisterForEventForm2'
import React from 'react'

const RegisterEvent = () => {
  return (
    <>
    <CompanyHeader/>
    <MainContentGrid className='translate-y-[-15%]'>
      {/* <PageTitleContainer title='Register Event'/> */}
      <div className='flex justify-between gap-4 flex-wrap'>
        <RegisterForEventForm1/>
        <RegisterForEventForm2/>
      </div>
    </MainContentGrid>
    <CompanyFooter/>
    </>
  )
}

export default RegisterEvent