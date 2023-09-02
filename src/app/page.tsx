"use client"
import {useDispatch, useSelector} from "react-redux"
import { useAuth } from "@/context/AuthContext";
import { AppDispatch, useAppSelector } from '@/reduxStore/store';
import React from 'react';
import { DialogBox } from '@/components/Dialog/DialogBox';
import { fetchQuesData } from '@/reduxStore/features/quesData';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { clearStore } from "@/reduxStore/features/answerGiven";
import GoogleIcon from '@mui/icons-material/Google';



export default function Home() {
  const {user, googleSignIn, logOut, loading} = useAuth()
  const dispatch = useDispatch<AppDispatch>()
  const state = useAppSelector((state)=> state?.quesData?.data)

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    dispatch(fetchQuesData())
    dispatch(
      clearStore()
    );
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

  // console.log("sign", user)
  const signIn =()=>{
    try{
      googleSignIn()
    } 
    catch(error){
      console.log(error)
    }
  }

  return (
    <main className="flex h-screen flex-col items-center justify-evenly bg-cover home">
      <div className='bg-gradient-to-b from-white via-slate-300 to-transparent  h-[50%] w-[80%] flex items-center justify-evenly lg:w-[50%]  flex-col rounded-2xl animation'>
    { user? (
      <>
      <div>
      <h1 className='text-xl font-bold m-1'>Hello {user.displayName}!!</h1>
      <Button variant="contained"  onClick={handleClickOpen} startIcon={<PlayCircleOutlineIcon />}>
    Do You want to Start quiz!!
  </Button>
      <DialogBox open={open} handleClose={handleClose} email={user.email}/>
      </div>
      <Button variant="contained"  onClick={logOut} startIcon={<LogoutIcon />}>
    Logout
  </Button>
    </>
    ):(<Button variant="outlined" onClick={signIn} startIcon={<GoogleIcon />}>
    Login
  </Button>)
    }
    </div>
    </main>
  )
}
