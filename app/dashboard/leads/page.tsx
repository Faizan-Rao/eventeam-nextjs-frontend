import CompaniesMainCont from '@/components/CompaniesMainCont'
import LeadsContainer from '@/components/LeadsContainer'
import MainContentGrid from '@/components/MainContentGrid'
import PageTitleContainer from '@/components/PageTitleContainer'
import React from 'react'

const Companies = () => {
  return (
    <MainContentGrid>
      <PageTitleContainer title='Leads'/>
      <LeadsContainer/>
    </MainContentGrid>
  )
}

export default Companies