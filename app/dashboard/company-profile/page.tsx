import MainContentGrid from '@/components/MainContentGrid'
import PageTitleContainer from '@/components/PageTitleContainer'
import ProfileAddressInfo from '@/components/ProfileAddressInfo'
import ProfileGeneralInfo from '@/components/ProfileGeneralInfo'
import ProfileHeader from '@/components/ProfileHeader'
import React from 'react'

const CompanyProfile = () => {
  return (
    <MainContentGrid>
        <PageTitleContainer title='Company Profile'/>
        <ProfileHeader/>
        <div className='flex justify-between  gap-4'>
            <ProfileGeneralInfo/>
            <ProfileAddressInfo/>
        </div>
    </MainContentGrid>
  )
}

export default CompanyProfile