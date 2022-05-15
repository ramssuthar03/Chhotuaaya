import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  orderstatus: [],
};

const OrderReducer = createSlice({
  name: 'order',
  initialState,
  reducers: {},
});
export const {} = OrderReducer.actions;
export default OrderReducer;
