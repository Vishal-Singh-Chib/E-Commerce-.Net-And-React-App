import { createSlice } from "@reduxjs/toolkit";

export type CounterState = {
    data : number
}

const initialState: CounterState ={
    data:42
}

export const counterSlice = createSlice({
    name:'counter',
    initialState,
    reducers:{
        increament :(state,action)=>{
               state.data+= action.payload
        },
        decreament :(state,action)=>{
               state.data+= action.payload
        },
    }
});

export const {increament,decreament}=counterSlice.actions;

export function increamentLagacy(amount=1){
    return { 
        type:'increament',
        payload : amount
    }
}

export function decreamentLagacy(amount=1){
    return {
        type:'decreament',
        payload : amount
    }
}

export default function counterReducer(state=initialState,action :{type:string,payload : number}){
   switch(action.type)
   {
   case 'increament' :
    return {
          ...state,
          data:state.data+ action.payload
    }
     case 'decreament' :
    return {
          ...state,
          data:state.data- action.payload
    }
     default: 
    break 
   }
    return state;
}