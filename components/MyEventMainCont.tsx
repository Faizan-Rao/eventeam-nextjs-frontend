'use client'
import React, { useEffect, useMemo, useState } from 'react'
import MyEventKPICont from './MyEventKPICont'
import { MyEventTable } from './tables/MyEvent/data-table'
import { columns } from './tables/MyEvent/column'
import data from '@/dummy/data_table_my_events.json'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { IAutoConfig } from './forms/auto-config/AutoConfigForm'

const MyEventMainCont = () => {
  const autoConfig = useSelector((state)=>(state as RootState).autoConfig.value)
 
  const data = useMemo(()=>autoConfig, [autoConfig])


 
  return (
    <div className='flex flex-col min-h-[100vh]  bg-[#fffefe] flex-1 p-5 rounded-md'>
        <MyEventKPICont/>
        <MyEventTable data={data} columns={(columns as any)}/>
    </div>
  )
}

export default MyEventMainCont