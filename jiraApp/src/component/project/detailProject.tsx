import React, { useEffect,useRef } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { useAppSelector } from '../../app/hook'
import { AppDispatch, RootState } from '../../app/store'
import { searchIssue, fetchProject, resetColumnForm, updateColumn, updateDragg, setColumnIssue } from '../../slice/project'
import HeaderIssue from '../header/headerIssue'
import { useState } from "react"
import { IProject } from '../../interfaces/project'
import PestControlIcon from '@mui/icons-material/PestControl';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { useSelector } from 'react-redux'
import Popup from '../util/popup'
import DetailIssue from '../issue/createIssue'
import CreateIssue from '../issue/createIssue'
import Button from '@mui/material/Button'
import { TextField } from '@mui/material'
import { IIssue } from '../../interfaces/IIssue'
import { handeleConvertTypeToIcon, handleConvertPriority } from '../util/handeConvertIcon'
import {  fetchIssues, updateIssue } from '../../slice/issue'
import { fetchUsers } from '../../slice/users'
import { IUser } from '../../interfaces/users'

type Props = {}

const Project = (props: Props) => {
  const buttonClearValueSeach = useRef()
  const inputSearch = useRef()
  const [IsButtonClearSearch, setIsButtonClearSearch] = useState(false)
  const [project, setProject] = useState<IProject>()
  // const [users, setUsers] = useState<any[]>(() => {useSelector((state:any) => state.user.value)})
  const [popupUpdateIssue, setPopupUpdateIssue] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  const columns = useSelector((state:RootState) => state.project.columnsForm)
  const issues = useSelector((state:any) => state.issue.value)
  const users = useSelector((state:any) => state.user.value)
  const state = useSelector((state:any) => state)
  
  console.log("state selecttor", state);
  

  // console.log("users", users)
  const { id } = useParams()
  
  useEffect(() => {
    (async() => {
      const {payload:Project} =await dispatch(fetchProject(id as string))
      setProject(Project as IProject)
      dispatch(fetchUsers())
      dispatch(fetchIssues())
    })()
    
    return () => {
      dispatch(resetColumnForm())
    }
   
  }, [id])

  const handleSearch =async (event:any) => {
    const dataSearch = event.target.value.trim()
    
    if(dataSearch === "") {
      console.log(123);
      setIsButtonClearSearch(false)
      dispatch(setColumnIssue(issues))
    };
    setIsButtonClearSearch(true)
    setTimeout(async() => {
      const {payload: valueSearchIssue} = await dispatch(searchIssue(dataSearch))
    }, 300)
  }
  const projectId = id  
  const handleSearchWithUser = (id:string) => {
    const result =  issues.filter((issue:IIssue) => issue.userId === id && issue.projectId == projectId)
    dispatch(setColumnIssue(result))
    setIsButtonClearSearch(true)
  }


  const MyIssueSearch = () => {
    const  {user}  = JSON.parse(localStorage.getItem("user") || "")
    const userId = user.id
    handleSearchWithUser(userId)
    setIsButtonClearSearch(true)
  }

  const handleClearValueSearch = (event:any) => {
      setIsButtonClearSearch(false)
      dispatch(setColumnIssue(issues))
      
    }

  const handleDueDate = (startDate, dueDate) =>{
    // console.log("startDate dueDate", dueDate);
    // console.log(new Date(startDate));
    
    // if(new Date(startDate + (dueDate*60*60*1000)) <= new Date()){
    //   return (<i className="fa-regular fa-clock text-red-600"></i>)
    // }else{
    //   return (<i className="fa-regular fa-clock text-blue-600"></i>)
    // }
  }

  return (
    <div className=''>
      <header>
        <HeaderIssue />
      </header>
      
      <div>
      <div className='md:flex justify-start items-center mt-[10px] md:mt-[20px]'>
        <div className='relative'>
          {/* <input 
            type="text" 
            className=' border-[1px] rounded-md py-[3px] max-w-[150px] w-full'
          />
          <i className="fa-solid fa-magnifying-glass absolute  top-[20%] left-1"></i> */}

        
          <input 
            ref={inputSearch}
            id="inputSearch"
            type="text" 
            placeholder='Search'
            className='h-[40px] outline-none pl-[20px] border-[1px] bg-[#aeaeae22] rounded-md focus:border-blue-600 mr-[20px]'
            onChange={event => handleSearch(event)}
          />
        </div>
        <div className='inline-block mt-[3px] md:mt-0'>
        <AvatarGroup 
          total={users?.length}
          max={5}
          sx={{
            '& .MuiAvatar-root': { width: 30, height: 30, fontSize: 14, cursor:"pointer" },
          }}

        >
          {users?.map((user:IUser) =>
             <div
             key={user.id}
             onClick={() => handleSearchWithUser(user?.id || "")}
             title={user.email}
             >
              <Avatar
                  alt={user.name}
                  src={user.avata}
              />
             </div>
          )}
         
        </AvatarGroup>

        </div>

        <div className='flex justify-start items-center ml-[30px]'>
          <div>
            <span 
              className='hover:bg-[#f4f5f7] px-[10px] py-[5px] rounded-lg text-[#736a76] cursor-pointer'
              onClick={() => MyIssueSearch()}
            >
              Only My Issues
            </span>
          </div>

          {/* <div className='ml-[5px]'>
            <span className='hover:bg-[#f4f5f7] px-[10px] py-[5px] rounded-lg text-[#736a76] cursor-pointer'>Recently Updated</span>
          </div> */}

          <div className='ml-[30px] flex items-center'>
            {/* <div className='border-0 bg-[#e0e0e0] w-[1px] h-[25px]'>
            </div> */}
            <div>
              {IsButtonClearSearch && 
              <span 
                className='px-[10px] py-[5px] rounded-lg text-[#736a76] cursor-pointer hover:text-[#575358] hover:bg-gray-100 ml-[10px]'
                onClick={(event) => handleClearValueSearch(event)}
                ref={buttonClearValueSeach}
              >
                Clear all
              </span>}
              
            </div>

          </div>
        </div>
      </div>
      </div>
      
       <div
        className='flex justify-start items-start relative'
       >
      <button
        className="bg-blue-600 py-[13px] px-[30px] rounded-md text-[#fff] text-[16px] absolute top-[-50px] right-[40px] hover:bg-blue-500"
        onClick={() => setPopupUpdateIssue(true)}
      >
        Create Issue
      </button>
      <DragDropContext
        onDragEnd={result =>{
          dispatch(updateDragg(result))
          console.log("result", result)
          const valueDraggIssue = {
              id:result.draggableId,
              status: result.destination?.droppableId,
              index: result.destination?.index
          }
          dispatch(updateIssue(valueDraggIssue))
        }}
      >
       {
         columns.map((column, index) =>{
          return(
            <Droppable
              droppableId={column.status}
              key={index}
            >
              {(provied, snapshot) => {
                return(
              <div
                className='mt-[30px] mr-[20px] max-w-[280px] w-full h-[300px]'
              >
                <div
                >

                  <div
                    className="max-w-[280px] bg-[#f4f5f7] px-[5px] py-[15px] w-full"
                  >
                    <div>
                      <h3
                        className='text-[14px] text-[#7f8593] uppercase ml-[4px]'
                      >{column.name}</h3>
                    </div>

                    <div
                      {...provied.droppableProps}
                      ref={provied.innerRef}
                      style={{
                        height:"450px",
                      }}
                    >
                      
                      {column.items.map((item, index: number) => {
                        return(
                          <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}
                          >
                            {(provied, snapshot) => {
                                // {console.log("provied", provied)}
                                // {console.log("snapshot", snapshot)}
                              return(
                                <div
                                  className="cursor-pointer bg-[#fff] rounded-md py-[7px] px-[5px] mt-[10px] w-full"
                                  ref={provied.innerRef}
                                  {...provied.draggableProps}
                                  {...provied.dragHandleProps}
                                  
                                >
                                  
                                  
                                 <Link 
                                  to={`issue/${item.id}/detail`}
                                 >
                                    <div
                                      className="text-[14px] text-justify mt-[5px] tracking-normal w-full"
                                    >
                                      <span>{item.title}</span>
                                    </div>

                                    <div
                                      className="flex justify-between items-center mt-[10px]"
                                    >
                                      <div
                                        className='max-w-[100px] w-full items-center justify-between'
                                      >
                                          {handeleConvertTypeToIcon(item.type)}
                                        {/* <PestControlIcon
                                          color='error'
                                        /> */}
                                          {handleConvertPriority(item.priority)}
                                      </div>

                                      <AvatarGroup max={3}
                                        sx={{
                                          '& .MuiAvatar-root': { width: 20, height: 20, fontSize: 10, cursor: "pointer" },
                                        }}
                                      >
                                        {
                                          item.assignees.map((member:any, index:number) => <Avatar key={index} alt="Remy Sharp" src={member.avata}  title={member.email}/>)
                                        }
                                      </AvatarGroup>

                                      <div>
                                          {handleDueDate(item.startDate, item.dueDate)}
                                      </div>
                                    </div>
                                 </Link>
                                </div>
                              )
                            }}
                          </Draggable>
                        )
                      }) 
                      }
                      {provied.placeholder}
                    </div>

                  </div>
                  
                </div>

              </div>
                )
              }}
            </Droppable>
          )
        })
       }
      
      </DragDropContext>

      </div>

       <div>
          <Popup
             popup={popupUpdateIssue}
             setPopup={setPopupUpdateIssue}
             title={"Create issue"}
          >
            <CreateIssue/>
          </Popup>
       </div>
    </div>
  )
}

export default Project