
import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import DotThreeVertical from './icons/DotThreeVertical'
  
const ActionDropDown =  () => {
    
  return (
    <DropdownMenu modal={false}>
    <DropdownMenuTrigger>
        <DotThreeVertical/>
    </DropdownMenuTrigger>
    <DropdownMenuContent >
    
      
      <DropdownMenuItem className='text-sm'>Edit Event</DropdownMenuItem>
      <DropdownMenuItem className='text-sm'>View Event</DropdownMenuItem>
      <DropdownMenuItem className='text-sm'>Delete Event</DropdownMenuItem>
     
    </DropdownMenuContent>
  </DropdownMenu>
  
  )
}

export default ActionDropDown