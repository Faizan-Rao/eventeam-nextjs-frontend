
import React from 'react'
import MyEventKPICont from './MyEventKPICont'
import { MyEventTable } from './tables/MyEvent/data-table'
import { columns } from './tables/MyEvent/column'
import data from '@/dummy/data_table_my_events.json'

const MyEventMainCont = () => {
  return (
    <div className='flex flex-col  bg-[#fffefe] flex-1 p-5 rounded-md'>
        <MyEventKPICont/>
        <MyEventTable data={data} columns={(columns as any)}/>
    </div>
  )
}

export default MyEventMainCont