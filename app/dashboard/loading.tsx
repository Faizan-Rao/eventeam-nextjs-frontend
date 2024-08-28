'use client'
import React from 'react'
import  HashLoader from 'react-spinners/HashLoader'

const Loading = () => {


 
  return (
     <div className='flex min-h-screen w-full items-center justify-center '>
      <HashLoader
        color={"#7655fa"}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  )
}

export default Loading