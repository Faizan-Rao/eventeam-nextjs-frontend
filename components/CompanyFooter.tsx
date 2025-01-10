'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
const CompanyFooter = () => {
  return (
    <div className="flex flex-col  bg-[#7655fa] py-10 min-h-[250px]">
    {/* Header Container*/}
    <div className="container">
      <div className="flex-1 flex justify-between items-center gap-4 pb-4 border-b-[1px] border-[#FFFFFFB2]  text-white">
        <h1 className="font-semibold sm:text-xl md:text-2xl">EvenTeam</h1>
        <div className="flex gap-4">
          <Image
            src={"/social-icons/facebook.svg"}
            alt="social-logo"
            width={20}
            height={25}
          />
          <Image
            src={"/social-icons/insta.svg"}
            alt="social-logo"
            width={20}
            height={25}
          />
          <Image
            src={"/social-icons/x.svg"}
            alt="social-logo"
            width={20}
            height={25}
          />
          <Image
            src={"/social-icons/linkedIn.svg"}
            alt="social-logo"
            width={20}
            height={25}
          />
          <Image
            src={"/social-icons/youtube.svg"}
            alt="social-logo"
            width={20}
            height={25}
          />
        </div>
      </div>

      <div className="flex-1 sm:text-sm md:text-base flex justify-between sm:flex-col md:flex-row  md:items-center sm:items-start gap-4 pb-4 my-8 text-white">
        <h1 className=" sm:text-sm md:text-base">Copyright © 2024. All rights reserved</h1>
        <div className="flex sm:flex-col md:flex-row gap-4">
        <Link href={"#"} className="text-white">Privacy Policy</Link>
        <Link href={"#"} className="text-white">Terms of Service</Link>
        <Link href={"#"} className="text-white">Cookie Settings</Link>
        </div>
      </div>
    </div>
  </div>
  )
}

export default CompanyFooter