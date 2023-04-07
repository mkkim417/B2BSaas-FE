import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TopNav from '../page/TopNav';
import Home from '../page/Home';
import UploadPage from '../page/UploadPage';
import NoticePersonalList from '../page/NoticePersonalList';
import NoticeSendCreate from '../page/NoticeSendCreate';
import NoticeSendList from '../page/NoticeSendList';
import UserList from '../components/NotUsedPages/UserList';
import Statistics from '../page/Statistics';
import Alarmtalk from '../page/Alarmtalk';
import Header from '../components/Header';
import Signup from '../page/Signup';
import Login from '../page/Login';
import Mypage from '../page/Mypage';
import GroupInUserList from '../components/NotUsedPages/GroupInUserList';
// import Email from '../page/Email';
import SplitServicePage from '../page/SplitServicePage';
// import EmailTemplates from '../page/EmailTemplates';
// import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
import SingleUserCreate from '../page/SingleUserCreate';
import ClientRegistration from '../page/ClientRegistration';
import GroupManageList from '../page/GroupManageList';
import KakaoResultList from '../page/KakaoResultList';
import KakaoDetailList from '../page/KakaoDetailList';
import PricePoicy from '../page/PricePolicy';
import { getCookie } from '../util/cookie';
import PrivateRoute from '../util/PrivateRoute';
import ReadyAlarmtalk from '../page/ReadyAlarmtalk';
import HomeHeader from '../components/HomeHeader';

const Router = () => {
  return (
    <BrowserRouter>
      {/* <TopNav /> */}
      <AnimatePresence>
        <Routes>
          <Route
            element={
              <>
                <HomeHeader />
                <TopNav />
              </>
            }
          >
            <Route element={<PrivateRoute authentication={true} />}>
              <Route path="/uploadpage" element={<UploadPage />} />
            </Route>
            <Route
              path="/noticepersonallist"
              element={<NoticePersonalList />}
            />
            <Route path="/noticesendcreate" element={<NoticeSendCreate />} />
            <Route path="/noticesendlist" element={<NoticeSendList />} />
            {/* <Route path="/userdatacreate" element={<UserDataCreate />} /> */}
            {/* <Route path="/usergroupcreate" element={<UserGroupCreate />} /> */}
            {/* <Route path="/usergrouplist" element={<UserGroupList />} /> */}
            <Route path="/userlist" element={<UserList />} />
            <Route element={<PrivateRoute authentication={true} />}>
              <Route path="/statistics" element={<Statistics />} />
            </Route>
            <Route element={<PrivateRoute authentication={true} />}>
              <Route path="/alarmtalk" element={<Alarmtalk />}>
                <Route path="/alarmtalk/:id" element={<Alarmtalk />} />
              </Route>
            </Route>
            <Route path="/signup" element={<Signup />} />
            {/* <Route path="/email" element={<Email />} /> */}
            <Route path="/login" element={<Login />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/splitservicepage" element={<SplitServicePage />} />
            <Route path="/groupinuserlist/:id" element={<GroupInUserList />} />
            {/* <Route path="/emailtemplates" element={<EmailTemplates />} /> */}
            <Route path="/singleusercreate" element={<SingleUserCreate />} />
            <Route element={<PrivateRoute authentication={true} />}>
              <Route
                path="/clientregistration"
                element={<ClientRegistration />}
              />
            </Route>
            <Route element={<PrivateRoute authentication={true} />}>
              <Route path="/readyalarmtalk" element={<ReadyAlarmtalk />}>
                <Route
                  path="/readyalarmtalk/:id"
                  element={<ReadyAlarmtalk />}
                />
              </Route>
            </Route>
            <Route element={<PrivateRoute authentication={true} />}>
              <Route path="/groupmanageList" element={<GroupManageList />} />
            </Route>
            <Route element={<PrivateRoute authentication={true} />}>
              <Route path="/kakaoresultlist" element={<KakaoResultList />} />
            </Route>
            <Route path="/pricepolicy" element={<PricePoicy />} />
            <Route path="/kakaodetaillist/:id" element={<KakaoDetailList />} />
          </Route>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Home />
              </>
            }
          />
        </Routes>
      </AnimatePresence>
    </BrowserRouter>
  );
};
export default Router;
