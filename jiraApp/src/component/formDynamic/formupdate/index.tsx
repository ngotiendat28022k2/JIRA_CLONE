import { Box, Button, FormControlLabel, FormGroup, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchDynamic, updateDynamic } from '../../../slice/dynamic'
import CustomInput from '../../util/customInput'
type Props = {
  formData:any,
  router:any
}

const FormUpdateDynamic = (props: Props) => {
  const formData = props.formData.data
  const router = props.router
  const dispatch = useDispatch()
  const [valueInput, setValueInput] = useState<Object>()
 

  useEffect(() => {
    (async() => {
        const {payload:data} = await dispatch(fetchDynamic(router))
        setValueInput(data)        
    })()
  }, [])

  

  const onChangInput = (name, value) => {
    // console.log(name, value);
    const obj = {}
    obj[name] = value
    setValueInput((prev:any) => ({...prev, ...obj}))
  }

  const handleUpdateData =async () => {
    const data = {
      data:valueInput,
      router
    }
    console.log(router);
    
    await dispatch(updateDynamic(data)).then(() => {
      alert("update successfully")
      location.reload()
    }).catch((error) => {
      console.log(error);
      
    })
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
                    <CustomInput data={data} value={valueInput} 
                    onChangInput={onChangInput}
                    />
                </div>
              )
            })}
          </div>
          <div className='text-right mt-[15px]'>
            <Button
              variant='contained'
              sx={{textAlign:"right"}}
              onClick={() => handleUpdateData()}
            >
              submit
            </Button>
          </div>
    </Box>
  )
}

export default FormUpdateDynamic