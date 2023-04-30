import { Box, Grid, Icon } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings';
import MovieCreationSharpIcon from '@mui/icons-material/MovieCreationSharp';
import { fontWeight } from '@mui/system';
import { Link } from 'react-router-dom';
import {useState, useRef, useEffect} from "react"
import { useDispatch } from 'react-redux';
import { fetchPages } from '../../slice/page';
import { useSelector } from 'react-redux';

type Props = {}

const Aside = (props: Props) => {
  const dispatch =useDispatch()
  const [hidden, setHidden] = useState(false)
  const [page, setPage] = useState([])
  const pageStore = useSelector((state:any) => state.page.value)
  console.log("page", page);
  
  useEffect(()=> {
   (async() => {
    const{payload} =await dispatch(fetchPages())
    setPage(payload)
   })()
  },[])

  useEffect(() => {
    setPage(pageStore)
  }, [pageStore])
  
  const handleHidden = (e:any) => {
    console.log(e);
    setHidden(true)    
  }
  const handleHiddenOut = () => {
    setHidden(false)    
  }

  return (
    <div className='h-full'>
      <div>
        <div className='flex justify-start items-center'>
          <div>
            <img
              src="https://e7.pngegg.com/pngimages/501/375/png-clipart-slack-trello-jira-business-3d-text-rectangle.png" 
              className='w-full max-w-[55px] cursor-pointer'
              alt="" 
            />
          </div>
          <div className='md:ml-[8px]'>
            <span className='text-[#475066] md:text-[16px] md:font-medium'>singularrity 1.0</span>
            <span className='text-[#57627e] md:text-[14px]'><p className='md:uppercase md:inline'>b</p>usiness project</span>
          </div>
        </div>
        <div className='md:mt-[30px]'>
            <div>
              {/* <Link
                to="/projects-management/:id"
                className='text-[#000] mb-[10px] cursor-pointer block mr-[25px] hover:bg-[#ebecf0] pl-[10px] py-[7px] hover:text-[#525cce] hover:rounded-md font-light md:font-normal md:text-[14px]'
              >
                  <span>Kanban Board</span>
              </Link> */}
              <Link
                to="/projects-management"
                className='text-[#000] mb-[5px] cursor-pointer block mr-[25px] hover:bg-[#ebecf0] pl-[10px] py-[7px] hover:text-[#525cce] hover:rounded-md font-light md:font-normal md:text-[14px]'
              >
                  <span>Project Management</span>
              </Link>
            </div>
        </div>
        <div>
          <hr className="max-w-[172px] w-full my-2 h-[1px] bg-gray-100 rounded border-0 md:my-4 bg-[#b4b4b4]"/>
        </div>
        <div className='mt-[20px]'>
          {page.length > 0 && page.map((item, index) => {
            return(
              <Link
              key={item.id}
              to={`page-viewer?sid=${item.id}`}
              className='text-[#000] mb-[10px] cursor-pointer block mr-[25px] hover:bg-[#ebecf0] pl-[10px] py-[7px] hover:text-[#525cce] hover:rounded-md font-light md:font-normal md:text-[14px]'
              >
                    {item.name}
              </Link>
            )
          })  }
          {[
            {name:"create-page", field: "create page"}, {name:"list-page", field: "list page"}
          ].map((page, index) => {
              return(
                <Link 
                  key={index}
                  to={`/${page.name}`}
                  className='text-[#000] mb-[10px] cursor-pointer block mr-[25px] hover:bg-[#ebecf0] pl-[10px] py-[7px] hover:text-[#525cce] hover:rounded-md font-light md:font-normal md:text-[14px]'
                >
                  {page.field}
                </Link>
              )
          })}
        </div>
      </div>
    </div>
  )
}

export default Aside