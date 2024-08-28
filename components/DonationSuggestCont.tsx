import React from 'react'
import DonationSuggestCard from './DonationSuggestCard'
import { clsx } from 'clsx'


const DonationSuggestCont = ({
    isOpen = false
}) => {
  return (
    <div className= { clsx('flex tr flex-col gap-4 bg-[#7655fa26] transition-all  p-6 rounded-md container ')}>
        <span className='text-[#4a4a4a] font-semibold text-base'>
            Donation Suggestions
        </span>
        <div className='flex  p-3  gap-4 flex-wrap '>
            <DonationSuggestCard/>
            <DonationSuggestCard/>
            <DonationSuggestCard/>
            <DonationSuggestCard/>
        </div>
    </div>
  )
}

export default DonationSuggestCont