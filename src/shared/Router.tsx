import { BrowserRouter, Route, Routes } from 'react-router-dom'
import TopNav from '../page/TopNav'
import { getUser } from '../util/localstorage'
import Home from '../page/Home'
import UploadPage from '../page/UploadPage'
import NoticePersonalList from '../page/NoticePersonalList'
import NoticeSendCreate from '../page/NoticeSendCreate'
import NoticeSendList from '../page/NoticeSendList'
import UserDataCreate from '../page/UserDataCreate'
import UserGroupCreate from '../page/UserGroupCreate'
import UserGroupList from '../page/UserGroupList'
import UserList from '../page/UserList'
import Statistics from '../page/Statistics'
import Alarmtalk from '../page/Alarmtalk'
import Header from '../components/Header'

const Router = () => {
  const userInfo = getUser()
  return (
    <BrowserRouter>
      <Header />
      <TopNav />
      <Routes>
        {/* <Route element={<TopNav />}> */}
        
          <Route path="/" element={<Home />} />
          <Route path="/uploadpage" element={<UploadPage />} />
          <Route path="/noticepersonallist" element={<NoticePersonalList />} />
          <Route path="/noticesendcreate" element={<NoticeSendCreate />} />
          <Route path="/noticesendlist" element={<NoticeSendList />} />
          <Route path="/userdatacreate" element={<UserDataCreate />} />
          <Route path="/usergroupcreate" element={<UserGroupCreate />} />
          <Route path="/usergrouplist" element={<UserGroupList />} />
          <Route path="/userlist" element={<UserList />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/alarmtalk" element={<Alarmtalk />} />
      </Routes>
    </BrowserRouter>
  )
}
export default Router
