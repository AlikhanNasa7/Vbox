import {combineReducers, configureStore, createSlice, current} from '@reduxjs/toolkit';
import { productsData } from '../data';


const initialState = {
    items: [],
    microwave: {
        isNeeded: false,
        price: 200
    }
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
      addItem(state, action) {
        const index = state.items.findIndex(item=>item.id===action.payload.id);

        if (index==-1){
            const currentItem = action.payload;
            currentItem.quantity = 1;
            state.items.push(currentItem);
        }else{
            state.items[index].quantity += 1;
        }
      },
      removeItem(state, action) {
        const index = state.items.findIndex(item => item.id === action.payload);
        if (index==-1){
            return;
        }

        if (state.items[index].quantity==1){
            state.items = state.items.filter(item=>item.id !==action.payload);
        }else{
            state.items[index].quantity -= 1;
        }

      },
      clearCart(state) {
        state.items = [];
      },
      toggleMicrowave(state){
        state.microwave.isNeeded = !state.microwave.isNeeded;
      },
      nullMicrowave(state){
        state.microwave.isNeeded = false;
      }
    },
});

export const cartActions = cartSlice.actions;

const store = configureStore({
    reducer: {
        cart: cartSlice.reducer
    }
})

export default store;