import { configureStore } from '@reduxjs/toolkit';
import sendList from '../modules/sendList';
import sendKey from '../modules/sendKey';
import sendGroupName from '../modules/sendGroupName';
import clientsId from '../modules/clientsId';
import kakaoSendData from '../modules/kakaoSendData';

const store = configureStore({
  reducer: {
    sendList,
    sendKey,
    sendGroupName,
    clientsId,
    kakaoSendData,
  },
});
export default store;
