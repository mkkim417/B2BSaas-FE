import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import axios from 'axios';
const initialState: any = {
  kakaoSendData: [],
};

const kakaoSendDataSlice = createSlice({
  name: 'kakaoSendData',
  initialState,
  reducers: {
    kakaoSendDataCreate: (state, action) => {
      return { kakaoSendData: [...state.kakaoSendData, action.payload] };
    },
  },
});
export default kakaoSendDataSlice.reducer; //리듀서
export const { kakaoSendDataCreate } = kakaoSendDataSlice.actions; //액션크리에이터
