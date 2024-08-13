import React from 'react'
import ManifyingGlass from '@/components/icons/ManifyingGlass'
import { useTranslation } from 'react-i18next'

const SearchInput = () => {
  const {t}  = useTranslation()
  return (
    <div className='flex gap-4  w-[20%] cursor-pointer justify-center min-h-1 text-[#BABABA] py-2    
   
    sm:border-b-none md:border-b-[2px] border-b-[#e7e7e7] items-center text-sm bottom-1 '>
        <ManifyingGlass/>
        <input type="text" max={0} className='sm:hidden md:block  border-transparent w-full cursor-pointer focus:outline-none' placeholder={t('Search here...')} name="search" disabled  />
    </div>
  )
}

export default SearchInput