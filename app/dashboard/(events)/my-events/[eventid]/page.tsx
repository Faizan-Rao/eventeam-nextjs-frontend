import MainContentGrid from '@/components/MainContentGrid'
import PageTitleContainer from '@/components/PageTitleContainer'
import SingleEventCont from '@/components/SingleEventCont'
import React from 'react'

const SingleEvent = () => {
  return (
    <MainContentGrid>
        <PageTitleContainer title={"View Event"}/>
        <SingleEventCont/>
    </MainContentGrid>
  )
}

export default SingleEvent