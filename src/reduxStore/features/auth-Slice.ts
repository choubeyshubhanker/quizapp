import { createSlice, PayloadAction, } from "@reduxjs/toolkit";
// import { HYDRATE } from "next-redux-wrapper";

type InitialState={
    value: AuthState;
}
type AuthState={
    isAuth: boolean,
    displayName: string,
    email:string,
    uid:string,
}

const initialState = {
    value : {
        isAuth: false,
        displayName:"",
        email:"",
        uid:"",
    } as AuthState,
} as InitialState

export const auth = createSlice({
    name : "auth",
    initialState,
    reducers:  {
        logOut: () =>{
            return initialState;
        },
        logIn: (state,action:PayloadAction<string>)=>{

            console.log("payload ", action)
            return {
                value : {
                    isAuth: true,
                    displayName: action.payload,
                    email: action.payload,
                    uid : "jfdkajkldkla",
                },
            };
        },
    },
    // extraReducers: {
    //     [HYDRATE]: (state, action) => {
    //       return {
    //         ...state,
    //         ...action.payload.auth,
    //       };
    //     },
    //   },

});

export const { logIn, logOut } = auth.actions;
export default auth.reducer;