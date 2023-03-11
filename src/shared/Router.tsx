import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TopNav from '../page/TopNav';
import { getUser } from '../util/localstorage';
import Home from '../page/Home';
import SendMessage from '../page/SendMessage';
import Signup from '../page/Signup';
import Login from '../page/Login';
import Mypage from '../page/Mypage';

const Router = () => {
  const userInfo = getUser();
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<TopNav />}>
          <Route path="/" element={<Home />} />
          <Route path="/sendmessage" element={<SendMessage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Mypage" element={<Mypage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
