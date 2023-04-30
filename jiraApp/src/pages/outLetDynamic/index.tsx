import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useLocation, useSearchParams } from 'react-router-dom';
import { fetchPage, fetchPages } from '../../slice/page';
import TableDynamic from '../../component/tableDynamic';
import { fetchIssues } from '../../slice/issue';
import { fetchDynamics } from '../../slice/dynamic';

type Props = {}

const OutletDynamic = (props: Props) => {
  const dispatch = useDispatch()
  const [dataPage, setDataPage] = useState()
  const [formPage, setFormPage] = useState()
  let [searchParams, setSearchParams] = useSearchParams();
  const dataPageStore = useSelector(state => state.dynamic.value)
  const id = searchParams.get("sid")
  useEffect(() => {
    (async() => {
      const {payload:data} = await dispatch(fetchPage(id))
      setFormPage(data)
    })()
    console.log(123);
    
  },[id])

  useEffect(()=> {
    (async() => {
      if(formPage){
        const router = {
          api:formPage?.api,
          model:"get"
        }
        const {payload:data} = await dispatch(fetchDynamics(router))
        setDataPage(data)
      }
    })()
  },[formPage])

  useEffect(() => {
    setDataPage(dataPageStore)
  },[dataPageStore])
  console.log("formPage", formPage);
  

  return (
    
      <div>
        {formPage ? <TableDynamic formPage={formPage} valuePage={dataPage}/> :"" }
      </div>
  )
}

export default OutletDynamic