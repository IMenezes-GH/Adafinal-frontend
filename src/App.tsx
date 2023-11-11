import Header from './components/Header'
import './App.css'
import {Routes, Route, Outlet} from 'react-router-dom'
import NewsPage from './components/Layouts/NewsPage'
import LoginLayout from './components/Layouts/LoginLayout'
import LoginForm from './components/forms/LoginForm'
import RegisterForm from './components/forms/RegisterForm'
import GamesLayout from './components/Layouts/GamesLayout'
import RankingLayout from './components/Layouts/RankingLayout'
import ForumLayout from './components/Layouts/ForumLayout'
import ProfileLayout from './components/Layouts/ProfileLayout'

import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'


function App() {
  
  const [user, setUser] = useState<User>({username: '', name: ''});
  const [token, setToken] = useState('');
  const [cookies, setCookie, removeCookie] = useCookies(['jwt']);


  useEffect(() => {
    console.log(cookies);
  }, [cookies])

  const Layout = () => {
    
    return (
      <>
      <div className='block'>
        <Header user={user} setUser={setUser} token={token}/>
      </div>
      <Outlet />
      </>
    )
  }
  
  
  return (
    <Routes>
      <Route path={"/"} element={<Layout />}>
        <Route index element={<NewsPage/>} />
        <Route path={"games"} element={<GamesLayout />} />
        <Route path={"profile"} element={<ProfileLayout user={user} setUser={setUser}/>} />
        <Route path={"forum"} element={<ForumLayout />} />
        <Route path={"ranking"} element={<RankingLayout />} />
        <Route path={"login"} element={<LoginLayout />} >
          <Route index element={<LoginForm token={token} setToken={setToken} user={user} setUser={setUser} />} />
          <Route path={'register'} element={<RegisterForm />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
