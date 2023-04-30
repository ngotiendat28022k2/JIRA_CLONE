import React, { useState, useEffect } from 'react'
import HeaderProject from '../header/headerProject'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { MenuItem } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useForm, SubmitHandler } from "react-hook-form";
import { IProject } from '../../interfaces/project';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { fetchCategorys } from '../../slice/category';
import { createProject, fetchProject, updateProject } from '../../slice/project';
import Select from 'react-select';      
import Notification from '../util/notification';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchIssues } from '../../slice/issue';
import { IUser } from '../../interfaces/users';
import { fetchUsers } from '../../slice/users';
      

type Props = {}

const UpdateProject = (props: Props) => {
  const { id } = useParams()

  const [project, setProject] = useState<IProject>({
      id,
      name:"",
      url:"",
      description:"",
      members:[],
      categoryId:""
  })
  const [description, setDescription] = useState('');
  const [optionCategoryId, setOptionCategoryId] = useState("") 
  const [notify, setNotify] = useState({isOpen:false, message:"", type:""})

  const dispatch = useDispatch<AppDispatch>()
  const optionCategories = useSelector((state:any) => state.category.value);
  const users = useSelector( (state:any) => state.user.value) 
  const navigate = useNavigate()

  const dataHeaderCreateProject = {
    breadcrumb:"Projects / Project Update",
    title:"Project Update"
  }

   
  useEffect(() => {
    (async() => {
        const { payload: valueProject } = await dispatch(fetchProject(id as string))
        setProject(valueProject)        
        dispatch(fetchCategorys())
        dispatch(fetchUsers())
    })()
  }, [id])

  const handleCategory = (data:any) => {
        const categoryProject = data.filter((category:any) => {
          return category.id === project.categoryId
        })
        return categoryProject[0]
  }
  const optionUser = (data:IUser[]) => {
    console.log("data", data);
    
    const newUser = data?.map(item => {
      return {...item, label:item.email, value: item.id}
    } )
    return newUser
  }


  const onHandleSubmitForm = () => {
    console.log("project meme", project);
    dispatch(updateProject(project)).then(() => {
      setNotify({isOpen:true, message:"Update Project Successfully", type:"success"})
      setTimeout(() => {
        navigate("/projects-management")
      }, 1000)
    }).catch((error) => {
      setNotify({isOpen:true, message:"Update Project False", type:"error"})
    })
    
  }

  return (
    <>
      <header>
        <HeaderProject 
            data = {dataHeaderCreateProject}
        />
      </header>

      <Box
        sx={{
          marginTop:"25px"
        }}
      >
          
        <form>
           <Box
            style={{
              overflow:"auto",
              height:"550px"
            }}
           >
           <Grid container spacing={3}>
                <Grid item xs={12}>
                  <input type="text" 
                    id='name'
                    placeholder="Project name"
                    className='w-full hover:bg-gray-100 max-w-[700px] py-[10px] outline-none pl-[10px] rounded-md focus:border-blue-600 border-[2px] border-[#fff]'
                    value={project.name}
                    onChange={(data) =>  setProject((prev) => {
                      return (
                        {...prev, name: data.target.value}
                      )})}
                    
                  />
                </Grid>

                <Grid item xs={12}>
                  <input type="text" 
                      placeholder="Project url"
                      id='url'
                      className='w-full hover:bg-gray-100 max-w-[700px] py-[10px] outline-none pl-[10px] rounded-md focus:border-blue-600 border-[2px] border-[#fff]'
                      value={project.url}
                      onChange={(data) =>  setProject((prev) => {
                        return (
                          {...prev, url:data.target.value}

                      )})}
                  />
                  </Grid>

                <Grid item xs={12} >
                  
                  <Select
                    className="basic-single max-w-[700px] text-[#444]"
                    classNamePrefix="select"
                    options={optionCategories}
                    value={handleCategory(optionCategories)}
                    onChange={(data) => setProject((prev) => {
                        return ({
                          ...prev, categoryId:data.id
                        })
                    })}
                    />
                </Grid>

                <Grid item xs={12}
                  sx={{
                    minHeight:"250px"
                  }}
                >
                  <ReactQuill 
                    style={{
                      maxWidth:"700px",
                      height:"100%"
                    }}

                    placeholder="Desctiption"
                    theme="snow" 
                    value={project.description} 
                    onChange={data => setProject((prev) => {
                        return({
                          ...prev,
                          description:data
                        })
                    })} 
                  />
                </Grid>

                <Grid item xs={12}
                >
                  <Select
                      isMulti
                      name="member"
                      options={optionUser(users)}
                      value={optionUser(project.members)}
                      placeholder="Select members"
                      className='mt-[40px] max-w-[700px]'
                      onChange={(members) => setProject((prev:any) => {
                          return {...prev, members}
                      })}
                  />
                </Grid>
                
                <Grid item xs={12}
                  sx={{
                    marginTop:"30px"
                  }}
                >
                  <Button
                    variant='contained'
                    onClick={() => onHandleSubmitForm()}
                  >
                    Update Project
                  </Button>
                </Grid>

            </Grid>
           </Box>
        </form>
        
        <Notification
          notify={notify}
          setNotify={setNotify}
        />
      </Box>
    </>
  )
}

export default UpdateProject