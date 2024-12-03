import {createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as PRODUCT_API from "../Services/Product"
const initialState={
    currentPage:1,
    error:" ",
    loading: false,
    products:[],
    product:{},
    total:0,

}
export const fetchProducts=createAsyncThunk(
    "products/fetchProducts",
    async()=>{
   const response= await PRODUCT_API.list();
    
   return response.data

}
)

export const productSlice= createSlice({
    name:'products',
    initialState,
    reducers:{
        setCurrentPage:(state,action)=>{
            state.currentPage = action.payload;

        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchProducts.fulfilled,(state,action)=>{
            state.products=[...action.payload]; 
            state.loading= false;})
        .addCase(fetchProducts.pending,(state)=>{
            state.loading= true;})
        .addCase(fetchProducts.rejected,(state,action)=>{
            state.loading= false;
            state.error= action.payload.message;
        })
    }
});
export const {setCurrentPage}= productSlice.actions;

export const productReducer = productSlice.reducer;