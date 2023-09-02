"use client"
import * as React from 'react';
import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useEffect, useState } from "react";

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number, minutes:number,seconds:number  }
) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
        >{`${props.minutes}:${props.seconds}`}</Typography>
      </Box>
    </Box>
  );
}

interface Props{
  handleComplete : ()=> void,
  submitTest:boolean
}

const Timer = ({handleComplete,submitTest}:Props) => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [progress, setProgress] = React.useState(10);

  useEffect(() => {
    const timeNow = new Date()
    const target = (timeNow.getTime() + 30 * 60 * 1000)

    const interval = setInterval(() => {
      const now = new Date();
      const difference = target - now.getTime();

      const min = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      setMinutes(min);
      setProgress(min*3.3)

      const sec = Math.floor((difference % (1000 * 60)) / 1000);
      setSeconds(sec);

      if ( min <= 0 && sec <= 0) {
        handleComplete();
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [submitTest]);

  return (
    <CircularProgressWithLabel value={progress} minutes={minutes} seconds={seconds}  />
  );
};

export default Timer;
