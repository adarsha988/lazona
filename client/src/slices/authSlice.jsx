import {createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {login} from "../Services/Auth";
import { setToken } from "../utils/session";
const initialState={
    isLoggedIn:false,
    error:" ",
    roles:[],
    loading: false,
    user:{},

}
export const loginUser=createAsyncThunk(
    "auth/login",
    async({email,password}, { rejectWithValue })=>{ 
         try{
        const resp= await login({email,password});
        return resp.data; 
    }
        catch(err){
            if(!err.response){
                throw err
            }
         return rejectWithValue(err.response.data)
        }
        }
          


)



export const authSlice= createSlice({
    name:'auth',
    initialState,
    reducers:{
           setIsloggedIn:(state,action)=>{
               state.isLoggedIn= action.payload;
           },
           setloggedOut:(state)=>{
               state.user={};
               state.roles=[];
               state.isLoggedIn= false;
           }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(loginUser.fulfilled,(state,action)=>{
            state.isLoggedIn=true;
            state.user=action.payload.data.user;
            console.log(action.payload,"fullfill")
             setToken(action.payload.data.token)
            state.roles.push(...action.payload.data.user.roles) 
            state.loading= false;
            })
        .addCase(loginUser.pending,(state)=>{
            state.loading= true;})
        .addCase(loginUser.rejected,(state,action)=>{
            state.loading= false;
            state.error= action.payload.msg;
        })
    }
});
export const {setIsloggedIn,setloggedOut}= authSlice.actions;

export const authReducer =authSlice.reducer;