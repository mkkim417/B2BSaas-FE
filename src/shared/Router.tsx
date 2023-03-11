import { BrowserRouter, Route, Routes } from 'react-router-dom'
import TopNav from '../page/TopNav'
import { getUser } from '../util/localstorage'
import Home from '../page/Home'
import SendMessage from '../page/SendMessage'

const Router = () => {
  const userInfo = getUser()
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<TopNav />}>
          <Route path="/" element={<Home />} />
          <Route path="/sendmessage" element={<SendMessage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
export default Router
