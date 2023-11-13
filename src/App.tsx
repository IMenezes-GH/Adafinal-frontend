import Header from './components/Header'
import './App.css'
import {Routes, Route, Outlet} from 'react-router-dom'
import NewsLayout from './components/Layouts/NewsLayout'
import LoginLayout from './components/Layouts/LoginLayout'
import LoginForm from './components/forms/LoginForm'
import RegisterForm from './components/forms/RegisterForm'
import GamesLayout from './components/Layouts/GamesLayout'
import RankingLayout from './components/Layouts/RankingLayout'
import ForumLayout from './components/Layouts/ForumLayout'
import ProfileLayout from './components/Layouts/ProfileLayout'

import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import { refreshAPI } from './api/fetchData'
import Logout from './components/Logout'

const FETCH_URL = 'http://localhost:3000'

function App() {
  
  const [user, setUser] = useState<User>({username: '', name: '', description: '', state: '', country: ''});
  const [token, setToken] = useState('');

  
  useEffect(() => {
 
    const jwt = token && (jwtDecode(token))
    const current_time = new Date().getTime() / 1000;
    if (!jwt || current_time > jwt.exp!) {
      const data = (async () => await refreshAPI(FETCH_URL))();
      data.then((d) => { // OBS: STRICT MODE BREAKS THIS
        if (d.ok){
          setUser(d.data.user)
          setToken(d.data.token)
        }
      })
    }
    
  })
  
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
        <Route index element={<NewsLayout/>} />
        <Route path={"games"} element={<GamesLayout />} />
        <Route path={"forum"} element={<ForumLayout />} />
        <Route path={"ranking"} element={<RankingLayout />} />
        <Route path={"profile"} 
        element={<ProfileLayout 
          user={user} 
          setUser={setUser} 
          token={token} 
          setToken={setToken}/>} />
        <Route path={'logout'} 
          element={<Logout 
          setToken={setToken} 
          setUser={setUser}/>} />
        <Route path={"login"} element={<LoginLayout />} >
          <Route index 
          element={<LoginForm 
          user={user} 
          setUser={setUser} 
          token={token} 
          setToken={setToken}/>} />
          <Route path={'register'} element={<RegisterForm />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
