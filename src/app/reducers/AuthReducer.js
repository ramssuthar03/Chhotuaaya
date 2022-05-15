import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  user: {
    success: false,
    data: {
      id: null,
      auth_token: null,
      name: null,
      email: null,
      phone: null,
      default_address_id: null,
      default_address: {
        address: null,
        house: null,
        latitude: null,
        longitude: null,
        tag: null,
      },
      wallet_balance: 0,
      avatar: null,
      tax_number: null,
    },
    running_order: null,
    delivery_details: null,
  },
};

const AuthReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    updateAddress: (state, action) => {
      state.user.data.default_address = action.payload;
    },
    setDefaultAddress: (state, action) => {
      state.user.data.default_address_id = action.payload.id;
      state.user.data.default_address = {
        address: action.payload.address,
        house: action.payload.house,
        latitude: action.payload.latitude,
        longitude: action.payload.longitude,
        tag: action.payload.tag,
      };
    },
    logout: (state, action) => {
      state.user.success = action.payload;
      
    },
    updateUser: (state, action) => {
     state.user = action.payload
    },
  },
});
export const {login, updateAddress, setDefaultAddress, logout,updateUser} =
  AuthReducer.actions;
export default AuthReducer;
