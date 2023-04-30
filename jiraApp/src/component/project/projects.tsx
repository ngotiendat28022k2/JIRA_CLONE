
import { IProject } from '../../interfaces/project'
import { DataGrid } from '@mui/x-data-grid'
import { GridColDef } from '@mui/x-data-grid/models'
import Box from '@mui/material/Box'
import DeleteIcon from '@mui/icons-material/Delete';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import Notification from "../util/notification"
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import {useState, useEffect} from "react"
import ConfirmDialog from "../util/confirmDialog"
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { fetchProjects, removeProject } from '../../slice/project';
import { AppDispatch } from '../../app/store';
import { Link } from 'react-router-dom';
import HeaderProject from '../header/headerProject';
import CreateProject from './createProject';
import Popup from '../util/popup';
import UpdateProject from './updateProject';
import CircularStatic from '../util/loaddingComponent';


type Props = {}

const Projects = (props: Props) => {
    const dispatch = useDispatch<AppDispatch>()
    const project = useSelector((state:any) => state.project.value);
    
    const [notify, setNotify] = useState({isOpen:false, message:"", type:"success"})
    const [dialog, setDialog] = useState({isOpen:false, title:"", subTitle:"", projectId: undefined as undefined | string })
    const [popupUpdateProject, setPopupUpdateProject] = useState(false)
    
    useEffect(() => {
      dispatch(fetchProjects());
    }, []);

    // console.log("project", project)

    const columns: GridColDef[] = [
        {
          field: 'name',
          headerName: 'Name Project',
          width: 170,
          editable: false,
          renderCell: (params:any) => {
            return <div>
              <span>
                <Link 
                  to={`/projects-management/${params.id}`}
                  
                  className="hover:underline hover:text-blue-600 capitalize"
                >
                  {params.row.name}
                </Link>
              </span>
            </div>
          }
        },
        {
          field: 'url',
          headerName: 'Url',
          width: 300,
          editable: false,
        },
        {
          field: 'createdAt',
          headerName: 'Created At',
          description: 'This column has a value getter and is not sortable.',
          sortable: false,
          width: 230,
          valueGetter: (params: any) =>
          new Date(params.row.createdAt).toLocaleString(),
        },
        {
            field: 'action',
            headerName: 'Acction',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 160,
            renderCell: (params:any) => 
                <div className='flex items-center justify-start outline-none'>
                    <div 
                        className='bg-[#037af9] p-[5px] rounded-md hover:bg-[#3188e4] cursor-pointer'
                    >
                        <Link
                          to={`/projects-management/${params.id}/update`}
                        >
                          <SystemUpdateAltIcon 
                            sx={{
                                color:"#fff",
                            }}
                          />
                        </Link>
                    </div>
                    <div 
                        className='bg-[#da5b6a] ml-[10px] p-[5px] rounded-md  hover:bg-[#e16e7b] cursor-pointer'
                        onClick={() => onHandleRemove(params.id)}
                    >
                        <DeleteIcon 
                            sx={{
                                color:"#fff"
                            }}
                        />
                    </div>

                    
                </div>
        },
        
    ];
      

    const onHandleRemove = (id:string) => {
      if(!id) return;
      setDialog({
        isOpen:true,
        title:"You sure remove project!",
        subTitle:"you cannot undo this action.",
        projectId: id
      })
    }

    const dataheaderProject = {
      breadcrumb:"Projects / Project Management",
      title:"Project Management"
    }
  
  return (
   
    <>
    <header>
      <HeaderProject 
        data={dataheaderProject}
      />
    </header>
    <div
          className="mt-[30px] block text-left"
        >
          {localStorage.getItem("user") 
          ? 
          <div
              onClick={() => setPopupUpdateProject(!popupUpdateProject)}            
              className="max-w-[200px]"
          >
            <Button
              variant='contained'
            >
              <AddIcon
                sx={{
                  marginRight:"10px"
                }}
              />
              Create Project 
            </Button>
          </div> 
          :
          <div>
            <Button
              variant='contained'
              disabled
              >
              <AddIcon 
                sx={{
                  marginRight:"10px"
                }}
              />
              Create Project 
            </Button>
          </div>
          }
          
        </div>
    <Box sx={{ height: 527, width: '99%', marginTop:"13px" }}>
      <DataGrid
        rows={project}
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
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box> 

      <Notification 
        notify={notify}
        setNotify={setNotify}
      />  

      <ConfirmDialog 
          confirmDialog={dialog}
          setConfirmDialog={setDialog}
          onConfirm={(id:string) => {
            console.log("id", id)
            dispatch(removeProject(id as string))
            setNotify({
            isOpen:true,
            message:"Remove Project Successfully !!",
            type:"success"
            })
          }}
      />

        <Popup
          popup={popupUpdateProject}
          setPopup={setPopupUpdateProject}
          title={"Project Create"}
        >
          <CreateProject />
        </Popup>
    </>
  )
}

export default Projects