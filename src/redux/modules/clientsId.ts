import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import axios from 'axios';
const initialState: any = {
  clientsId: [],
};

const clientsIdSlice = createSlice({
  name: 'clientsId',
  initialState,
  reducers: {
    clientsIdCreate: (state, action) => {
      return { clientsId: [...state.clientsId, action.payload] };
    },
  },
});
export default clientsIdSlice.reducer; //리듀서
export const { clientsIdCreate } = clientsIdSlice.actions; //액션크리에이터
