'use client'
import MainContentGrid from '@/components/MainContentGrid'
import PageTitleContainer from '@/components/PageTitleContainer'
import ProfileAddressInfo from '@/components/ProfileAddressInfo'
import ProfileGeneralInfo from '@/components/ProfileGeneralInfo'
import ProfileHeader from '@/components/ProfileHeader'
import { Profile } from '@/configs/apiRoutes'
import { user } from '@/configs/axios'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

const CompanyProfile = () => {
  const { data: profile , isError, isPending} = useQuery({
    queryKey: ["profile"],
    queryFn: Profile.get
  })
  const profileData = profile && profile?.data.data
  return (
    <>
    {/* Web Template */}
    <MainContentGrid className='sm:hidden md:flex'>
        <PageTitleContainer title='Company Profile'/>
        <ProfileHeader data={profileData}/>
        <div className='flex justify-between  gap-4  '>
            <ProfileGeneralInfo profile={profileData}/>
            { user.role === "company" && <ProfileAddressInfo profile={profileData}/>}
        </div>
    </MainContentGrid>

    {/* Mobile Template */}
    <div className='sm:flex md:hidden flex-col'>
    <PageTitleContainer title='Company Profile'/>
        <ProfileHeader data={profileData}/>
        <div className='flex-1 flex justify-between min-w-sm  md:gap-4 sm:flex-wrap md:flex-nowrap '>
            <ProfileGeneralInfo profile={profileData}/>
           { user.role === "company" && <ProfileAddressInfo profile={profileData}/>}
        </div>
    </div>
    </>
  )
}

export default CompanyProfile