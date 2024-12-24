import {createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as ORDER_API from "../Services/Order"
const initialState={
    currentPage:1,
    error:" ",
    loading: false,
    orders:[],
    order:{},
    total:0,

}
export const create=createAsyncThunk(
    "orders/create",
    async(payload)=>{
       
   const response= await ORDER_API.create(payload);
 console.log(response)
   return response.data

}
)

export const orderSlice= createSlice({
    name:'orders',
    initialState,
    reducers:{
        setCurrentPage:(state,action)=>{
            state.currentPage = action.payload;

        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(create.fulfilled,(state,action)=>{
           state.orders.push(action.payload.data); 
            state.loading= false;})
        .addCase(create.pending,(state)=>{
            state.loading= true;})
        .addCase(create.rejected,(state,action)=>{
            state.loading= false;
            state.error= action.payload?.message||"something went wrong";
        })
    }
});
export const {setCurrentPage}= orderSlice.actions;

export const orderReducer = orderSlice.reducer;