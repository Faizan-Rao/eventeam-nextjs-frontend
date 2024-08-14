import React from 'react'
import KPIContainer from './KPIContainer'
import EventDashContainer from './EventDashContainer'

const MainContainer = () => {
  return (
    <div className='grid m-8 p-4  gap-4 bg-[#fffefe] rounded-lg grid-col-12 '>
        <div className='col-span-12 '>
            <KPIContainer/>
        </div>
        <div className='col-span-12'>
          <EventDashContainer/>
        </div>
    </div>
  )
}

export default MainContainer