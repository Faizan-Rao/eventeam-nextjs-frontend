import React from 'react'
import Image from 'next/image'
const ProfileHeader = () => {
  return (
    <div className='bg-[url("/profile_insignia_bg.svg")] h-[150px] rounded-md w-full flex justify-center items-center gap-4'>
        <div>
            <Image src="/profile_logo.svg" alt="profile_logo" height={70} width={70}   />
        </div>
       <div className='flex flex-col'>
            <h1 className='flex text-[#eaeaea] text-3xl font-semibold'>Company Name</h1>
            <h1 className='text-[#eaeaea] font-semibold text-sm'>Company profile</h1>
       </div>
    </div>
  )
}

export default ProfileHeader