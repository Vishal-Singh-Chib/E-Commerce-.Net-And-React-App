import { configureStore, legacy_createStore } from "@reduxjs/toolkit";
import counterReducer, { counterSlice } from "../../features/contact/counterReducer";
import { useDispatch, useSelector } from "react-redux";
import { uiSlice } from "../layout/uiSlice";
 import { PostAPI } from "../../features/post/PostAPI";
import { LoginAPI } from "../../features/login/LoginAPI";

export function configureTheStore(){
    return legacy_createStore(counterReducer)
}

export const store = configureStore({
    reducer:{
        [LoginAPI.reducerPath]:LoginAPI.reducer,
        [PostAPI.reducerPath]: PostAPI.reducer, 
        counter:counterSlice.reducer,
        ui : uiSlice.reducer
    },
    middleware :(getdefaultMiddleware) => 
        getdefaultMiddleware().concat(LoginAPI.middleware).concat(PostAPI.middleware),
    

})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
