'use client'
import React, { useEffect, useState } from 'react'
import MyEventKPICont from './MyEventKPICont'
import { MyEventTable } from './tables/MyEvent/data-table'
import { columns } from './tables/MyEvent/column'
import data from '@/dummy/data_table_my_events.json'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { IAutoConfig } from './forms/auto-config/AutoConfigForm'

const MyEventMainCont = () => {
  const autoConfig = useSelector((state)=>(state as RootState).autoConfig.value)
 
  


 
  return (
    <div className='flex flex-col  bg-[#fffefe] flex-1 p-5 rounded-md'>
        <MyEventKPICont/>
        <MyEventTable data={autoConfig} columns={(columns as any)}/>
    </div>
  )
}

export default MyEventMainCont