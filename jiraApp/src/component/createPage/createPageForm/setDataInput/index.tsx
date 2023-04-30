import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import { Button } from '@mui/material';


const label = { inputProps: { 'aria-label': 'Switch demo' } };
type Props = {
  dataInput:any,
  handleSetValueInput:any
}

const SetDataInputForm = (props: Props) => {
  const dataInput = props.dataInput
  const handleSetValueInput = props.handleSetValueInput
  const [textArea, setTextArea] = React.useState("");
  const [inputValue, setInputValue] = useState({
    type:dataInput.type,
    name:dataInput.name,
    options:dataInput.options ? dataInput.options : [],
    field:dataInput.name
  })

  useEffect(() => {
    setInputValue(dataInput)
    setTextArea(inputValue?.options.join("\n"));
  }, [])

  const handleGetOption = (data) => {
    setTextArea(data);
    setInputValue((prev) => ({...prev, options: data.split("\n")}))
  }

  console.log("textArea", textArea)
  console.log("inputValue", inputValue)

  const handleSubmitSetInput = () => {
    handleSetValueInput(inputValue)
  }

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
        <div className=''>
          <label htmlFor="name">Name</label>
          <input 
              id='name'
              type="text" 
              className='border-[1px] border-[#333] outline-none py-[10px] w-full pl-[10px] rounded-md'
              onChange={(event) => setInputValue((prev) => ({...prev, name:event.target.value}))}
              value={inputValue?.name}
          />
        </div>
        <div>
          <label htmlFor="type">Type</label>
          <input 
              id='type'
              type="text" 
              className='border-[1px] border-[#333] outline-none py-[10px] w-full pl-[10px] rounded-md'
              onChange={(event) => setInputValue((prev) => ({...prev, type:event.target.value}))}
              value={inputValue?.type}
          />
        </div>

        {inputValue.options ?( 
          <div>
            <label htmlFor="options">Option</label><br />
            <textarea id="options" name="options" rows={4} 
              className="border-[#333] border-[1px] outline-none rounded-md p-[10px] w-full"
              onChange={(event) => handleGetOption(event.target.value)}
              value={textArea}
            >
            </textarea>
          </div>) : ""
          }

          <div className='text-right'>
            <Button variant='contained' onClick={() => handleSubmitSetInput()}>Submit</Button>
          </div>
    </Box>
  )
}

export default SetDataInputForm