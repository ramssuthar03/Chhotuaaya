import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  products: [],
  totalAmount: 0,
  totalItems: 0,
  deliveryCharge: 40,
  totalPayAmount: 0,
};

const CartReducer = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    AddToCart: (state, action) => {
      const {products} = state;
      const {payload} = action;
      const doesItemExist = products.find(product => product.id === payload.id);
      doesItemExist === undefined
        ? products.push(payload)
        : products.map(product => {
            product.id === payload.id ? (product.quantity += 1) : null;
          });

      state.totalAmount = 0;
      state.totalItems = 0;
      state.products.map(product => {
        state.totalAmount =
          state.totalAmount + +product.quantity * +product.price;
        state.totalItems = state.totalItems + +product.quantity;
      });
      state.deliveryCharge = 0;
    },
    SubQuantity: (state, action) => {
      const {products} = state;
      const {payload} = action;
      const doesItemExist = products.find(product => product.id === payload.id);
      doesItemExist === undefined
        ? null
        : products.map((product, index) => {
            product.id === payload.id ? (product.quantity -= 1) : null;
            product.quantity === 0 ? products.splice(index, 1) : null;
          });
      state.totalAmount = 0;
      state.totalItems = 0;
      state.products.map(product => {
        state.totalAmount =
          state.totalAmount + +product.quantity * +product.price;
        state.totalItems = state.totalItems + +product.quantity;
      });
      state.deliveryCharge=0;
    },

    updateTotalPayAmount: (state, action) => {
      state.totalPayAmount = action.payload.totalPayAmount;
    },
    resetCart:(state,action)=>{
        if(action.payload){
          state.products = [],
        state.totalAmount= 0,
        state.totalItems = 0,
        state.totalPayAmount = 0
        state.deliveryCharge = 0
        }
    }
  },
});
export const {AddToCart, SubQuantity, updateTotalPayAmount,resetCart} =
  CartReducer.actions;
export default CartReducer;
