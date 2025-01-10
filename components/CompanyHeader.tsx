import { AtSign, Phone, MapPin, Book } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import parser from 'html-react-parser'
const CompanyHeader = ({data} : {data : any}) => {
  return (
    <div className="flex flex-col  bg-[#7655fa] py-10 sm:h-full md:min-h-[450px]">
    {/* Header Container*/}
    <div className="container">
      <div className="flex-1 flex justify-between items-center gap-4 pb-4 border-b-[1px] border-[#FFFFFFB2]  text-white">
        <h1 className="font-semibold sm:text-xl md:text-2xl">EvenTeam</h1>
        <h1 className="font-semibold sm:hidden md:block text-lg">Event Management System</h1>
      </div>
    
     {data && <div className="flex-1 min-h-[250px] flex sm:flex-col md:flex-row justify-between items-center gap-10 pb-4   text-white">
        {/* Company Name & Logo */}
        <div className="flex gap-4 items-center">
          <div className="flex justify-center rounded-full overflow-hidden items-center m-4">
            <Image
              src={data?.photo || ""}
              className='sm:w-[5rem] sm:h-[5rem] md:w-[5rem] md:h-[5rem]'
              height={75}
              width={75}
              alt="company_logo"
            />
          </div>

          <div className="flex flex-col my-10">
            <h1 className="text-white font-semibold sm:text-2xl md:text-3xl">
             {data?.full_name || ""}
            </h1>
            <h1 className="text-[#FFFFFFB2] font-semibold text-base">
              Company events
            </h1>
          </div>
        </div>
        {/* Company Details */}
        <div className="flex-1 flex flex-col gap-4 justify-center-center flex-wrap">
          <div className="flex  gap-4 flex-wrap">
            <span className="flex gap-4">
              <AtSign className="text-white" />
              <span className="text-white font-white sm:text-sm md:text-base ">
                {data?.email || ""}
              </span>
            </span>
            <span className="flex gap-4">
              <Phone className="text-white" />
              <span className="text-white font-white sm:text-sm md:text-base ">
                {data?.phone || ""}
              </span>
            </span>
          </div>
          <span className="flex items-center gap-4">
            <Book className="text-white" />
            <span className="text-white font-white sm:text-sm md:text-base">
              {parser(data?.about) || ""}
            </span>
          </span>
        </div>
      </div>}
    </div>
  </div>
  )
}

export default CompanyHeader