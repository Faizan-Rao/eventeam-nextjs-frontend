'use client'
import React, { useEffect, useMemo, useState } from 'react'
import MyEventKPICont from './MyEventKPICont'
import { MyEventTable } from './tables/MyEvent/data-table'
import { columns } from './tables/MyEvent/column'

import { useQuery } from '@tanstack/react-query'
import { Events } from '@/configs/apiRoutes'

const MyEventMainCont = () => {
  const {data: events, isError, isPending} = useQuery({
    queryKey: ["my-events"],
    queryFn: Events.get
  })

console.log("my fetched events", events?.data.data)
 
  return (
    <div className='flex flex-col min-h-[100vh]  bg-[#fffefe] flex-1 p-5 rounded-md'>
        <MyEventKPICont/>
        <MyEventTable data={events?.data.data || []} columns={(columns as any)}/>
    </div>
  )
}

export default MyEventMainCont