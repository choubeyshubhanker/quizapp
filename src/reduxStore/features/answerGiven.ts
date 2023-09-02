import { createSlice, PayloadAction, } from "@reduxjs/toolkit";
// import { HYDRATE } from "next-redux-wrapper";

export  interface InitialState {
    email: string | null | undefined,
    question: string,
    selectedAnswer: string,
    correctAnswer : string,
}


const initialState: Array<InitialState> = []


export const answerGiven = createSlice({
    name : "answerGiven",
    initialState,
    reducers:  {
        addAnswer: (state, action: PayloadAction<InitialState>) => {
            console.log("state ", action.payload )
            state.push(action.payload);
          },
          clearStore:()=> initialState
    },
   
    //
});
export const { addAnswer,clearStore } = answerGiven.actions;
export default answerGiven.reducer;