import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import { Box, Button } from '@mui/material'
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ItemTable from './setDataInputTable/itemTable';
import { useNavigate } from 'react-router-dom';
type Props = {
  handleSaveTable:any
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));


const CreatePageTable = (props: Props) => {
  const [cols, setCols] = useState<any[]>([])
  const {handleSaveTable} = props
  const [table, setTable] = useState({
    title:"",
    data:[]
  })
  const handleAddCols = () => {
    const number = Math.floor(Math.random()*99999999999)
    setCols([...cols, {id:number, name:"", field: "", type:"text", width:200, isHidden: false}])
  }
  console.log("cols", cols);
  
  const handleRemoveCols = (id) =>{
    const col = cols.filter(col => col.id !== id)    
    setCols(col)
  }

  const onHandleValueCol = (value) => {
    // console.log("value", value);
    const valueCols = cols.map(col =>{
      if( col.id === value.id){
        return value
      }
      return col
    })
    setCols(valueCols)
    setTable((prev:any) => ({...prev, data:cols}))
  };


  const handleSave = () => {
    handleSaveTable(table)
    const naviagte = useNavigate()
    naviagte('/create-page')
  }
  return (
    <div>
        <Box
          component="table"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '100%' }
          }}
          autoComplete="off"
          width={850}
        >
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <Item>
                  {
                    cols.length > 0 ? cols.map((col, index) => {
                      return(
                        <ItemTable
                          key={col.id}
                          col={col}
                          onHandleDelete={handleRemoveCols}
                          onHandleSetValueTable={onHandleValueCol}
                        >
                        </ItemTable>
                      )
                  }): ""
                  }
                </Item>
              </Grid>
              <Grid item xs={4}>
                <div>
                  <div className='pl-[10pxf]'>
                    <div className='my-[5px]'>
                       <input type="text" 
                            placeholder="title table"
                            className="border-[1px] rounded-md pl-[10px] py-[10px] w-full outline-none capitalize"
                            onChange={(event) => { 
                                setTable((prev) => ({...prev, title: event.target.value}))
                            }}
                      />
                      <button 
                          type='button'
                          className='mt-[20px] border border-[1px] border-blue-500 border-dashed px-[60px] py-[10px] rounded-md text-[#333] font-semibold capitalize transition ease-in-out delay-90 hover:text-blue-600'
                          onClick={() => handleAddCols()}
                      >
                        add cols
                      </button>
                    </div>
                                 
                   
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} sx={{textAlign:"right", mt:"20px"}}>
                  <Button
                    variant='contained'
                    onClick={() => handleSave()}
                  >
                    Save Table
                  </Button>
              </Grid>
             
            </Grid>
        </Box>
       
    </div>
  )
}

export default CreatePageTable