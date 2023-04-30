import { Box, Button, FormControlLabel, FormGroup, TextField } from '@mui/material'
import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import CustomInput from '../../util/customInput'
import { createDynamic } from '../../../slice/dynamic'
type Props = {
  formData:any,
  router:any
}

const FormCreateDynamic = (props: Props) => {
  const formData = props.formData.data
  const router = props.router
  console.log(formData);
  // const {user} = JSON.parse(localStorage.getItem("user") || "")
  const [valueInput, setValueInput] = useState<Object>()
  const dispatch = useDispatch()
  const handleOnSubmit = () => {
    const data = {
      router, 
      valueInput,
    }
    dispatch(createDynamic(data))
  }
  const onChangInput = (name, value) => {
      // console.log(name, value);
      const obj = {}
      obj[name] = value
      setValueInput((prev:any) => ({...prev, ...obj}))
  }
  
  return (
     <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '100%' },
      }}
      noValidate
      autoComplete="off"
      width={750}
    >
          <div className='grid grid-cols-2 gap-4'>
            {formData.map((data, index) => {
              return (
                <div key={index}>
                  <CustomInput data={data} onChangInput={onChangInput}/>
                </div>
              )
            })}
          </div>
          <div className='text-right mt-[15px]'>
            <Button
              variant='contained'
              sx={{textAlign:"right"}}
              onClick={() => handleOnSubmit()}
            >
              Submit
            </Button>
          </div>
    </Box>
  )
}

export default FormCreateDynamic