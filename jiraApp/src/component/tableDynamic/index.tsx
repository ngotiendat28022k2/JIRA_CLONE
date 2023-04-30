import { Box, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import { red } from '@mui/material/colors'
import { DataGrid, GridColDef, GridToolbar, GridToolbarQuickFilter } from '@mui/x-data-grid'
import React, {useEffect, useState, useRef} from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux'
import { removeIssue } from '../../slice/issue'
import ConfirmDialog from '../util/confirmDialog'
import { apiDynamic } from '../../api/apiDynamic'
import dynamic, { reloadSearch, removeDynamic, search } from '../../slice/dynamic'
import Popup from '../util/popup'
import HeaderProject from '../header/headerProject'
import FormCreateDynamic from '../formDynamic/formcreate'
import FormUpdateDynamic from '../formDynamic/formupdate'
import axios from 'axios'
import { useSelector } from 'react-redux'
type Props = {
  formPage:any,
  valuePage:any
}

const authorizationHeader = `Bearer ${JSON.parse(localStorage.getItem("user") || "{}").token}`
const device = localStorage.getItem("device")



const TableDynamic = (props: Props) => {
  // const [formPage, setFormPage] = useState(props.formPage)
  const [columns, setColumns] = useState([])
  const [notify, setNotify] = useState({isOpen:false, message:"", type:"success"})
  const [dialog, setDialog] = useState({isOpen:false, title:"", subTitle:"", projectId: undefined as undefined | string, router: undefined as undefined | {}})
  const [createDataPopup, setCreateDataPopup] = useState(false)
  const [updateDataPopup, setUpdateDataPopup] = useState(false)
  const dispatch = useDispatch()
  const [router, setRouter] = useState<object>()
  const formPage  = props.formPage
  let [searchParams, setSearchParams] = useSearchParams();
  // const valuePage = props.valuePage
  const [valuePage, setValuePage] = useState(props.valuePage)
  const valueStore = useSelector((state:any) => state.dynamic.value)
  const searchStore = useSelector((state:any) => state.dynamic.search)
  const [valueSearch, setValueSearch] = useState({
    column:"id",
    value:""
  })

  console.log("valueStore",props.formPage);

  const htmlElRef = useRef(null)
  // if(!formPage.table && !formPage.form){
  //     <Typography variant="h4" sx={{ color:"#FF0000", position:"absolute", top:"50%", left:"50%"}}>Can't find the data</Typography> 
  // }
 
  const onHandleRemove =async (id = null, api:null, model = null) => {
    if(!id) return;
    setDialog({
      isOpen:true,
      title:"You sure remove project!",
      subTitle:"you cannot undo this action.",
      projectId: id,
      router: {
        model,
        api
      }
    })
  }
  const onHandleUpdate = (id, api:null, model = null) => {
    if(!id) return;
    setRouter({
      id,
      router : {
        api,
        model
      }
    })
    setUpdateDataPopup(true)
  }
  const onHandleCreate = ( api, model) => {
    if(!api && !model) return;
    setRouter({
      api,
      model
    })
    setCreateDataPopup(true)
    // return ()
  }
  const btnRender = (btns, location, idData = null) => {
    if(!btns) return;
    let event
    return btns.map((btn, index) =>  {
      
      if(!btn.location.includes(location)) return;
      
      if(btn.name === "create"){
        event = () => onHandleCreate(btn.api, btn.model)
      }
      if(btn.name === "update"){
        event = () => onHandleUpdate(idData, btn.api, btn.model)
      }
      if(btn.name === "remove"){
        event = () => onHandleRemove(idData, btn.api, btn.model)
      }
      return  (<div 
                key={btn.name}
                className="mr-[5px]"
              > 
                <button
                  onClick={event}
                  className="px-[5px] py-[10px] text-[#fff] text-[16px] bg-[#037af9] rounded-md hover:bg-[#3188e4] cursor-pointer max-w-[130px] w-full flex justify-evenly items-center" 
                >
                  <i className={btn.icon}></i>
                  {btn.field}
                </button>
              </div>)
                     
    })
  }

  useEffect(() => {
    console.log("formPage.table.data.length", formPage.table);
    if(!formPage.table) return;

    const data = formPage?.table.data.filter(data => {
      return data.isHidden === false
    })
    console.log("data", data);
    
    
    const columns: any[] = [
      ...data,
      {
          field: 'action',
          headerName: 'Acction',
          description: 'This column has a value getter and is not sortable.',
          sortable: false,
          width: 210,
          renderCell: (params:any) => 
              <div className='flex items-center justify-start outline-none'>
                {btnRender(formPage.buttons, "action", params.id)}
              </div>
      },
    ];
    setColumns(columns)
  }, [formPage])

  const data = {
    // breadcrumb:"Projects / Project Management",
    title:formPage.table ? formPage.table.title :""
  }

 

  const handleSearch = () => {
    if(valueSearch.value === "") {
      alert("notfound value search")
      valuePage(valueStore)
    }
    const dataSearch = {
      api: formPage.api,
      column: valueSearch.column,
      value:valueSearch.value.trim()
    }
       dispatch(search(dataSearch)).then((res) => {
        console.log("res", res);
        
      }).catch((error) => {
        console.log(error);
        
      })
  }
  const handleReload = () => {
    dispatch(reloadSearch())
    setValueSearch((prev:any) => ({...prev, value:""}))
  }
  useEffect(() => {
    setValuePage(searchStore)
  }, [searchStore])
  
  function QuickSearchToolbar() {
    return (
      <Box
        sx={{
          p: 1,
        }}
      >
        <div className='flex items-center justify-start'>
            <div className='mr-[5px]'>
              <select 
                value={valueSearch.column}
                className='outline-none py-[7px] border-[#333]  w-full max-w-[250px] border-[1px] text-[#333]'
                onChange={(event) => setValueSearch((prev) => ({...prev, column:event.target.value}))}
              >
               {props.formPage.table.data.map(column => (
                <option 
                  key={column?.field}
                  value={column?.field}
                  className="text-[#333]"
                >
                  {column?.field}
                </option>
               ))}
              </select>            
            </div>
            <div>
              <input 
                type="text" 
                value={valueSearch.value}
                className='focus:border-blue-600 px-[7px] border-[1px] outline-none border-[#333] py-[7px] w-full max-w-[250px]' 
                onChange={(event) => setValueSearch((prev) => ({...prev, value:event.target.value}))}
                autoFocus
              />
            </div>
            <div className='ml-[5px]'>
              <Button variant='contained' onClick={handleSearch}>Submit</Button>
              <Button sx={{marginLeft:"5px"}} variant='contained' color='inherit' onClick={() => handleReload()}>Reload</Button>
            </div>
        </div>
      </Box>
    );
  }
  console.log("searchStore", searchStore)
  console.log("props.valuePage",props.valuePage)
  const handleRender = () => {
    return(
        <div>
          <div className='mb-4'>
            <HeaderProject data={data} />
          </div>
          <div className='text-left'>
            {formPage.table ? btnRender(formPage?.buttons, "table", ) : "Notfond Form"}
          </div>
          
          {formPage.table && <Box sx={{ height: 527, width: '99%', marginTop:"13px" }}>
            <DataGrid
              rows={searchStore.length > 0  ? searchStore :props.valuePage  }
              columns={columns}
              initialState={{
                  sorting:{ sortModel:[
                      {field:"createdAt", sort:"asc"}
                  ]}
              }}
              pageSize={8}
              rowsPerPageOptions={[5]}
              // checkboxSelection
              disableSelectionOnClick
              disableDensitySelector
              disableColumnFilter
              // disableColumnSelector
              disableColumnMenu
              experimentalFeatures={{ newEditingApi: true }}
              sx={{outline:"none"}}
              components={{ Toolbar: QuickSearchToolbar }}
            />
          </Box>}
          <ConfirmDialog 
              confirmDialog={dialog}
              setConfirmDialog={setDialog}
              onConfirm={(id, router) => {
                console.log("id", id)
                console.log("router", router)
                const data:any ={id, router}
                  dispatch(removeDynamic(data))
                  setNotify({
                  isOpen:true,
                  message:"Remove Project Successfully !!",
                  type:"success"
                  })
            }}
          /> 
        </div>
    )
  }
  return (
      <>
        {valuePage && formPage ? handleRender() : <Typography variant="h4" sx={{ color:"#FF0000", position:"absolute", top:"50%", left:"50%"}}>Can't find the data</Typography> }
        <Popup
              popup={createDataPopup}
              setPopup={setCreateDataPopup}
              title={`Create ${formPage.table ? formPage.table.title : ''}`}
            >
             {formPage.form &&  <FormCreateDynamic formData={formPage.form} router={router} />}
            </Popup>
        <Popup
             popup={updateDataPopup}
             setPopup={setUpdateDataPopup}
             title={`Update ${formPage.table ?formPage.table.title : ''}`}
          >
            {formPage.form && <FormUpdateDynamic formData={formPage.form} router={router}/>}
        </Popup>
      </>
  )
}

export default TableDynamic