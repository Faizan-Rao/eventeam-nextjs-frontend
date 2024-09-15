'use client'
import MainContentGrid from '@/components/MainContentGrid'
import PageTitleContainer from '@/components/PageTitleContainer'
import { clsx } from 'clsx'
import React, { useState } from 'react'
import dynamic from 'next/dynamic'
const EditProfileAddressInfo =  dynamic( ()=> import('@/components/forms/edit-address-info/EditProfileAddressInfo')) 
const EditProfileGenInfo = dynamic( ()=> import('@/components/forms/edit-general-info/EditProfileGenInfo')) 
const EditSecurityForm = dynamic( ()=> import( '@/components/forms/edit-security-info/EditSecurityInfo'))

const Setting = () => {
  const [tab, setTab] = useState("gen-info");
  return (
    <>
    <MainContentGrid className='sm:hidden md:flex'>
        <PageTitleContainer title='General Settings'/>
        <div className='flex justify-between gap-4 md:flex-nowrap sm:flex-wrap'>
            <EditProfileGenInfo/>
            <div className='flex flex-col gap-4 overflow-y-auto max-h-screen'>
            <EditProfileAddressInfo/>
            <EditSecurityForm/>
            </div>

        </div>
    </MainContentGrid>

    <div className="sm:block md:hidden ">
      <PageTitleContainer title="Form Fields" />
      <div className="sm:flex md:hidden py-4 bg-[white] px-4 font-semibold min-w-[100vw] items-center gap-4">
        <button
          onClick={() => setTab("gen-info")}
          className={clsx(
            "text-[#7655fa] ",
            tab === "gen-info" && "border-b-[2px] border-[#7655fa] "
          )}
        >
         General
        </button>
        <button
          onClick={() => setTab("address-info")}
          className={clsx(
            "text-[#7655fa] ",
            tab === "address-info" && "border-b-[2px] border-[#7655fa] "
          )}
        >
          {" "}
         Address
        </button>
        <button
          onClick={() => setTab("security-info")}
          className={clsx(
            "text-[#7655fa] ",
            tab === "security-info" && "border-b-[2px] border-[#7655fa] "
          )}
        >
          {" "}
          Security
        </button>
      </div>
      <div>
        {tab === "gen-info" && <EditProfileGenInfo />}
        {tab === "address-info" && <EditProfileAddressInfo />}
        {tab === "security-info" && <EditSecurityForm />}

      </div>
      </div>
      
    </>
    
  )
}

export default Setting