import { fetchBaseQuery, type BaseQueryApi, type FetchArgs } from "@reduxjs/toolkit/query";
import { startLoading, stopLoading } from "../layout/uiSlice";
 

const customBaseQuery = fetchBaseQuery({
    baseUrl:'https://localhost:5001/api',
    prepareHeaders: (headers) => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem("user");
    if (token && user) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
})

export const baseQueryWithErrorHandling = async (args:string| FetchArgs,api:BaseQueryApi,extraOptions : object)=>{    
    api.dispatch(startLoading());
    const result = await customBaseQuery(args,api,extraOptions);
    api.dispatch(stopLoading());
     
    if(result.error){
        const {status,data}=result.error;
        console.log(status,data);
     }
return result;
}