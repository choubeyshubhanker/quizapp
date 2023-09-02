import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
// import { HYDRATE } from "next-redux-wrapper";

type InitialState={
    isLoading: boolean,
    data: any,
    isError: boolean,
}


const initialState = {
   isLoading: false,
   data: null,
   isError: false
} as InitialState

export const fetchQuesData = createAsyncThunk("fetchQuesData", async ()=> {
    const response = await fetch("https://opentdb.com/api.php?amount=15");
    return response.json()
})

export const quesData = createSlice({
    name : "quesData",
    initialState,
    reducers:  {
    },
    extraReducers:(builder)=> {
        builder.addCase(fetchQuesData.pending,(state,action)=>{
            state.isLoading = true;
        })
        builder.addCase(fetchQuesData.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.data= action.payload
        })
        builder.addCase(fetchQuesData.rejected,(state,action)=>{
            console.log("Error", action.payload);
            state.isError = true;
        })
    }
    // extraReducers: {
    //     [HYDRATE]: (state, action) => {
    //       return {
    //         ...state,
    //         ...action.payload.auth,
    //       };
    //     },
    //   },

});

// export const { logIn, logOut } = quesData.actions;/
export default quesData.reducer;