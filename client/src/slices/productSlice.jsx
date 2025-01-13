import {createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {list,getById} from "../Services/Product"
const initialState={
    currentPage:1,
    error:" ",
    loading: false,
    limit:20,
    products:[],
    product:{},
    total:0,

}
export const fetchProducts=createAsyncThunk(
    "products/fetchProducts",
    async({limit,page})=>{ 
        const resp= await list({limit,page});
          return resp.data;

}
)
export const getProducts=createAsyncThunk(
    "products/getProducts",
    async(id)=>{  
        const resp= await getById(id);
          return resp.data;

}
)

export const productSlice= createSlice({
    name:'products',
    initialState,
    reducers:{
        setCurrentPage:(state,action)=>{
            state.currentPage = action.payload;

        },
        setLimit:(state,action)=>{
          state.currentPage=1;
          state.limit= action.payload;
        },
        getById:(state,action)=>{
            state.product= state.products.find((item)=>item?._id===action.payload)

        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchProducts.fulfilled,(state,action)=>{
            state.products=action.payload.data.data;
            state.total = action.payload.data.total;   
            state.loading= false;})
        .addCase(fetchProducts.pending,(state)=>{
            state.loading= true;})
        .addCase(fetchProducts.rejected,(state,action)=>{
            state.loading= false;
            state.error= action.error.message;
        })
        .addCase(getProducts.fulfilled,(state,action)=>{
            state.product=action.payload.data; 
            state.loading= false;})
        .addCase(getProducts.pending,(state)=>{
            state.loading= true;})
        .addCase(getProducts.rejected,(state,action)=>{
            state.loading= false;
            state.error= action.error.message;
        })
    }
});
export const {setCurrentPage,setLimit}= productSlice.actions;

export const productReducer = productSlice.reducer;