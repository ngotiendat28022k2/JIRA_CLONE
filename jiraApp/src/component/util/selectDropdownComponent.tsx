import React from 'react'
import { ICategory } from '../../interfaces/ICategory'

type Props = {
  optionCategory:ICategory[]
}

const SelectDropdownComponent = (props: any) => {
  const {
    option,
    onChange,
    selectKey,
    placeholder = "",
    open,
    setOpen
  } = props
  console.log("props SelectDropdownComponent", props);
  
  return (
    <div>SelectDropdownComponent</div>
  )
}

export default SelectDropdownComponent