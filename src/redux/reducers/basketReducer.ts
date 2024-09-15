import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BasketState {
  items: Array<any>;
}

const initialState: BasketState = {
    items: [] as any[], 
};

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<any>) => {
      state.items.push(action.payload);
    },
    clearBasket: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, clearBasket } = basketSlice.actions;
export default basketSlice.reducer;
