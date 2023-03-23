import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import axios from 'axios';
const initialState: any = {
  sendList: [],
};

const sendListSlice = createSlice({
  name: 'sendList',
  initialState,
  reducers: {
    sendListCreate: (state, action) => {
      return { sendList: [...state.sendList, action.payload] };
    },
  },
});
export default sendListSlice.reducer; //리듀서
export const { sendListCreate } = sendListSlice.actions; //액션크리에이터
