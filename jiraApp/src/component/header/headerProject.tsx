import React from 'react'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';

type Props = {
  data:{
    breadcrumb:string,
    title:string
  }
}

const HeaderProject = (props: any) => {
  // console.log("props header", props);
  
  return (
    <div>
      <div
        className='flex justify-between items-end'
      >
        <div>
          <span className='text-[#907a90] text-[12px] md:text-[16px]'>{props.data.breadcrumb}</span>
          <h2 className="text-[#1f3050] text-[16px] md:text-[23px] font-medium mt-[7px] capitalize">{props.data.title}</h2>
        </div>
      </div>

    </div>
  )
}

export default HeaderProject