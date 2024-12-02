import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    cart: [],
    quantity: 0,
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
                console.log(state.cart)
            }
            state.quantity=state.cart.reduce((total,item)=>total+item.quantity,0)
        } ,
        removeItem:(state,action)=>{
            state.cart= state.cart.filter((cart)=>cart.id!==action.payload)
            console.log(state.cart)
            state.quantity=state.cart.reduce((total,item)=>total+item.quantity,0)
        },
        increaseQuantity:(state, action)=>{ 
                const itemInCart= state.cart.find((item)=> item.id===action.payload)
                
                if(itemInCart){
                     itemInCart.quantity++;
                   state.quantity=state.cart.reduce((total,item)=>total+item.quantity,0)
                  }
            },
        decreaseQuantity:(state, action)=>{
              const itemInCart= state.cart.find((item)=>item.id===action.payload)
                if (itemInCart){
                    if (itemInCart.quantity>1){
                        itemInCart.quantity--;
                        state.quantity=state.cart.reduce((total,item)=>total+item.quantity,0)
                    }else{
                        state.cart=state.cart.filter((item)=>item.id!==action.payload);
                    }
                }
            },
    }
});


export const  {addToCart,removeItem,increaseQuantity,decreaseQuantity}=cartSlice.actions;
export const cartReducer= cartSlice.reducer