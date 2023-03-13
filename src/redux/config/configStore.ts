import { configureStore } from '@reduxjs/toolkit'
import sendList from '../modules/sendList'
import sendKey from '../modules/sendKey'

const store = configureStore({
  reducer: {
    sendList,
    sendKey,
  },
})
export default store
