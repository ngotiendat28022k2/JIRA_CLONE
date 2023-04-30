import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Icon, Typography } from '@mui/material'
import NotListedLocationIcon from '@mui/icons-material/NotListedLocation';

type Props = {
    title:string
    subtitle:string
    color:string
    confirmDialog:{},
    setConfirmDialog:string
    projectId:string,
}

const ConfirmDialog = (props: any) => {
    const { confirmDialog, setConfirmDialog, onConfirm } = props

    // console.log("confirmDialog", confirmDialog);
    
    const handleRemove = (e:any) => {
        if(e.type === "click"){
           setConfirmDialog({
                ...confirmDialog,
                isOpen:false
           })
           onConfirm(confirmDialog.projectId, confirmDialog.router)
        }
    }
  return (
    <Dialog 
        open={confirmDialog.isOpen}
        disableScrollLock
        sx={{
        }}
    >
 
        <DialogTitle
                sx={{
                    textAlign:"center"
                }}
            >
                <NotListedLocationIcon 
                    sx={{
                        margin:"auto",
                        width:"50px",
                        color:"red",
                        fontSize:"70px"
                    }}
                />
            </DialogTitle>

            <DialogContent>
                <Typography
                    variant='h2'
                    sx={{
                        fontSize:"18px",
                        color:"red",
                        textTransform:"uppercase"

                    }}
                >
                    {confirmDialog.title}
                </Typography>

                <Typography
                    variant='subtitle2'
                    sx={{
                        fontSize:"12px",
                        color:"#616f85",
                        marginLeft:"2px",
                        marginTop:"4px",
                        textTransform:"capitalize"

                    }}
                >
                    {confirmDialog.subTitle}
                </Typography>

            </DialogContent>

            <DialogActions 
            >
                <Button onClick={() => setConfirmDialog({...confirmDialog, isOpen:false})}>NO</Button>
                <Button onClick={handleRemove}>YES</Button>
            </DialogActions>
    </Dialog>
  )
}

export default ConfirmDialog