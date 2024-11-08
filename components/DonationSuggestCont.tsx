import React from 'react'
import DonationSuggestCard from './DonationSuggestCard'
import { clsx } from 'clsx'


const DonationSuggestCont = ({
    isOpen = false
}) => {
  return (
    <div className= { clsx('flex  flex-col gap-4 bg-[#7655fa26] transition-all m-4 p-6 rounded-md ')}>
        <span className='text-[#4a4a4a] font-semibold text-base'>
            Donation Suggestions
        </span>
        <div className='flex-1 flex  p-3  gap-4 flex-wrap '>
            <DonationSuggestCard/>
            <DonationSuggestCard/>
            <DonationSuggestCard/>
          
        </div>
    </div>
  )
}

export default DonationSuggestCont