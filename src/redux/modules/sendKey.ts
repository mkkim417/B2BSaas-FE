import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import axios from 'axios'
const initialState: any = {
  sendKey: [],
}

const sendKeySlice = createSlice({
  name: 'sendKey',
  initialState,
  reducers: {
    sendKeyCreate: (state, action) => {
      console.log('action.payload : ', action.payload)
      return { sendKey: [...state.sendKey, action.payload] }
    },
  },
})
export default sendKeySlice.reducer //리듀서
export const { sendKeyCreate } = sendKeySlice.actions //액션크리에이터
