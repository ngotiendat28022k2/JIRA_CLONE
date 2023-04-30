import { Button } from '@mui/material'
import React, { useState } from 'react'
import Popup from '../../util/popup'
import SetDataInputForm from './setDataInput'

type Props = {
    input:any,
    onHandleDelete:any,
    onHandleSetValueForm:any,
}


const ItemPageForm = (props: Props) => {
    const {input, onHandleDelete, onHandleSetValueForm} = props
    const [DataInputForm, setDataInputForm] = useState<boolean>(false)

    const handleRenderInput = (input) => {
        if(input.type === "textarea") {
            return(
                    <textarea id={input.name} rows={4} disabled className="w-full block p-2.5 w-full text-sm rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:placeholder-gray-400 outline-none" placeholder="Write your thoughts here..."></textarea>
            )
        }
        if(input.type === "text" || input.type === "date" ){
            return(
                <>
                        <input 
                            disabled
                            type={input.type} 
                            name={input.name} 
                            placeholder={input.name} 
                            className="border-[1px] pl-[10px] py-[10px] w-full outline-none capitalize"
                        />
                </>
            )
        }
        if(input.type === "checkbox"){
            return(
                <>
                    <input 
                            disabled
                            type={input.type} 
                            name={input.name} 
                            placeholder={input.name} 
                            className="border-[1px] pl-[10px] py-[10px] w-full outline-none capitalize"
                        />
                </>
            )
        }
        if(input.type === "select"){
            return(
                <select id="countries" className=" border outline-none text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option selected>Option</option>
                    {input.options.map(option => {
                        return(
                            <option value={option}>{option}</option>
                        )
                    })}
                </select>
            )
        }
    }

    const IsInputForm = () => {
        setDataInputForm(true)
    }

    const handleSetValueInput = (value) => {
        onHandleSetValueForm(value)
        console.log("handleSetValueInput", value);
    }
   
  return (
    <div className='border-[1px] border-[#333] my-[10px] p-[5px]' onClick={() => IsInputForm()}>
            <div className='text-left my-[10px]'>
                <label htmlFor="">{input.name}:</label>
            </div>
        <div  className='flex justify-between items-center border-[1px] border-[#333] p-[5px]'>
            
            <div aria-disabled>
                {handleRenderInput(input)}
            </div>
            <div className='ml-[10px]'><Button variant='contained' color='error' onClick={() => onHandleDelete(input.id)}>delete</Button></div>
        </div>

        <div>
           <SetDataInputForm dataInput={input} handleSetValueInput={handleSetValueInput}/>
        </div>
        {/* <Popup
             popup={DataInputForm}
             setPopup={setDataInputForm}
             title="set data input"
        >
           <SetDataInputForm dataInput={input} handleSetValueInput={handleSetValueInput}/>
        </Popup> */}
    </div>
  )
}

export default ItemPageForm