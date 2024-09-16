import { AtSign, Phone, MapPin } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const CompanyHeader = () => {
  return (
    <div className="flex flex-col  bg-[#7655fa] py-10 min-h-[450px]">
    {/* Header Container*/}
    <div className="container">
      <div className="flex-1 flex justify-between items-center gap-4 pb-4 border-b-[1px] border-[#FFFFFFB2]  text-white">
        <h1 className="font-semibold text-2xl">EvenTeam</h1>
        <h1 className="font-semibold text-lg">Event Management System</h1>
      </div>

      <div className="flex-1 min-h-[250px] flex justify-between items-center gap-10 pb-4   text-white">
        {/* Company Name & Logo */}
        <div className="flex gap-4 items-center">
          <span className="flex justify-center items-center ">
            <Image
              src={"/profile_logo.svg"}
              height={75}
              width={75}
              alt="company_logo"
            />
          </span>

          <div className="flex flex-col my-10">
            <h1 className="text-white font-semibold text-3xl">
              Company Name
            </h1>
            <h1 className="text-[#FFFFFFB2] font-semibold text-lg">
              Company events
            </h1>
          </div>
        </div>
        {/* Company Details */}
        <div className="flex-1 flex flex-col gap-4 justify-center-center">
          <div className="flex  gap-4">
            <span className="flex gap-4">
              <AtSign className="text-white" />
              <span className="text-white font-white ">
                company@gmail.com
              </span>
            </span>
            <span className="flex gap-4">
              <Phone className="text-white" />
              <span className="text-white font-white ">
                company@gmail.com
              </span>
            </span>
          </div>
          <span className="flex gap-4">
            <MapPin className="text-white" />
            <span className="text-white font-white ">
              789 Willowbrook Lane, Apt 22B, New Jersey Street, New York{" "}
            </span>
          </span>
        </div>
      </div>
    </div>
  </div>
  )
}

export default CompanyHeader