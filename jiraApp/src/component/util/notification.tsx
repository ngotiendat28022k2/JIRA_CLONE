import React from 'react'
import Snackbar from '@mui/material/Snackbar/Snackbar';
import Alert from '@mui/material/Alert';

type Props = {

}

const Notification = (props: any) => {
  const {notify, setNotify} = props
  // console.log(props);
  
  const handleClose = (event: React.SyntheticEvent | Event, reason?:string) => {
    if(reason === " clickaway") {
      return;
    }
    setNotify({
      ...notify,
      isOpen:false
    })
  }
  return (
    <Snackbar
      open={notify.isOpen}
      autoHideDuration={3000}
      anchorOrigin={{ vertical:"top", horizontal:"right" }}
      onClose={handleClose}
    > 
        <Alert 
          severity={notify.type}
          onClose={handleClose}
        >
          {notify.message}
        </Alert>
    </Snackbar>
  )
}

export default Notification