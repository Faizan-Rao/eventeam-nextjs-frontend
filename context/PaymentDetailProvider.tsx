'use client'

import React, { createContext, useContext, useState } from 'react'
import dummyData from '@/dummy/payment_details_dummy.json'

interface  IPaymentDetailProvider {
    data? : any[],
    setData? : React.Dispatch<React.SetStateAction<any[]>>
}

 export const PaymentDetailContext = createContext(dummyData)



const PaymentDetailProvider = ({
    children
} : {children : React.ReactNode}) => {
    const [data, setData] = useState<any[]>(dummyData)
    // console.log(data)
  return (
    <PaymentDetailContext.Provider value={({data, setData} as any)} >
        {children}
    </PaymentDetailContext.Provider>
  )
}

export default PaymentDetailProvider