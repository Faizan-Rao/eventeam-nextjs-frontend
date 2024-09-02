import MainContentGrid from '@/components/MainContentGrid'
import PageTitleContainer from '@/components/PageTitleContainer'
import RegisterForEventForm1 from '@/components/RegisterForEventForm1'
import RegisterForEventForm2 from '@/components/RegisterForEventForm2'
import React from 'react'

const RegisterEvent = () => {
  return (
    <MainContentGrid>
      <PageTitleContainer title='Register Event'/>
      <div className='flex justify-between gap-4'>
        <RegisterForEventForm1/>
        <RegisterForEventForm2/>
      </div>
    </MainContentGrid>
  )
}

export default RegisterEvent