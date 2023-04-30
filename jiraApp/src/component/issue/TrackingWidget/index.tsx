import { Box } from '@mui/material'
import React, {useState, useEffect} from 'react'
import { IIssue } from '../../../interfaces/IIssue'
import {isNil} from "lodash"
import { useDispatch } from 'react-redux'
import { updateIssue } from '../../../slice/issue'
import { useNavigate } from 'react-router-dom'

type Props = {
    issue:IIssue
}

const TrackingWidget = (props: Props) => {
    console.log(props.issue);
    const issue = props.issue
    const [issueValue, setIssueValue] = useState(issue)
    const dispatch = useDispatch()
    const navigate = useNavigate()

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

      useEffect(() => {
        dispatch(updateIssue(issueValue))
      }, [issueValue])
    
  return (
    <>
            <div
                className='mx-[20px]'
            >
               <div
                className=' block flex justify-between items-center'
               >
                    <div 
                        className='w-[6%] mr-[20px]'
                        >
                        <i className="fa-solid fa-stopwatch text-[30px] text-[#5e6c84]"></i>
                        </div>
                        <div
                        className='w-[88%]'
                        >
                        <input 
                            className="rounded-lg overflow-hidden appearance-none bg-gray-400 h-[8px] w-[100%] cursor-pointer "
                            type="range" 
                            min="1" 
                            max="100"
                            step="1"
                            value={calculateTrackingBarWidth(issueValue?.timeSpent, issueValue?.timeRemaining, issueValue?.estimate)} 
                        />
                        <div
                            className='flex justify-between items-center'
                        >
                            <p
                            className='text-[14px] text-[#6a768c] font-semibold'
                            >
                            { issueValue.timeSpent ? `${issueValue.timeSpent}h logged` : 'No time logged' }
                            </p>

                            <p
                            className='text-[14px] text-[#6a768c] font-semibold '
                            >
                            {renderRemainingOrEstimate(issueValue?.timeRemaining, issueValue?.estimate)}
                            </p>
                        </div>
                    </div>
               </div>

               <div
                    className='flex justify-between items-center w-[330px] mt-[20px]'
               >
                <div>
                    <p
                        className='text-[13px] text-[#66738a] font-medium mb-[4px]'
                    >Time spent (hours)</p>
                    <input 
                        type="text" 
                        className='border-[1px] border-[#e2e4e8] outline-none pl-[10px] rounded-md focus:border-blue-600 focus:border-[2px] font-normal max-w-[155px] bg-[#f4f5f7] py-[5px] w-full'
                        placeholder='Number'
                        value={issueValue.timeSpent}
                        onChange={(event) => (setIssueValue((prev) => ({...prev, timeSpent: event.target.value})))}
                    />
                </div>
                <div>
                    <p
                        className='text-[13px] text-[#66738a] font-medium mb-[4px]'
                    >Time remaining (hours)</p>
                    <input 
                        type="text" 
                        className='border-[1px] border-[#e2e4e8] outline-none pl-[10px] rounded-md focus:border-blue-600 focus:border-[2px] font-normal max-w-[155px] bg-[#f4f5f7] py-[5px] w-full'
                        placeholder='Number'
                        value={issueValue.timeRemaining}
                        onChange={(event) => (setIssueValue((prev) => ({...prev, timeRemaining: event.target.value})))}
                    />
                </div>
               </div>
               <div
                className='mt-[20px]'
               >
                  <button
                    className='bg-blue-600 py-[5px] px-[10px] rounded-lg text-[#fff] float-right hover:bg-blue-500'
                    onClick={() => document.location.reload(true)}
                  >
                    Done
                  </button>
               </div>
            </div>
    </>
  )
}

export default TrackingWidget