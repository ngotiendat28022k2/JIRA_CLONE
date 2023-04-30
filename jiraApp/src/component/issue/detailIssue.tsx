import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { AppDispatch } from '../../app/store'
import { IIssue } from '../../interfaces/IIssue'
import { fetchIssue, removeIssue, updateIssue } from '../../slice/issue'
import HeaderProject from '../header/headerProject'
import ReactQuill, {Quill} from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Select from 'react-select';
import issueData from '../../data/issueData'
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Button } from '@mui/material'
import ConfirmDialog from '../util/confirmDialog'
import Notification from '../util/notification'
import { fetchUsers } from '../../slice/users'
import { useSelector } from 'react-redux'
import "./detailIssue.css"
import {isNil} from "lodash"
import { is } from 'immer/dist/internal'
import Popup from '../util/popup'
import CreateProject from '../project/createProject'
import TrackingWidget from './TrackingWidget'
import DueTime from '../dueTIme'
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

type Props = {}

const EditIssue = (props: Props) => {
  const [issue, setIssue] = useState<IIssue>()
  const [notify, setNotify] = useState({isOpen:false, message:"", type:"success"})
  const [dialog, setDialog] = useState({isOpen:false, title:"", subTitle:"", projectId: undefined as undefined | string })
  const [popupTrackingWidget, setPopupTrackingWidget] = useState(false)

  const {id, idissue} = useParams()
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const users = useSelector((state:any) => state.user.value )
  console.log("issuewwww", issue);
  
  useEffect(() => {
    (async() => {
      if(id){
        const {payload:issueData} = await dispatch(fetchIssue(idissue))
        dispatch(fetchUsers())
        setIssue(issueData)
      }
    })()
  },[id])

  const handleConverLabelUSer = (users:any) => {
    // const newUser = users.filter((item:any) => item.id !== issue?.userId)
    const userConvert = users.map((user:any) => {
        return {...user, label:user.email, value:user.id}
    })
    const reporter = userConvert.filter((user:any) => user.id === issue?.userId)
    return {userConvert, reporter}
  }

  const optionAssignees = handleConverLabelUSer(users)
  
  const issueType = {
    label:issue?.type,
    value:issue?.type
  }
  const issueStatus = {
    label:issue?.status,
    value:issue?.status
  }
  const issuePriority = {
    label:issue?.priority,
    value:issue?.priority
  }

  // console.log("issue out", issue);
  

  const optionTypeIssue = issueData.types.filter(type => type.value !== issueType.value)
  const optionStatusIssue = issueData.status.filter(type => type.value !== issueStatus.value)
  const onhandleTypeValue = (typeValue:any) => {
    setIssue(prev => ({...prev, type: typeValue.value}))
  }
  const onHandleTitleIssue = (title:any) => {
    setIssue(prev => ({...prev, title: title.target.value}))
  }
  const onHandleStatus = (statusValue:any) => {
    setIssue(prev => ({...prev, status: statusValue.value}))
  }

  const onHandleAssignees = (assigneesValue:any) => {
    setIssue(prev => ({...prev, assignees: assigneesValue}))
    console.log(issue);
  }
  const handleRemoveIssue = () => {
      if(!idissue) return;
      setDialog({
        isOpen:true,
        title:"You sure remove project!",
        subTitle:"you cannot undo this action.",
        projectId: {id, idissue}
      })
  }

  useEffect(() => {
    dispatch(updateIssue(issue))
  }, [issue])

  const dataheaderProject = {
    breadcrumb:"",
    title:"Issue Detail"
  }

  const calculateTrackingBarWidth = ( timeSpent, timeRemaining, estimate) => {
    if (!timeSpent) {
      return 0;
    }
    if (isNil(timeRemaining) && isNil(estimate)) {
      return 100;
    }
    if (timeRemaining > 0) {
      console.log("timeRemaining");
      return timeSpent / (timeSpent + timeRemaining) * 100;
    }
    if (estimate > 0) {
      console.log("estimate");
      return Math.min((timeSpent / estimate) * 100, 100);
    }
  };

  const renderRemainingOrEstimate = ( timeRemaining, estimate ) => {
    if (timeRemaining === null && estimate === null) {
      return null
    }
    if (timeRemaining) {
      return <div>{`${timeRemaining}h remaining`}</div>;
    }
    if (estimate) {
      return <div>{`${estimate}h estimated`}</div>;
    }
    return null
  };


  // console.log("121", calculateTrackingBarWidth(issue?.timeSpent, issue?.timeRemaining, issue?.estimate))

  // function cleanDate(d) {
  //   // return new Date(+d?.toString().replace(/\/Date\((\d+)\)\//, '$1'))
  //   // return d?.toLocaleTimeString('pt-PT', {hour12: false});
   
  //   const date = new Date(d);
      
  //   const formatData = (input) => {
  //     if (input > 9) {
  //       return input;
  //     } else return `0${input}`;
  //   };
      
  //   // Function to convert
  //   // 24 Hour to 12 Hour clock
  //   const formatHour = (input) => {
  //     if (input > 12) {
  //       return input - 12;
  //     }
  //     return input;
  //   };
      
  //   // Data about date
  //   const format = {
  //     dd: formatData(date.getDate()),
  //     mm: formatData(date.getMonth() + 1),
  //     yyyy: date.getFullYear(),
  //     HH: formatData(date.getHours()),
  //     hh: formatData(formatHour(date.getHours())),
  //     MM: formatData(date.getMinutes()),
  //     SS: formatData(date.getSeconds()),
  //   };
  //   const format24Hour = ({ dd, mm, yyyy, HH, MM, SS }) => {
  //     return (`${yyyy}-${mm}-${dd}T${HH}:${MM}`)
  //   }; 
  //   return format24Hour(format)
  // }

  const handleStartDate = (event) => {
    setIssue(prev => ({...prev, startDate: event.target.value}))
  }
  const handleDueDate = (event) => {
    setIssue(prev => ({...prev, dueDate: event.target.value}))
  }

  console.log(issue?.startDate);
  
  return (
    <div>
      {/* <header>
      <HeaderProject 
        data={dataheaderProject}
      />
      </header> */}
      <div 
        className='mt-[10px] flex justify-between items-start'
      >
          <div
            className='w-[62%]'
          >
          <div>
          <Select
            className="max-w-[170px] text-[14px] capitalize"
            classNamePrefix="select"
            name="type"
            value={issueType}
            options={optionTypeIssue}
            onChange={(typeValue) => onhandleTypeValue(typeValue)}
          />
          </div>
          <div
            className='mt-[20px]'
          >
            <input 
                name='type'
                id='type'
                className="w-full py-[10px] pl-[6px] text-[20px] capitalize font-medium text-[#172b4d] hover:bg-[#f7f7f7] rounded-md outline-blue-600"
                value={issue?.title}
                onChange={event => onHandleTitleIssue(event)}
            />
          </div>
          <div>
            <h3
              className='mt-[20px] ml-[2px] text-[#616e86] text-[14px] font-medium'
            >
              Description
            </h3>
            <ReactQuill 
                theme="snow"
                value={issue?.description}
                placeholder="Add a description"
                onChange={(data) => setIssue(prev => ({...prev, description:data}))}
                className="w-full pr-[40px] h-[200px] mt-[5px] rounded-lg"
              />
          </div>

          <div
            className=" mt-[60px]"
          >
            <h3
              className='mt-[20px] ml-[2px] text-[#616e86] text-[14px] font-medium'
            >
              {/* Comments */}
            </h3>
            <div>

            </div>
          </div>
          </div>

          <div
            className='w-[38%] px-[20px]'
          >
            <div
              className='text-right'
            >
              <Button
                variant='outlined'
                color='primary'
              >
                <ContentCopyIcon /> Copy Link
              </Button>

              
                <Button
                  sx={{
                    fontSize:"30px",
                    marginLeft:"10px"
                  }}
                  onClick={() => handleRemoveIssue()}
                >
                
                  <DeleteIcon />
                
                </Button>
              
              <Link
                to={`/projects-management/${id}`}
              >
                <Button
                sx={{
                  fontSize:"38px",
                  ":hover":"#3184d6"
                }}
                >
                  <CloseIcon />
                </Button>
              </Link>
            </div>
            <div
              className='mt-[30px]'
            >
            <h3
              className='uppercase mt-[20px] ml-[2px] text-[#616e86] text-[14px] font-bold'
            >
              Status
            </h3>
            <Select
              className="capitalize w-full mt-[5px]"
              name="status"
              value={issueStatus}
              options={optionStatusIssue}
              onChange={statusValue => onHandleStatus(statusValue)}
            />
            </div>

            <div>
              <h3
                className='uppercase mt-[20px] ml-[2px] text-[#616e86] text-[14px] font-bold'
              >
                assignees
              </h3>
              <Select
                value={issue?.assignees}
                isMulti
                options={optionAssignees.userConvert}
                className="w-full mt-[5px]"
                onChange={(data) =>  onHandleAssignees(data)
                }
              />
            </div>

            <div>
              <h3
                className='uppercase mt-[20px] ml-[2px] text-[#616e86] text-[14px] font-bold'
              >
                reporter
              </h3>
              <p
                className="bg-[#f7f7f7] mt-[5px] px-[15px] py-[10px] hover:bg-blue-600 hover:text-[#fff] rounded-md"
              >
                {optionAssignees?.reporter[0]?.email}
              </p>
            </div>

            <div>
              <h3
                className='uppercase mt-[20px] ml-[2px] text-[#616e86] text-[14px] font-bold'
              >
                priority
              </h3>
              <Select
                value={issuePriority}
                name="color"
                options={issueData.Prioritys}
                className="capitalize mt-[5px]"
                onChange={(priorityValue:any) => setIssue((prev:any) => ({...prev, priority: priorityValue.value}))}
              />
            </div>

            <div>
              <h3
                className='uppercase mt-[20px] ml-[2px] text-[#616e86] text-[14px] font-bold'
              >
                ORIGINAL ESTIMATE (HOURS)
              </h3>
              <input 
                type="number" 
                value={issue?.estimate}
                className="w-full bg-[#f7f7f7] pl-[10px] py-[10px] outline-none border-[1px] hover:border-blue-600 mt-[5px] rounded-md"  
                onChange={event => setIssue(prev => ({...prev, estimate:parseInt(event.target.value)}))}
              />
            </div>

            <div
              className='border-b-2 border-[#dfdfdf] pb-3'
            >
              <h3
                className='uppercase mt-[20px] ml-[2px] text-[#616e86] text-[14px] font-bold'
              >
               TIME TRACKING
              </h3>
              <div
                className='mt-[3px] flex justify-between items-center hover:bg-[#d2d3d4] py-[5px] px-[3px] rounded-md transition ease-linear delay-100 cursor-pointer'
                onClick={() => setPopupTrackingWidget(true)}
              >
                <div 
                  className='w-[6%]'
                >
                  <i className="fa-solid fa-stopwatch text-[30px] text-[#5e6c84]"></i>
                </div>
                <div
                  className='w-[88%] '
                >
                  <input 
                    className="rounded-lg overflow-hidden appearance-none bg-gray-400 h-[14px] w-full cursor-pointer "
                    type="range" 
                    min="1" 
                    max="100"
                    step="1"
                    value={calculateTrackingBarWidth(issue?.timeSpent, issue?.timeRemaining, issue?.estimate)} 
                  />
                  <div
                    className='flex justify-between items-center'
                  >
                    <p
                      className='text-[14px] text-[#6a768c] font-semibold'
                    >
                      { issue?.timeSpent <= 0 || undefined ? "No time logger" : `${issue?.timeSpent}h logged`}
                    </p>

                    <p
                      className='text-[14px] text-[#6a768c] font-semibold '
                    >
                      {renderRemainingOrEstimate(issue?.timeRemaining, issue?.estimate)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* due time */}
              <div className='mt-[20px]'>
                    <div className='flex justify-between items-start'>
                      <TextField
                          id="datetime-local"
                          label="Start Date"
                          type="datetime-local"
                          value={issue?.startDate}
                          sx={{ width: 200 }}
                          InputLabelProps={{
                              shrink: true,
                          }}
                          onChange={(event) => handleStartDate(event)}
                      />
                      <TextField
                          id="datetime-local"
                          label="Due Time"
                          type="datetime-local"
                          value={issue?.dueDate}
                          onChange={(event) => handleDueDate(event)}
                          sx={{ width: 200 }}
                          InputLabelProps={{
                              shrink: true,
                          }}
                      />
              </div> 
              </div>
          </div>
      </div>
      
      <Notification
        notify={notify}
        setNotify={setNotify}
      />  

      <ConfirmDialog 
          confirmDialog={dialog}
          setConfirmDialog={setDialog}
          onConfirm={(objId:any) => {
            dispatch(removeIssue(objId.idissue)).then(() => {
              navigate(`/projects-management/${objId.id}`)
              setNotify({
                isOpen:true,
                message:"Remove Issue Successfully !!",
                type:"success"
                })
            }).catch((error) => {
              setNotify({
                isOpen:true,
                message:`Remove Issue False !!, ${error}`,
                type:"error"
                })
            })
            
          }}
      />
        <Popup
          popup={popupTrackingWidget}
          setPopup={setPopupTrackingWidget}
          title={"Time tracking"}
        >
          <TrackingWidget issue={issue}/>
        </Popup>
    </div>
  )
}

export default EditIssue