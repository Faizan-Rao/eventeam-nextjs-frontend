import React from 'react'
import PaymentMethodCard from './PaymentMethodCard'

const PaymentMethodMainCont = () => {
  return (
    <div className='flex flex-col gap-4 bg-[white] rounded-md min-h-screen p-6'>
        <PaymentMethodCard/>
    </div>
  )
}

export default PaymentMethodMainCont