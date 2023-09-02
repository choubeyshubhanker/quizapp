"use client";
import React from "react";
import Timer from "@/components/Timer/Timer";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { AppDispatch, useAppSelector } from "@/reduxStore/store";
import { useDispatch, useSelector } from "react-redux";
import { addAnswer } from "@/reduxStore/features/answerGiven";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from 'next/navigation';


const Test = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [submitTest, setSubmitTest] = React.useState(false);
  const [selectedAnswer, setSelectedAnswer] = React.useState("");
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});

  const dispatch = useDispatch<AppDispatch>();
  const state = useAppSelector((state) => state);
  const { user } = useAuth();
  const router = useRouter();
  console.log("state questions ", state.answerGivenReducer);

  const questions = useAppSelector((state) => state?.quesData?.data?.results);
  console.log("questions ", questions);


  const totalSteps = () => {
    return questions.length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const handleNext = (attempt: {
    question: string;
    correct_answer: string;
  }) => {
    const test = isLastStep();
    console.log("isLastStep", test);
    if (!test) {
      setActiveStep((prev) => prev + 1);
    }
    dispatch(
      addAnswer({
        email: user?.email,
        question: attempt.question,
        selectedAnswer: selectedAnswer,
        correctAnswer: attempt.correct_answer,
      })
    );
    setSelectedAnswer("");
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    setSubmitTest(true)
    setTimeout(() => {
        router.push('/report');
    }, 3000);
  };
  console.log("active == ", activeStep);

  return (
    <div>
      {submitTest?(<h1>Thank You!!</h1>):(
        <>
      <Timer />
      
      <Box sx={{ width: "100%" }}>
        <Stepper nonLinear activeStep={activeStep}>
          {questions.map((ques: string, index: number) => (
            <Step key={index} completed={completed[index]}>
              <StepButton color="inherit" onClick={handleStep(index)}>
                {index + 1}
              </StepButton>
            </Step>
          ))}
        </Stepper>
        <div>
          <React.Fragment>
            <FormControl>
              <Typography sx={{ mt: 2, mb: 1, p: 2 }}>
                <FormLabel id="demo-row-radio-buttons-group-label">{`Ques ${
                  activeStep + 1
                }: ${questions[activeStep].question}`}</FormLabel>
              </Typography>
              <Box sx={{ height: 255, maxWidth: 400, width: "100%", p: 2 }}>
                <RadioGroup
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                >
                  {questions[activeStep].incorrect_answers.map(
                    (ans: string, idx: number) => (
                      <FormControlLabel
                        key={ans}
                        value={ans}
                        control={<Radio />}
                        label={ans}
                      />
                    )
                  )}

                  <FormControlLabel
                    value={questions[activeStep].correct_answer}
                    control={<Radio />}
                    label={questions[activeStep].correct_answer}
                  />
                </RadioGroup>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  flexDirection: "row",
                  pt: 2,
                }}
              >
                <Button
                  disabled={!selectedAnswer && true}
                  onClick={() => handleNext(questions[activeStep])}
                  sx={{ mr: 1 }}
                >
                  Submit Answer
                </Button>
                <Button onClick={handleComplete}> Submit Test </Button>
              </Box>
            </FormControl>
          </React.Fragment>
        </div>
      </Box>
      </>
      )}
    </div>
  );
};

export default Test;
