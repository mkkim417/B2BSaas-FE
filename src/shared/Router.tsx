import { BrowserRouter, Route, Routes } from 'react-router-dom'
import TopNav from '../page/TopNav'
import { getUser } from '../util/localstorage'
import Home from '../page/Home'
import UploadPage from '../page/UploadPage'
import Alarmtalk from '../page/Alarmtalk'

const Router = () => {
  const userInfo = getUser()
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<TopNav />}>
          <Route path="/" element={<Home />} />
          <Route path="/uploadpage" element={<UploadPage />} />
          <Route path="/alarmtalk" element={<Alarmtalk />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
export default Router
