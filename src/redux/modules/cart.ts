import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import axios from 'axios'
const initialState: any = {
  cart: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    cartCreate: (state, action) => {
      return { cart: [...state.cart, action.payload] }
    },
  },
})
export default cartSlice.reducer //리듀서
export const { cartCreate } = cartSlice.actions //액션크리에이터
