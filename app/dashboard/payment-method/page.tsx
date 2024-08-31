import MainContentGrid from '@/components/MainContentGrid'
import PageTitleContainer from '@/components/PageTitleContainer'
import PaymentMethodMainCont from '@/components/PaymentMethodMainCont'
import React from 'react'

const PaymentMethod = () => {
  return (
    <MainContentGrid>
        <PageTitleContainer title='Payment Methods'/>
        <PaymentMethodMainCont/>
    </MainContentGrid>
  )
}

export default PaymentMethod