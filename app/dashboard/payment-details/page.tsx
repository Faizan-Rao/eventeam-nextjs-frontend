import MainContentGrid from '@/components/MainContentGrid'
import PageTitleContainer from '@/components/PageTitleContainer'
import PaymentDetailMain from '@/components/PaymentDetailMain'
import React from 'react'

const PaymentDetails = () => {
  return (
   <MainContentGrid>
    <PageTitleContainer title='Registrations & Payments'/>
    <PaymentDetailMain/>
   </MainContentGrid>
  )
}

export default PaymentDetails