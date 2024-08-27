import ApplicationFeeForm from '@/components/forms/form-fields/ApplicationFeeForm'
import FormFieldForm from '@/components/forms/form-fields/FormFieldForm'
import GuestFieldForm from '@/components/forms/form-fields/GuestFieldForm'
import MainContentGrid from '@/components/MainContentGrid'
import PageTitleContainer from '@/components/PageTitleContainer'
import React from 'react'

const FormField = () => {
  return (
    <MainContentGrid>
        <PageTitleContainer title='Form Fields'/>
        <div className='flex justify-between gap-4'>
            <FormFieldForm/>
            <div className='flex-1 flex flex-col gap-4'>
                <ApplicationFeeForm/>
                <GuestFieldForm/>
            </div>

        </div>
    </MainContentGrid>
  )
}

export default FormField