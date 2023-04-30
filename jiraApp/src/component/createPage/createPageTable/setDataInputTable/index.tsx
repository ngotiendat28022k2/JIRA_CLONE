import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';


const label = { inputProps: { 'aria-label': 'Switch demo' } };
type Props = {}

const SetDataInputForm = (props: Props) => {
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
        <div>
          <label htmlFor="name">Name</label>
          <input 
              id='name'
              type="text" 
              className='border-[1px] border-[#333] outline-none py-[10px] w-full pl-[10px] rounded-md'
          />
        </div>
        <div>
          <span className='capitalize text-[16px] text-[#333] font-semibold'>required</span><Switch {...label} />
        </div>
        <div>
          <span className='capitalize text-[16px] text-[#333] font-semibold'>disabled</span><Switch {...label} />
        </div>
    </Box>
  )
}

export default SetDataInputForm