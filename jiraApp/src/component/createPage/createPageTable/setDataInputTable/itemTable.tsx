import React, {useState, useEffect} from 'react'
import { Box, Button, Switch } from '@mui/material'

type Props = {
    col:any,
    onHandleDelete:any,
    onHandleSetValueTable:any
}
const ItemTable = (props: Props) => {
    const {col, onHandleDelete, onHandleSetValueTable} = props
    const [valueTable, setValueTable] = useState({
        id:col.id,
        name:col.name,
        type:col.type,
        field:col.field,
        width:col.width,
        isHidden:col.isHidden
    })
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        setValueTable(valueTable)
        onHandleSetValueTable(valueTable)
    }, [valueTable])

    useEffect(() => {
      setValueTable((prev) => ({...prev, isHidden:checked}))
    }, [checked])
    const handleHidden = (data) => {
      console.log(!data);
    }
    // console.log("valueTable", valueTable);
  return (        
    <div className='flex justify-between items-center'>
                          <div 
                            className='my-[10px] focus:border-[1px] focus:border-[#333] focus:bg-black w-[80%] flex justify-between items-end'>
                          <input type="text" 
                            placeholder="field"
                            className="border-[1px] pl-[10px] py-[10px] w-[70%] outline-none capitalize"
                            onChange={(e) => {
                              console.log(e.target.value)
                              setValueTable(prev => {
                                prev["name"] = e.target.value
                                prev["field"] = e.target.value
                                prev["type"] = "text"

                                return {...prev}
                              })
                            }}
                            
                          />
                          <input type="text" 
                            className="border-[1px] pl-[10px] py-[10px] w-[25%] outline-none capitalize"
                            placeholder='width'
                            onChange={(e) => {
                              console.log(e.target.value)
                              setValueTable(prev => {
                                prev["width"] = parseInt(e.target.value)
                                return {...prev}
                              })
                            }}
                          />
                          </div>
                          <div>
                          <Switch
                              checked={checked}
                              onChange={() => setChecked(!checked)}
                              inputProps={{ 'aria-label': 'secondary checkbox' }}
                              value={checked}
                          />
                          </div>
                         <div>
                          <Button 
                            variant='contained' 
                            color='error'
                            onClick={() => onHandleDelete(col.id)}
                          >
                            delete
                          </Button>
                         </div>
                        </div>
  )
}

export default ItemTable