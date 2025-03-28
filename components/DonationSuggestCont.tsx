import React from 'react'
import DonationSuggestCard from './DonationSuggestCard'
import { clsx } from 'clsx'
import { useTranslation } from 'react-i18next'


const DonationSuggestCont = ({
    isOpen = false
}) => {
  const {t} = useTranslation(["translation"])
  return (
    <div className= { clsx('flex  flex-col gap-4 bg-[#7655fa26] transition-all  p-6 rounded-md ')}>
        <span className='text-[#4a4a4a] font-semibold text-base'>
            {t("Donation Suggestions")}
        </span>
        <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:md:grid-cols-3  gap-3'>
            <DonationSuggestCard/>
            <DonationSuggestCard/>
            <DonationSuggestCard/>
          
        </div>
    </div>
  )
}

export default DonationSuggestCont