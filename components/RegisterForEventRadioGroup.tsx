import { RadioGroup } from '@/components/ui/radio-group'
import { RadioGroupItem } from '@/components/ui/radio-group'
import React from 'react'
import { Label } from '@/components/ui/label'

const RegisterForEventRadioGroup = () => {
  return (
    <RadioGroup defaultValue="cash" className='flex flex-col gap-4'>
    <div className="flex items-center space-x-2">
      <RadioGroupItem value="cash" id="option-one" />
      <Label htmlFor="option-one">
        <div className="flex flex-col justify-center ">
          <h1 className="text-base font-semibold">Cash</h1>
          <p className="text-sm   text-[#999999] ">Pay with cash upon arrival</p>
        </div>
      </Label>
    </div>
    <div className="flex items-center space-x-2">
      <RadioGroupItem value="bank-tranfer" id="option-one" />
      <Label htmlFor="bank-tranfer">
        <div className="flex flex-col">
          <h1 className=" text-base font-semibold">Direct Bank Transfer</h1>
          <p className="text-sm  text-[#999999] ">Make payment directly through bank account</p>
        </div>
      </Label>
    </div>
    <div className="flex items-center space-x-2">
      <RadioGroupItem value="card" id="option-one" />
      <Label htmlFor="option-one">
        <div className="flex flex-col ">
          <h1 className="text-base font-semibold">Pay via Credit/Debit Card</h1>
          <p className="text-sm  text-[#999999]  ">Pay with your Visa/Mastercard</p>
        </div>
      </Label>
    </div>
  
  </RadioGroup>
  )
}

export default RegisterForEventRadioGroup