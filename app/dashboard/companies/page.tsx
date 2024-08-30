import CompaniesMainCont from '@/components/CompaniesMainCont'
import MainContentGrid from '@/components/MainContentGrid'
import PageTitleContainer from '@/components/PageTitleContainer'
import React from 'react'

const Companies = () => {
  return (
    <MainContentGrid>
      <PageTitleContainer title='Companies'/>
      <CompaniesMainCont/>
    </MainContentGrid>
  )
}

export default Companies