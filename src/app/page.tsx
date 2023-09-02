"use client"
import Image from 'next/image'
import {useDispatch, useSelector} from "react-redux"
import { useAuth } from "@/context/AuthContext";
import { AppDispatch, useAppSelector } from '@/reduxStore/store';
import React from 'react';
import { DialogBox } from '@/components/Dialog/DialogBox';
import Timer from '@/components/Timer/Timer';
import { fetchQuesData } from '@/reduxStore/features/quesData';


export default function Home() {
  const {user, googleSignIn, logOut, loading} = useAuth()
  const dispatch = useDispatch<AppDispatch>()
  const state = useAppSelector((state)=> state?.quesData?.data)
  
  // console.log("state  = ", state?.results)
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    dispatch(fetchQuesData())
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

  console.log("sign", user)
  const signIn =()=>{
    try{
      googleSignIn()
    } 
    catch(error){
      console.log(error)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-evenly">
     <h1>Intiated</h1>
     <Timer/>
    { user? (
      <>
      <div>
      <h1>Hello {user.displayName}!!</h1>
      <button onClick={handleClickOpen} >Do You Want to Start Quiz?</button>
      <DialogBox open={open} handleClose={handleClose} email={user.email}/>
      </div>
    <button onClick={logOut}>Logout</button>
    </>
    ):(<button onClick={signIn}>Sign In</button>)
    }
    </main>
  )
}
