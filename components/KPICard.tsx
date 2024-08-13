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
    <div className='flex min-w-[250px]  gap-5 p-4  bg-[#F7F6F9] rounded-md'>
        <div className='flex aspect-square h-[50px] object-cover bg-[#7655FA26] justify-center items-center p-1 rounded-md'>
           { icon && icon}
        </div>

        <div className='flex justify-center  flex-col  '>
            <p className='text-[#999999] text-xs font-semibold'>{title}</p>
            <p className='text-[#4A4A4A] text-3xl font-semibold flex gap-4 '>{currency} {value}</p>
        </div>
    </div>
  )
}

export default KPICard