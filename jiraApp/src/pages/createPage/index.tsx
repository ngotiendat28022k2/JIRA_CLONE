import { Button, TextField } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import CreatePageForm from '../../component/createPage/createPageForm'
import CreatePageTable from '../../component/createPage/createPageTable'
import HeaderIssue from '../../component/header/headerIssue'
import Popup from '../../component/util/popup'
import {createPage} from "../../slice/page"
type Props = {}

const CreatePage = (props: Props) => {
    const buttons = [
        {
          "name": "create",
          "field": "Create",
          "api": "",
          "model": "post",
          "location": [
            "table"
          ],
          "icon": "fa-solid fa-plus"
        },
        {
          "name": "update",
          "field": "Update",
          "api": "",
          "model": "put",
          "location": [
            "action"
          ],
          "icon": "fa-solid fa-pen-to-square"
        },
        {
          "name": "remove",
          "field": "Remove",
          "api": "",
          "model": "delete",
          "location": [
            "action"
          ],
          "icon": "fa-solid fa-trash"
        }
      ]
    const [CreateFormPopup, setCreateFormPopup] = useState<boolean>(false)
    const [CreateTablePopup, setCreateTablePopup] = useState<boolean>(false)
    const [CreateButton, setCreateButton] = useState([])
    const [dataNewPage, setDataNewPage] = useState<object>({
        name:"",
        table:null,
        form:null,
        field:"",
        buttons:[],
        api:""
    })
    const dispatch = useDispatch()


    const handlePopupForm = () => {
        setCreateFormPopup(true)
    }
    const handlePopupTable = () => {
        setCreateTablePopup(true)
    }

    // useEffect(() => {

    // }, [dataNewPage])


    const onChangeName = (data) => {
        const field = data.replace(/\s+/g, '');
        console.log("field",field);
        setDataNewPage((prev) =>({...prev, name:data, field}) )
    }
    const onChangeApi = (data) => {
        setDataNewPage((prev) =>({...prev, api:data}) )
        const newButton = buttons.map(button => {
            button.api = data
            return button
        })
        setDataNewPage((prev) => ({...prev, buttons:newButton}))
    }

    const handleCreateTable = (value) => {
        setDataNewPage((prev:any) => ({...prev, table:value}))
    }

    const handleCreatePage = async () => {
        console.log("dataNewPage", dataNewPage);
        await dispatch(createPage(dataNewPage)).then(() => {
            try {
                alert("create page successfully")
                location.reload()
            } catch (error) {
                alert("Create false", error)                
            }
        }).catch((error) => {
            alert("create page false")            
        })
    }

    const handleSaveForm = (value) => {
        setDataNewPage((prev:any) => ({...prev, form:value}))
    }

  return (
    <div className='h-[100vh] relative'>
        <div>
            <HeaderIssue/>
        </div>
        <div className='mt-[20px] grid grid-cols-5 gap-4 pr-[20px]'  >
            <TextField id="outlined-basic" label="Name Page" variant="outlined" onChange={(event) => onChangeName(event.target.value)}/>
            <TextField id="outlined-basic" label="Api Page" variant="outlined" onChange={(event) => onChangeApi(event.target.value)}/>
        </div>
        <div className='my-[20px]'>
            <hr/>
        </div>
        <div className='grid grid-cols-6 gap-4 pr-[20px]'>
            <Button variant='contained' onClick={() => handlePopupForm()}>Create Form</Button>
            <Button variant='contained' onClick={() => handlePopupTable()}>Create Table</Button>
        </div>
        <div className='absolute bottom-[70px] right-[40px]'>
            <Button 
                variant='contained' 
                sx={{paddingX:"40px", paddingY:"10px"}}
                onClick={() => handleCreatePage()}
            >
                Create Page
            </Button>
        </div>
        <Popup
              popup={CreateFormPopup}
              setPopup={setCreateFormPopup}
              title="Create Form"
        >
            <CreatePageForm handleSaveForm={handleSaveForm}/>
        </Popup>
        <Popup
             popup={CreateTablePopup}
             setPopup={setCreateTablePopup}
             title="Create Table"
        >
            <CreatePageTable
                handleSaveTable={handleCreateTable}
            />
        </Popup>
    </div>
  )
}

export default CreatePage