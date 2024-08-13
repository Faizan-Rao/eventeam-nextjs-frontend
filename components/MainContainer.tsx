import React from 'react'
import KPIContainer from './KPIContainer'

const MainContainer = () => {
  return (
    <div className='grid m-8 p-4  bg-[#fffefe] rounded-lg grid-col-12 '>
        <div className='col-span-12 '>
            <KPIContainer/>
        </div>
        
    </div>
  )
}

export default MainContainer