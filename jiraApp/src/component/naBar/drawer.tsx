import { Icon } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import Item from 'antd/es/list/Item';

type Props = {}

function HomeIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

const Drawer = (props: Props) => {
  const styles = (theme:any) => ({
    hover: {
      "&:hover": {
        backgroundColor: 'rgb(7, 177, 77, 0.42)'
      }
    }
  });
  
  return (
    <div className='text-center h-full relative'>
        <Grid container spacing={1}  >
          <Grid 
            item 
            xs={12}
          >
            <img 
              src="https://cdn.icon-icons.com/icons2/2699/PNG/512/atlassian_jira_logo_icon_170511.png" 
              className='w-full max-w-[35px] m-auto shadow-lg cursor-pointer'
              alt=""  
            />
          </Grid>
          <Grid 
            item
            xs={12} 
            sx={{ mt:"35px"}} 
          >
            {/* <Button>
              <Icon 
                className='fa-solid fa-magnifying-glass text-[#fff] cursor-pointer'
              />
            </Button> */}
          </Grid>
          {/* <Grid item xs={12}>
            <Icon className='fa-sharp fa-solid fa-plus text-[#fff] mt-[5px] cursor-pointer'></Icon>
          </Grid> */}
        </Grid>
        <div className='border-[1px] border-[#fff] w-[40px] py-[5px] m-auto rounded-3xl pt-[8px] absolute bottom-7 left-4'>
              <Icon className='fa-solid fa-question text-[#fff] cursor-pointer'></Icon>
        </div>
    </div>
  )
}

export default Drawer