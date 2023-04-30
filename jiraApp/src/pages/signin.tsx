import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useForm, SubmitHandler} from "react-hook-form"
import { IUser } from '../interfaces/users';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import { signin } from '../slice/users';
import Notification from '../component/util/notification';
import { useNavigate } from 'react-router-dom';
import { dividerClasses } from '@mui/material';
import axios, { AxiosHeaders } from 'axios';
import { createDevice, fetchDevices } from '../slice/device';
import VerifyOtp from '../component/verifyOtp';
import { createOtp } from '../slice/otp';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();
const flatform = platform
export default function  SignIn() {
  const [notify, setNotify] = React.useState({isOpen:false, message:"", type:"success"})
  const [device, setDevice] = React.useState<any>({
    os:flatform.os.family,
    version:flatform.version,
    ua:flatform.ua
  })
  const dispatch = useDispatch<AppDispatch>()
  const navigate= useNavigate()
  const {
    register,
    handleSubmit,
    formState:{
      errors
    }
  } = useForm()

  React.useEffect(() => {
    axios.get(`http://ip-api.com/json`)
    .then(res => {
      return res.data
    })
    .then(data => {
      setDevice(prev => ({...prev, address:data.city}))
      setDevice(prev => ({...prev, ip:data.query}))
      setDevice(prev => ({...prev, country:data.country}))

    })
    .catch(error => console.log(error));
  }, [])

  React.useEffect(() => {
    localStorage.removeItem("device")
    localStorage.setItem("device", JSON.stringify(device))
  },[device])
  localStorage.setItem("device", JSON.stringify(device))


  const onHandleSubmit:SubmitHandler<IUser> =async (data:IUser) => {
    try {
      const user = {
        email:data.email?.trim(),
        password:data.password?.trim(),
      }
      await dispatch(signin(user)).then(async({payload}) => {
          if(payload?.user){
            setNotify({
              isOpen:true,
              message:`Hello ${payload?.user.email}`,
              type:"success"
              
            })
              window.localStorage.setItem('user', JSON.stringify(payload));
              setTimeout(() => {
                navigate("/projects-management")
              }, 500)
          }
          if(payload.device) {
            console.log(payload)
            if(confirm("you log in with a strange device, check gmail for authentication")) {
               window.localStorage.setItem('user', JSON.stringify(payload.device));
               const emailOTP = {
                email:payload.device.email
               }
               await dispatch(createOtp(emailOTP))
              setTimeout(() => {
                navigate("/verify-otp")
              }, 500)
            }
          }
      }).catch((error) => {
        console.log("error 1", error)
          setNotify({
            isOpen:true,
            message:`error ${error}`,
            type:"warning"
          })
      })

    } catch (error) {
      console.log("error", error);
    }
  }

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
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit(onHandleSubmit)}  sx={{ mt: 1, width:"100%", maxWidth:"400px" }}>
                  <TextField
                    autoComplete="given-name"
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
                  
                    <TextField
                    sx={{
                      marginTop:"20px"
                    }}
                    autoComplete="given-name"
                    fullWidth
                    id="password"
                    label="Password"
                    {...register("password", {
                      required:"please enter password value", 
                      minLength: {
                        value:8,
                        message:"password length of 8 characters or more"
                      }
                    })}
                    />
                    {errors.password && <p className='capitalize text-red-600 text-[14px] ml-[2px] mt-[5px]'>{errors.password?.message}</p>}
            
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
      <Notification
        notify={notify}
        setNotify={setNotify}
      />
    </>
  );
}