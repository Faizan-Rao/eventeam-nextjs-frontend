'use client'
import { Payment } from '@/components/tables/PaymentDetail/column'
import React, { createContext, useContext, useState } from 'react'
import dummyData from '@/dummy/payment_details_dummy.json'

interface  IPaymentDetailProvider {
    data? : Payment[],
    setData? : React.Dispatch<React.SetStateAction<Payment[]>>
}

 export const PaymentDetailContext = createContext(dummyData)



const PaymentDetailProvider = ({
    children
} : {children : React.ReactNode}) => {
    const [data, setData] = useState<Payment[]>(dummyData)
    // console.log(data)
  return (
    <PaymentDetailContext.Provider value={({data, setData} as any)} >
        {children}
    </PaymentDetailContext.Provider>
  )
}

export default PaymentDetailProvider