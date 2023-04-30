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
import Select from 'react-select';      
import Notification from '../util/notification';
import { useNavigate, useParams } from 'react-router-dom';
import makeAnimated from 'react-select/animated';
import { createIssue } from '../../slice/issue';
import issueData from '../../data/issueData';
import { fetchUsers } from '../../slice/users';
import { IUser } from '../../interfaces/users';

type Props = {
  
}

const CreateIssue = (props:   any) => {
  const animatedComponents = makeAnimated();
  const [issue, setIssue] = useState({
    type:"",
    title:"",
    description:"",
    assignees: [],
    priority:""
  })
  const [description, setDescription] = useState('');
  const [optionCategoryId, setOptionCategoryId] = useState("") 
  const [notify, setNotify] = useState({isOpen:false, message:"", type:"success"})

  const navigate = useNavigate()
  const { id:projectId } = useParams()
  const dispatch = useDispatch<AppDispatch>()
  const { register, handleSubmit, formState: { errors } } = useForm();
  const optionCategories = useSelector((state:any) => state.category.value);
  const users = useSelector((state:any) => state.user.value)

  console.log("users create", users);
  
  const {user:userJson} = JSON.parse(localStorage.getItem("user")!)
  
  useEffect(() => {
    dispatch(fetchUsers())
  }, [projectId])

  const handleConverLabelUSer = (users:any) => {
    const newUser = users.filter((item:any) => item.id !== userJson.id)
    const userConvert = newUser.map((user:any) => {
        return {...user, label:user.email, value:user.id}
    })
    return [...userConvert]
  }

  const optionUser = handleConverLabelUSer(users)
  
  
  const handleOnCreateIssue:SubmitHandler<IProject> = (data:any) => {
    const issueData = {
      type:issue.type || "task",
      title: data.title,
      description,
      assignees: issue.assignees,
      priority:issue.priority || "medium",
      projectId,
      userId:userJson.id
    }
    
    dispatch(createIssue(issueData)).then(() => {

      window.location.reload(); 
      setNotify({
        isOpen:true,
        message:"Create Project Succsee!",
        type:"success"
      })
    }).catch((error) => {
      setNotify({
        isOpen:true,
        message: error,
        type:"error"
      })
    })
      
      
  }

  return (
    <>
      <Box>
          
        <form onSubmit={handleSubmit(handleOnCreateIssue)}>
           <Box>
           <Grid container spacing={3}>
                <Grid item xs={12} >
                  <h1
                    className='ml-[2px] mb-[4px] text-[13px] text-[#5e6c84] font-medium'
                  >
                    Issue Type
                  </h1>
                  <Select
                    className="basic-single text-[#444] re"
                    classNamePrefix="select"
                    defaultValue={issueData.types[0]}
                    options={issueData.types}
                    onChange={(data) => setIssue(prev => ({...prev, type:data? data.value : ""}))
                    }
                    />
                  <h1
                    className='ml-[2px] mb-[4px] text-[13px] text-[#5e6c84] font-normal'
                  >
                    Start typing to get a list of possible matches.
                  </h1>
                </Grid>
                 
                <Grid item xs={12}>
                
                <h1
                    className='ml-[2px] mb-[4px] text-[13px] text-[#5e6c84] font-medium'
                  >
                    Short Summary
                </h1>

                <input type="text" 
                  id="title"
                  className='w-full h-[35px] bg-[#f4f5f7] rounded-md text-[13px] pl-[10px] outline-blue-600 border-[1px]'
                  {...register("title", {
                    required:"This field is required"
                  })}
                />
                  <h1
                    className='ml-[2px] mb-[4px] text-[13px] text-[#5e6c84] font-normal'
                  >
                    Concisely summarize the issue in one or two sentences.
                  </h1>
                  
                  {errors.title && <p className='text-red-600 text-[13px] ml-[2px] mt-[5px]'>{errors.title?.message}</p>}
                </Grid>
                  

                <Grid item xs={12}
                  sx={{
                    minHeight:"200px"
                  }}
                >
                  <h1
                    className='ml-[2px] mb-[4px] text-[13px] text-[#5e6c84] font-medium'
                  >
                    Description
                  </h1>
                  <ReactQuill 
                    style={{
                      height:"100%"
                    }}

                    placeholder="Desctiption"
                    theme="snow" 
                    value={description} 
                    onChange={setDescription} 
                  />
                  <h1
                    className='ml-[2px] mb-[4px] mt-[46px] text-[13px] text-[#5e6c84] font-normal'
                  >
                    Describe the issue in as much detail as you'd like.
                  </h1>
                </Grid>

                {/* <Grid item xs={12} marginTop="90px">
                  <h1
                    className='ml-[2px] mb-[4px] text-[13px] text-[#5e6c84] font-medium'
                  >
                    Reporter
                  </h1>
                  <Select
                    className="basic-single  text-[#444]"
                    classNamePrefix="select"
                    options={optionCategories}
                    // defaultValue={optionCategories[0]}
                    // {...register("category")}
                    onChange={(category) => setOptionCategoryId(category?.id as string)}
                    />
                  
                </Grid> */}

                <Grid item xs={12} marginTop="90px">
                  <h1
                    className='ml-[2px] mb-[4px] text-[13px] text-[#5e6c84] font-medium'
                  >
                    Assignees
                  </h1>
                  <Select
                    closeMenuOnSelect={false}
                    defaultValue={[]}
                    isMulti
                    options={optionUser}
                    onChange={(dataAssignees) => setIssue(prev => ({ ...prev, assignees:dataAssignees }))}
                  />
                  
                </Grid>

                <Grid item xs={12} >
                  <h1
                    className='ml-[2px] mb-[4px] text-[13px] text-[#5e6c84] font-medium'
                  >
                    Priority
                  </h1>
                  <Select
                    className="basic-single  text-[#444]"
                    classNamePrefix="select"
                    options={issueData.Prioritys}
                    onChange={(data) => setIssue(prev => ({ ...prev, priority:data? data.value : ""}))
                    }
                    />
                    <h1
                    className='ml-[2px] mb-[4px] text-[13px] text-[#5e6c84] font-normal'
                    >
                      Priority in relation to other issues.
                    </h1>
                </Grid>

                <Grid item xs={12}
                  sx={{
                    marginTop:"10px",
                    marginBottom:"20px"
                  }}
                >
                  <Button
                    variant='contained'
                    type='submit'
                  >
                    Create Issue
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

export default CreateIssue