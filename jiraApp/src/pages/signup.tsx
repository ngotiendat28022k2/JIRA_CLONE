import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { IUser } from '../interfaces/users';
import { useDispatch } from 'react-redux';
import { signup } from '../slice/users';
import { AppDispatch } from '../app/store';
import ConfirmDialog from '../component/util/confirmDialog';
import Notification from '../component/util/notification';

function Copyright(props: any) {
  
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" to="#">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {

  const [notify, setNotify] = React.useState({isOpen:false, message:"", type:"success"})
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors
    }
  } = useForm()
  const dispatch = useDispatch<AppDispatch>()

  const onHandleSignup:SubmitHandler<IUser> =async (data) => {
    const user = {
      email: data.email?.trim()
    }
    if(user){
        await dispatch(signup(user)).then((res) => {
          setNotify({
          isOpen:true,
          message:`Create Accout SuccessFully, Password has been sent to gmail ${res.meta.arg.email}`,
          type:"success"
        })

        setTimeout(() => {
          navigate("/signin")
        }, 2000)
      }).catch((error) => {
        console.log(error)
        setNotify({
          isOpen:true,
          message:`account exists` ,
          type:"warning"
        })
      })
    }
  };

  return (
   <>
     <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth:"450px"
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(onHandleSignup)} sx={{ mt: 3, width:"100%" }}>
            <Grid container>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  required
                  fullWidth
                  id="email"
                  label="Address Email"
                  autoFocus
                  {...register("email", {
                    required:"please enter email value", 
                    pattern: {
                    value:/^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message:"please enter email invalidate"
                  }})}
                  />
                  {errors.email && <p className='capitalize text-red-600 text-[14px] ml-[2px] mt-[5px]'>{errors.email?.message}</p>}
              </Grid>

              <div className='flex items-start justify-between mt-[30px]'>

                <Grid item xs={5}>
                  
                </Grid>

                {/* <Grid item xs={5}>
                  <button>dd</button>
                </Grid> */}

              </div>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>

    <Notification
      notify={notify}
      setNotify={setNotify}
    />
   </>
  );
}