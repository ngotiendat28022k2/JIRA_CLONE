import React, { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles';
import { Box, Button, FormControlLabel, FormGroup, TextField } from '@mui/material'
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { v4 as uuidv4 } from "uuid";
import ItemPageForm from './itemPageForm';

type Props = {
  handleSaveForm:any
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));


// {name:"", field:"", type:"", required: false},
const CreatePageForm = (props: Props) => {
  const handleSaveForm = props.handleSaveForm
  const buttonAdd = [
    {
      name: "Checkbox",
      data: {
        id:uuidv4(),
        name: "Checkbox",
        options: ["1", "2", "3"],
        type:"checkbox"
      },
    },
    {
      name: "Text",
      data: {
        id:uuidv4(),
        name: "Text",
        type: "text",
      },
    },
    {
      name: "Text Area",
      data: {
        id:uuidv4(),
        name: "Text Area",
        type: "textarea",
      },
    },
    {
      name: "Date",
      data: {
        id:uuidv4(),
        name: "Date",
        type: "date",
      },
    },
    {
      name: "Select",
      data: {
        id:uuidv4(),
        name: "Select",
        type: "select",
        options: ["1", "2", "3"]
      },
    },
  ];

  const [valueForm, setValueForm] = useState<any[]>([])
  const [valueInputForm, setValueInputForm] = useState({
    name:"",
    type:"",
  })
  const [form, setForm] = useState<object>({
    title:"",
    data:[]
  })
  
  const handleAddInput = (value) => {
    setValueForm([...valueForm, value])
    
  }

  console.log("valueForm", valueForm);
  
  const handleDeleInput = (id) => {
    const value = valueForm.filter(value => value.id !== id)
    console.log(value);
    setValueForm(value)
  }

  const onHandleSetValueForm = (data) => {
    // console.log("onHandleSetValueForm ppp", value);
    
      const newValue = valueForm.map(value => {
        if(value.id === data.id){
          return data
        } 
        return value
      })
      setValueForm(newValue)
      setForm((prev) => ({...prev, data:valueForm}))      
  }

  const handleGetOption = (data) => {
    const n = data.trim()
    const a = n.split("\n")
    console.log(a);
    const c = a.map(a => {
        const b = a.trim()
        return b
    })
    const options = c.filter(c => c !== "")
    setValueInputForm((prev:any) => ({...prev, options}))
  }

  const handleSave = () => {
    setForm((prev) => ({...prev, data:valueForm}))
  }
  useEffect(() => {
    handleSaveForm(form)
  }, [form])
  
  return (
    <div>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '100%' },
          }}
          noValidate
          autoComplete="off"
        >
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <Item>
                  {
                    valueForm.map((value, index) => {
                        return(
                         <ItemPageForm
                          key={value.id}
                          input={value}
                          onHandleDelete={handleDeleInput}
                          onHandleSetValueForm={onHandleSetValueForm}

                         />
                        )
                    })
                  }
                </Item>
              </Grid>
              <Grid item xs={4}>
                <div>
                  <div className='mb-[20px]'>
                    <input 
                      type="text" 
                      placeholder='title'
                      className='py-[8px] pl-[10px] outline-none capitalize border-[1px] border-[#b6b6b6] rounded-md w-full'
                      onChange={(event) => setForm((prev) => ({...prev, title:event.target.value}))}
                    />
                  </div>
                  <div className='pl-[10pxf]'>
                    <div className='my-[5px]'>
                     {buttonAdd.map((button) => {
                         return(
                          <button 
                            key={button.name}
                            type='button'
                            className='my-[5px] border border-[1px] border-blue-500 border-dashed px-[60px] py-[10px] rounded-md text-[#333] font-semibold capitalize transition ease-in-out delay-90 hover:text-blue-600'
                            onClick={() => handleAddInput(button.data)}
                          >
                           {button.name}
                          </button>
                         )
                     })}
                    </div>
                  </div>

                  <div>
                    <hr />
                  </div>
                  
                </div>
              </Grid>
              <Grid item xs={12} sx={{textAlign:"right", mt:"20px"}}>
              {valueForm.length > 0 &&  <Button
              onClick={() => handleSave()}
                    variant='contained'
                  >
                    Save Form
                  </Button>}
              </Grid>
             
            </Grid>
        </Box>



    </div>
  )
}

export default CreatePageForm