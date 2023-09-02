import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';


interface dialogProps {
    open : boolean,
    handleClose: ()=>void,
    email:string | null
}

export const DialogBox = ({open, handleClose,email}:dialogProps) => {
    const [enteredEmail, setEnteredEmail] = React.useState("")

    const router = useRouter();

    const handleNavigation = () => {
      router.push('/test');
    };

    const handleEmail=(event:React.ChangeEvent<HTMLInputElement>)=>{
        setEnteredEmail( event.target.value)
    }
  return (
    <div>
    {/* <Button variant="outlined" onClick={handleClickOpen}>
      Open form dialog
    </Button> */}
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Warning!!</DialogTitle>
      <DialogContent>
        <DialogContentText>
          If you agree please enter your registered email for Confirmation.
        </DialogContentText>
        <Typography variant="caption" display="block" gutterBottom>
        You have to type it, copy paste no work. 
        Here is you registered email. {email}
      </Typography>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
          variant="standard"
          required
          onPaste={(e)=>{
            e.preventDefault()
            return false;
          }}
          autoComplete="off"
          onChange={(event:React.ChangeEvent<HTMLInputElement>)=>handleEmail(event)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button disabled={enteredEmail!==email&&true} onClick={handleNavigation}>Start</Button>
      </DialogActions>
    </Dialog>
  </div>
  )
}
