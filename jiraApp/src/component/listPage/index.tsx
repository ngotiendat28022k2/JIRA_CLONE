import Box from '@mui/material/Box'
import { DataGrid } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchPages, removePage } from '../../slice/page'
import HeaderIssue from '../header/headerIssue'
import TableDynamic from '../tableDynamic'
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button'
import Notification from '../util/notification'
import ConfirmDialog from '../util/confirmDialog'
import { useSelector } from 'react-redux'



type Props = {}

const ListPage = (props: Props) => {
    const dispatch = useDispatch()
    const [pages, setPages] = useState([])
    const [notify, setNotify] = useState({isOpen:false, message:"", type:"success"})
    const [dialog, setDialog] = useState({isOpen:false, title:"", subTitle:"", projectId: undefined as undefined | string })
    const pageStore = useSelector(state => state.page.value)
    useEffect(() => {
        (async() => {
            const {payload:pages} = await dispatch(fetchPages())
            setPages(pages)
        })()
    }, [])
    
    useEffect(() => {
        setPages(pageStore)
    }, [pageStore])
    const onHandleRemove =async (id = null) => {
        if(!id) return;
        setDialog({
            isOpen:true,
            title:"You sure remove project!",
            subTitle:"you cannot undo this action.",
            projectId: id
        })
    }
    const onhandleUpdate = (id = null) => {
        if(!id) return;
        console.log("id", id);
    }
    const columns:any[] = [
        {
            field:"id",
            width:200
        },
        {
            field:"name",
            width:150
        },
        {
            field:"createdAt",
            width:150
        },
        {
            field:"updatedAt",
            width:150
        },
        {
            field: 'action',
            headerName: 'Acction',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 210,
            renderCell: (params:any) => 
                <div className='flex items-center justify-start outline-none'>
                    <div 
                        className='bg-[#037af9] p-[5px] rounded-md hover:bg-[#3188e4] cursor-pointer'
                    >
                        <Button
                          onClick={() => onhandleUpdate(params.id)}
                        >
                          <SystemUpdateAltIcon
                            sx={{
                                color:"#fff",
                            }}
                          />
                        </Button>
                    </div>
                    <div 
                        className='bg-[#da5b6a] p-[5px] rounded-md  hover:bg-[#e16e7b] cursor-pointer ml-[10px]'
                        >
                         <Button
                            onClick={() => onHandleRemove(params.id)}
                        >
                          <DeleteIcon
                            sx={{
                                color:"#fff"
                            }}
                        />
                        </Button>
                        
                    </div>

                    
                </div>
        },
    ] 
  return (
    <>
        <header>
            <HeaderIssue/>
        </header>

        
        <Box sx={{ height: 527, width: '99%', marginTop:"13px" }}>
            <DataGrid
              rows={pages}
              columns={columns}
              initialState={{
                  sorting:{ sortModel:[
                      {field:"createdAt", sort:"asc"}
                  ]}
              }}
              pageSize={8}
              rowsPerPageOptions={[5]}
              checkboxSelection
              disableSelectionOnClick
              disableDensitySelector
              experimentalFeatures={{ newEditingApi: true }}
              
            />
          </Box>
          <ConfirmDialog 
            confirmDialog={dialog}
            setConfirmDialog={setDialog}
            onConfirm={(id:string) => {
                console.log("id", id)
                dispatch(removePage(id as string))
                setNotify({
                isOpen:true,
                message:"Remove Project Successfully !!",
                type:"success"
                })
                
          }}
        /> 
    </>
  )
}

export default ListPage