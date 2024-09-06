import React from 'react'


interface IKPICard {
    title: string,
    value: string,
    icon?: React.ReactNode
    currency?: string
}

const KPICard : React.FC<IKPICard> = ({
    title = "No Title",
    value = "0",
    icon,
    currency
}) => {
  return (
    <div className='flex  sm:min-w-[200px] hover:bg-[#7655fa] group   text-[#4A4A4A] hover:text-white  flex-1 transition-all  sm:gap-2 md:gap-5 p-4  bg-[#F7F6F9] rounded-md'>
        <div className='flex aspect-square h-[50px]  object-cover text-[#7655fa]  group-hover:text-white  group-hover:bg-[#6349cd]  bg-[#7655FA26]  justify-center items-center p-1 rounded-md'>
           { icon && icon}
        </div>

        <div className='flex  justify-center   flex-col  '>
            <p className=' text-nowrap text-[#999999] group-hover:text-[white] text-[13px] font-semibold'>{title}</p>
            <p className=' text-xl font-semibold flex  '>{currency}{value}</p>
        </div>
    </div>
  )
}

export default KPICard