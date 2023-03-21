import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TopNav from '../page/TopNav';
import { getUser } from '../util/localstorage';
import Home from '../page/Home';
import UploadPage from '../page/UploadPage';
import NoticePersonalList from '../page/NoticePersonalList';
import NoticeSendCreate from '../page/NoticeSendCreate';
import NoticeSendList from '../page/NoticeSendList';
import UserDataCreate from '../page/UserDataCreate';
import UserGroupCreate from '../page/UserGroupCreate';
import UserGroupList from '../page/UserGroupList';
import UserList from '../page/UserList';
import Statistics from '../page/Statistics';
import Alarmtalk from '../page/Alarmtalk';
import Header from '../components/Header';
import Signup from '../page/Signup';
import Login from '../page/Login';
import Mypage from '../page/Mypage';
import GroupInUserList from '../page/GroupInUserList';
import Email from '../page/Email';
import SplitServicePage from '../page/SplitServicePage';
import EmailTemplates from '../page/EmailTemplates';
import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';

const Router = () => {
  const userInfo = getUser();
  return (
    <BrowserRouter>
      <Header />
      <TopNav />
      <AnimatePresence>
        <Routes>
          {/* <Route element={<TopNav />}> */}

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
          <Route path="/signup" element={<Signup />} />
          <Route path="/email" element={<Email />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/splitservicepage" element={<SplitServicePage />} />
          <Route path="/groupinuserlist/:id" element={<GroupInUserList />} />
          <Route path="/emailtemplates" element={<EmailTemplates />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </AnimatePresence>
    </BrowserRouter>
  );
};
export default Router;
