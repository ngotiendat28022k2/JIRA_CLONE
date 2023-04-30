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
import { createProject } from '../../slice/project';
import Select from 'react-select';      
import Notification from '../util/notification';
import { useNavigate } from 'react-router-dom';
import { fetchUsers } from '../../slice/users';
import { IUser } from '../../interfaces/users';
      

type Props = {
  
}

const CreateProject = (props: any) => {
  const navigate = useNavigate()
  const {user:user} = JSON.parse(localStorage.getItem("user")!)
  
  const [optionCategoryId, setOptionCategoryId] = useState("") 
  const [notify, setNotify] = useState({isOpen:false, message:"", type:""})
  const [project, setProject] = useState<IProject>({
    name:"",
    url:"",
    description: "",
    userId:user.id,
    categoryId:"",
    members:[]
  })
  
  const dispatch = useDispatch<AppDispatch>()
  const users = useSelector( (state:any) => state.user.value)
  const optionCategories = useSelector((state:any) => state.category.value);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
    // console.log("users", users);
    
  const optionUser = (data:IUser[]) => {
    // console.log("data.map", data);
    
      const newUser = data?.map(item => {
        return {...item, label:item.email, value: item.id}
      } )
      return newUser
  }
  

  useEffect(() => {
    dispatch(fetchCategorys())
    dispatch(fetchUsers())
  }, [])
  

  const handleOnCreateProject:SubmitHandler<IProject> = (data:any) => {
    dispatch(createProject(project)).then(( ) => {
        setNotify({
          isOpen:true,
          message:"Create Project Succsee!",
          type:"success"
        })
        window.location.reload()
      }).catch((error) => {
        setNotify({
          isOpen:true,
          message:`Create Project False!`,
          type:"error"
        })
      })
  }

  return (
    <>
      <Box
        sx={{
          marginTop:"25px"
        }}
      >
          
        <form onSubmit={handleSubmit(handleOnCreateProject)}>
           <Box>
           <Grid container spacing={3}>
                <Grid item xs={12}>
                
                  <input type="text" 
                    id="name"
                    placeholder='Project name'
                    className='w-full py-[8px] pl-[20px] bg-gray-100 focus:border-blue-600 border-[1px] outline-none rounded-md'
                    {...register("name",{required:"Please enter a valid project name"})}
                    onChange={(data) => setProject((prev:any) => {
                        return {...prev, name:data.target.value}
                    })
                    }
                  />
                  {errors.name && <p className='text-red-600 text-[14px] ml-[2px] mt-[5px]'>{errors.name?.message}</p>}
                </Grid>

                <Grid item xs={12}>
                  
                <input type="text" 
                    id="url"
                    placeholder='Url project'
                    className='w-full py-[8px] pl-[20px] bg-gray-100 focus:border-blue-600 border-[1px] outline-none rounded-md'
                    {...register("url", {
                      pattern: {
                        value:/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi,
                        message:"Please enter the format"
                      }})
                    }
                    onChange={(data) => setProject((prev:any) => {
                      return {...prev, url:data.target.value}
                    })}
                  />
                  {errors.url && <p className='text-red-600 text-[14px] ml-[2px] mt-[5px]'>{errors.url?.message}</p>}
                </Grid>

                <Grid item xs={12} >
                  
                  <Select
                    className="basic-single w-full text-[#444]"
                    placeholder="Category project"
                    options={optionCategories}
                    // defaultValue={optionCategories[0]}
                    // {...register("category")}
                    onChange={(category) => setProject((prev:any) => {
                        return {...prev, categoryId: category?.id}
                    })
                    }
                  />
                </Grid>

                <Grid item xs={12}
                  sx={{
                    minHeight:"200px"
                  }}
                >
                  <ReactQuill 
                    style={{
                      height:"100%"
                    }}

                    placeholder="Desctiption"
                    theme="snow" 
                    value={project.description} 
                    onChange={(description) => setProject((prev:any) =>{
                      return {...prev, description}
                  })} 
                  />
                </Grid>

                <Grid item xs={12}
                  
                >
                  <Select
                    isMulti
                    name="member"
                    options={optionUser(users)}
                    placeholder="Select members"
                    className='mt-[40px] mb-[10px]'
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
                    type='submit'
                  >
                    Create Project
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

export default CreateProject