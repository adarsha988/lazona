import {configureStore} from "@reduxjs/toolkit";
import { cartReducer } from "./slices/cartSlice";
import storage from "redux-persist/lib/storage"
import {persistStore,persistReducer} from "redux-persist"
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

const persistConfig={
   key:"root",
   storage,
   stateReconciler:autoMergeLevel2

};
const persistedReducer= persistReducer(persistConfig,cartReducer)
export const store = configureStore({
 reducer:{
    cart:persistedReducer,
 },
});

export const persistor=persistStore(store);