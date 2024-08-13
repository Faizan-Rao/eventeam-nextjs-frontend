import React from 'react'
import ManifyingGlass from '@/components/icons/ManifyingGlass'
import { useTranslation } from 'react-i18next'

const SearchInput = () => {
  const {t}  = useTranslation()
  return (
    <div className='flex gap-4  w-[20%] justify-center min-h-1 text-[#BABABA] py-2    border-b-[2px] border-b-[#e7e7e7] items-center text-sm bottom-1 '>
        <ManifyingGlass/>
        <input type="text" max={40} className='border-transparent w-full focus:outline-none' placeholder={t('Search here...')} name="search"  />
    </div>
  )
}

export default SearchInput