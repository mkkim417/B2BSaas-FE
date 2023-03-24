import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import axios from 'axios';
const initialState: any = {
  kakaoGroupId: [],
};

const kakaoGroupIdSlice = createSlice({
  name: 'kakaoGroupId',
  initialState,
  reducers: {
    kakaoGroupIdCreate: (state, action) => {
      return { kakaoGroupId: [...state.kakaoGroupId, action.payload] };
    },
  },
});
export default kakaoGroupIdSlice.reducer; //리듀서
export const { kakaoGroupIdCreate } = kakaoGroupIdSlice.actions; //액션크리에이터
