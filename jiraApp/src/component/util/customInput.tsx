import React from 'react'
import Checkbox from '@mui/material/Checkbox';
import { TextField } from '@mui/material';
type Props = {
    data:any,
    onChangInput:any,
    value?:any
}

const CustomInput = (props: Props) => {
  const {type, field, name, placeholder, required} = props.data || {}
  const {onChangInput, value} = props
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  // console.log(value);
  console.log(props.data.options && props.data.options);
  
  
    let input
    switch (type) {
      case "text":
            input = <TextField 
            id="outlined-basic"
            sx={{textTransform:"capitalize"}}
            variant="outlined" 
            onChange={(event) => onChangInput(name, event.target.value)}
            value={value?.[name]}
            focused
            defaultValue={value?.[name]}
            />
            break;
            case "date":
              input =<TextField
              id="datetime-local"
              type="datetime-local"
              value={value}
              onChange={(event) => onChangInput(name,event.target.value)}
              InputLabelProps={{
                  shrink: true,
              }}
            />
          break;
          case "option":
            <input type="option" />
            break;
            case "checkbox":
              input = (
                <>
                  {props.data.options && props.data.options.map(option => {
                    <div className="flex items-center">
                      <input id="checked-checkbox" type="checkbox" value={option} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 outline-none" />
                    </div>
                  })}
                </>
              )
              break;
              case "textarea":
                  input=(
                    <>
                        <textarea id="message" rows={4} className="block p-2.5 w-full text-sm rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none" placeholder="Write your thoughts here..."></textarea>
                    </>
                  )
                break;
                case "select":
                  input=(
                    <>
                        <select id="countries" className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none">
                          <option defaultValue="">Select Option</option>
                          {props.data.options && props.data.options.map(option => {
                            <option defaultValue={option} value={option}>{option}</option>
                          })}
                        </select>
                    </>
                  )
                break;
      default:
        break;
    }
    
  return (
    <div>
      <label className='capitalize font-semibold text-[18px] ml-[8px]' htmlFor={name}>{name}:</label>
      {input}
    </div>
  )
}

export default CustomInput