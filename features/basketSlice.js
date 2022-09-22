import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex((item) => item.id === action.payload);

      let newBasket = [...state.items];

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Can't remove Product {id: ${action.payload.id} as its not in basket`
        );
      }
      state.items = newBasket;
    },
  },
});

// Action creators are generated for each case reducer function
export const selectBasketItems = (state) => state.basket.items;
export const { addToBasket, removeFromBasket } = basketSlice.actions;

export const selectBasketItemsWithId = (state, id) => {
  return state.basket.items.filter((item) => item.id === id);
};

export const selectBasketTotal = (state) => {
  return state.basket.items.reduce((total, item) => {
    return total += item.price;
  }, 0);
};

export default basketSlice.reducer;
