import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    cart: [{ id: 1, name: "table fan",price:100 ,quantity: 1 }],
}

export const cartSlice= createSlice({
    name:"cart",
    initialState,
    reducers:{
        addToCart:(state,action)=>{
          const itemInCart=state.cart.find((item)=>item.id===action.payload.id)
            if(itemInCart){
                itemInCart.quantity++;
            }else{
                state.cart.push({...action.payload,quantity:1});
            }
        } ,
        removeItem:(state,action)=>{
            state.cart= state.cart.filter((cart)=>cart.id!==action.payload)
        },
        increaseQuantity:(state, action)=>{ },
        decreaseQuantity:(state, action)=>{ },
    }
});

export const  {addToCart,removeItem}=cartSlice.actions;
export const cartReducer= cartSlice.reducer