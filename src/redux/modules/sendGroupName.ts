import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import axios from 'axios'
const initialState: any = {
  sendGroupName: [],
}

const sendGroupNameSlice = createSlice({
  name: 'sendGoupName',
  initialState,
  reducers: {
    sendGroupNameCreate: (state, action) => {
      return { sendGroupName: [...state.sendGroupName, action.payload] }
    },
  },
})
export default sendGroupNameSlice.reducer //리듀서
export const { sendGroupNameCreate } = sendGroupNameSlice.actions //액션크리에이터
