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
          const itemInCart=state.cart.find((item)=>item._id===action.payload._id)
          if(itemInCart){
            if(itemInCart.quantity < action.payload.quantity)
               {itemInCart.quantity++;} 
               
            }else{
                state.cart.push({...action.payload,quantity:1});
                console.log(state.cart)
            }
            state.quantity=state.cart.reduce((total,item)=>total+item.quantity,0)
        } ,
        removeItem:(state,action)=>{
            state.cart= state.cart.filter((cart)=>cart._id!==action.payload)
            
            state.quantity=state.cart.reduce((total,item)=>total+item.quantity,0)
        },
        increaseQuantity:(state, action)=>{ 
                const itemInCart= state.cart.find((item)=> item._id===action.payload.id)
                
                const checkProduct= action.payload.products.find((item)=>item._id===itemInCart._id)
                if(itemInCart){
                    if(itemInCart.quantity<checkProduct.quantity)
                          {  itemInCart.quantity++;}
                   state.quantity=state.cart.reduce((total,item)=>total+item.quantity,0)
                  }
            },
        decreaseQuantity:(state, action)=>{
              const itemInCart= state.cart.find((item)=>item._id===action.payload)
                if (itemInCart){
                    if (itemInCart.quantity>1){
                        itemInCart.quantity--;
                        state.quantity=state.cart.reduce((total,item)=>total+item.quantity,0)
                    }else{
                        state.cart=state.cart.filter((item)=>item._id!==action.payload);
                    }
                }
            },
            removeAll:(state)=>{
                state.cart =[];
                state.quantity=0;
            }
    }
});


export const  {addToCart,removeItem,increaseQuantity,decreaseQuantity,removeAll}=cartSlice.actions;
export const cartReducer= cartSlice.reducer