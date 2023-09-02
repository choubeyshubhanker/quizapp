import {configureStore, combineReducers} from '@reduxjs/toolkit';
import quesData from "./features/quesData"
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { fetchData } from './features/fetchData';
import  answerGivenReducer  from './features/answerGiven';
import { setupListeners } from '@reduxjs/toolkit/query'
import { Storage, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import { getDefaultMiddleware } from '@reduxjs/toolkit';

const persistConfig = {
    key: "root",
    version: 1,
    storage
}

const reducer = combineReducers({
    quesData,
    answerGivenReducer
})

const presistReducer = persistReducer(persistConfig, reducer)

export const store =  configureStore({
    reducer: presistReducer,
    devTools: true,
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

setupListeners(store.dispatch)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch =typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
