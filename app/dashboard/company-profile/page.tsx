import MainContentGrid from '@/components/MainContentGrid'
import PageTitleContainer from '@/components/PageTitleContainer'
import ProfileAddressInfo from '@/components/ProfileAddressInfo'
import ProfileGeneralInfo from '@/components/ProfileGeneralInfo'
import ProfileHeader from '@/components/ProfileHeader'
import React from 'react'

const CompanyProfile = () => {
  return (
    <>
    {/* Web Template */}
    <MainContentGrid className='sm:hidden md:flex'>
        <PageTitleContainer title='Company Profile'/>
        <ProfileHeader/>
        <div className='flex justify-between  gap-4  '>
            <ProfileGeneralInfo/>
            <ProfileAddressInfo/>
        </div>
    </MainContentGrid>

    {/* Mobile Template */}
    <div className='sm:flex md:hidden flex-col'>
    <PageTitleContainer title='Company Profile'/>
        <ProfileHeader/>
        <div className='flex-1 flex justify-between min-w-sm  md:gap-4 sm:flex-wrap md:flex-nowrap '>
            <ProfileGeneralInfo/>
            <ProfileAddressInfo/>
        </div>
    </div>
    </>
  )
}

export default CompanyProfile