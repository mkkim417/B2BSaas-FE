import { configureStore } from '@reduxjs/toolkit'
import cart from '../modules/cart'

const store = configureStore({
  reducer: {
    cart,
  },
})
export default store
