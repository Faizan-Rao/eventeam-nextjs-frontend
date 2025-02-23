import React from 'react'
import Image from 'next/image'
const ProfileHeader = ({data}: {data:any}) => {
  return (
    <div className='bg-[url("/profile_insignia_bg.svg")] h-[150px] rounded-md w-full flex justify-center items-center gap-4'>
        <div className='rounded-full aspect-square overflow-hidden'>
            <Image src={data?.photo || "/profile_logo.svg"} className=' object-cover aspect-square' alt="profile_logo" height={70} width={70} quality={70}   />
        </div>
       <div className='flex flex-col'>
            <h1 className='flex text-[#eaeaea] text-3xl font-semibold'>{data?.full_name}</h1>
            <h1 className='text-[#eaeaea] font-semibold text-sm'>{data?.email}</h1>
       </div>
    </div>
  )
}

export default ProfileHeader