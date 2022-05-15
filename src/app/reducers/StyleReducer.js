import {createSlice} from '@reduxjs/toolkit';
import tw from 'twrnc';
const initialState = {
  radioStyle: [
    {
      id: 1,
      value: 10,
      unselectedStyle: tw`w-15 h-7 rounded-1 border border-red-500 items-center justify-center mr-2`,
      unselectedTextStyle: tw`text-red-500`,
    },
    {
      id: 2,
      value: 20,
      unselectedStyle: tw`w-15 h-7 rounded-1 border border-red-500 items-center justify-center mr-2`,
      unselectedTextStyle: tw`text-red-500`,
    },
    {
      id: 3,
      value: 30,
      unselectedStyle: tw`w-15 h-7 rounded-1 border border-red-500 items-center justify-center mr-2`,
      unselectedTextStyle: tw`text-red-500`,
    },
    {
      id: 4,
      value: 'Other',
      unselectedStyle: tw`w-15 h-7 rounded-1 border border-red-500 items-center justify-center mr-2`,
      unselectedTextStyle: tw`text-red-500`,
    },
  ],
};

const StyleReducer = createSlice({
  name: 'style',
  initialState,
  reducers: {
    select: (state, action) => {
      const rawData = [
        {
          id: 1,
          value: 10,
          unselectedStyle: tw`w-15 h-7 rounded-1 border border-red-500 items-center justify-center mr-2`,
          unselectedTextStyle: tw`text-red-500`,
        },
        {
          id: 2,
          value: 20,
          unselectedStyle: tw`w-15 h-7 rounded-1 border border-red-500 items-center justify-center mr-2`,
          unselectedTextStyle: tw`text-red-500`,
        },
        {
          id: 3,
          value: 30,
          unselectedStyle: tw`w-15 h-7 rounded-1 border border-red-500 items-center justify-center mr-2`,
          unselectedTextStyle: tw`text-red-500`,
        },
        {
          id: 4,
          value: 'Other',
          unselectedStyle: tw`w-15 h-7 rounded-1 border border-red-500 items-center justify-center mr-2`,
          unselectedTextStyle: tw`text-red-500`,
        },
      ];

      state.radioStyle = rawData;
      state.radioStyle[action.payload.id - 1] = {
        id: action.payload.id,
        value: action.payload.value,
        unselectedStyle: tw`w-15 h-7 rounded-1 bg-red-500 items-center justify-center mr-2`,
        unselectedTextStyle: tw`text-white`,
      };
    },
  },
});
export const {select} = StyleReducer.actions;
export default StyleReducer;
