import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { IIssue } from '../../interfaces/IIssue';

type Props = {
    dataIssue: IIssue
}

const DueTime = (props: Props) => {
    const { dataIssue } = props
    const [dueDate, setDueDate] = useState()
    const [createdAt, setCreateAt] = React.useState<number>(0)
    // console.log(new Date(createdAt || "").getTime());
    
    console.log("createdAt", dataIssue);
    // const theDate = new Date(props.dataIssue.createdAt * 1000);
    // const dateString = theDate.toGMTString();
    // console.log("dateString",dateString );
    useEffect(() => {
        setCreateAt(dataIssue.createdAt)

    }, [])
    const handleDueDate = (issueData) =>{
        return `
            <TextField
                id="datetime-local"
                label="Project Created At"
                type="datetime-local"
                defaultValue={new Date(+createdAt?.replace(/\/Date\((\createdAt+)\)\//, '$1'))}
                // defaultValue="2017-05-24T10:30"
                sx={{ width: 200 }}
                InputLabelProps={{
                    shrink: true,
                }}
            />
        `
    }
    
    // handleDueDate(createdAt)
  return (
    <>
        <div className='flex justify-between items-start'>
                <TextField
                    id="datetime-local"
                    label="Project Created At"
                    type="datetime-local"
                    // defaultValue={new Date(+createdAt?.replace(/\/Date\((\createdAt+)\)\//, '$1'))}
                    defaultValue="2017-05-24T10:30"
                    sx={{ width: 200 }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    id="datetime-local"
                    label="Due Time"
                    type="datetime-local"
                    defaultValue="2017-05-24T10:30"
                    sx={{ width: 200 }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
        </div>   
        <div></div>   
    </>
  )
}

export default DueTime