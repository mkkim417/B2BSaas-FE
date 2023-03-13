import { configureStore } from '@reduxjs/toolkit'
import sendList from '../modules/sendList'
import sendKey from '../modules/sendKey'
import sendGroupName from '../modules/sendGroupName'

const store = configureStore({
  reducer: {
    sendList,
    sendKey,
    sendGroupName,
  },
})
export default store
