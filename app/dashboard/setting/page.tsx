import EditProfileAddressInfo from '@/components/forms/edit-address-info/EditProfileAddressInfo'
import EditProfileGenInfo from '@/components/forms/edit-general-info/EditProfileGenInfo'
import MainContentGrid from '@/components/MainContentGrid'
import PageTitleContainer from '@/components/PageTitleContainer'
import React from 'react'

const Setting = () => {
  return (
    <MainContentGrid>
        <PageTitleContainer title='General Settings'/>
        <div className='flex justify-between gap-4 md:flex-nowrap sm:flex-wrap'>
            <EditProfileGenInfo/>
            <EditProfileAddressInfo/>
        </div>
    </MainContentGrid>
  )
}

export default Setting