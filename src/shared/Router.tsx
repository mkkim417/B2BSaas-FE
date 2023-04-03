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
import Email from '../page/Email';
import SplitServicePage from '../page/SplitServicePage';
import EmailTemplates from '../page/EmailTemplates';
import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
import SingleUserCreate from '../page/SingleUserCreate';
import ClientRegistration from '../page/ClientRegistration';
import GroupManageList from '../page/GroupManageList';
import KakaoResultList from '../page/KakaoResultList';
import KakaoDetailList from '../page/KakaoDetailList';
import PricePoicy from '../page/PricePolicy';
import { getCookie } from '../util/cookie';
import PrivateRoute from '../util/PrivateRoute';

const Router = () => {
  const token = getCookie('userToken');
  return (
    <BrowserRouter>
      {/* <TopNav /> */}
      <AnimatePresence>
        <Routes>
          <Route element={<TopNav />}>
            {/* <Route
              path="/uploadpage"
              element={
                <PrivateRoute
                  component={<UploadPage />}
                  authenticated={token}
                />
              }
            /> */}
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
            {/* <Route
              path="/statistics"
              element={
                <PrivateRoute
                  component={<Statistics />}
                  authenticated={token}
                />
              }
            />
            <Route
              path="/alarmtalk/:id"
              element={
                <PrivateRoute component={<Alarmtalk />} authenticated={token} />
              }
            /> */}
            <Route path="/signup" element={<Signup />} />
            <Route path="/email" element={<Email />} />
            <Route path="/login" element={<Login />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/splitservicepage" element={<SplitServicePage />} />
            <Route path="/groupinuserlist/:id" element={<GroupInUserList />} />
            <Route path="/emailtemplates" element={<EmailTemplates />} />
            <Route path="/singleusercreate" element={<SingleUserCreate />} />
            {/* <Route
              path="/clientregistration"
              element={
                <PrivateRoute
                  component={<ClientRegistration />}
                  authenticated={token}
                />
              }
            />
            <Route
              path="/groupmanageList"
              element={
                <PrivateRoute
                  component={<GroupManageList />}
                  authenticated={token}
                />
              }
            />
            <Route
              path="/kakaoresultlist"
              element={
                <PrivateRoute
                  component={<KakaoResultList />}
                  authenticated={token}
                />
              }
            /> */}
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
