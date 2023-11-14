import Header from './components/Header'
import './App.css'
import {Routes, Route, Outlet} from 'react-router-dom'
import NewsLayout from './components/Layouts/NewsLayout'
import LoginLayout from './components/Layouts/LoginLayout'
import LoginForm from './components/forms/LoginForm'
import RegisterForm from './components/forms/RegisterForm'
import GamesList from './components/GamesList'
import RankingLayout from './components/Layouts/RankingLayout'
import ForumLayout from './components/Layouts/ForumLayout'
import ProfileLayout from './components/Layouts/ProfileLayout'
import { BASE_URL } from './api/fetchData'

import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import { refreshAPI } from './api/fetchData'
import Logout from './components/Logout'
import GamesPage from './components/GamePage'
import Footer from './components/Footer'

function App() {
  
  const [user, setUser] = useState<User>({username: '', name: '', description: '', state: '', country: ''});
  const [token, setToken] = useState('');
  const [category, setCategory] = useState<Category[]>([]);
  
  const loadCategories = async() => {
    const response = await fetch(BASE_URL + '/category');
    const message = await response.json()
    setCategory(message);
  }

  useEffect(() => {
 
    loadCategories();
    
    const jwt = token && (jwtDecode(token))
    const current_time = new Date().getTime() / 1000;
    if (!jwt || current_time > jwt.exp!) {
      const data = (async () => await refreshAPI())();
      data.then((d) => { // OBS: STRICT MODE BREAKS THIS
        if (d.ok){
          setUser(d.data.user)
          setToken(d.data.token)
        }
      })
    }
    
  }, [token])
  
  const Layout = () => {
    
    return (
      <>
      <div className='block'>
        <Header user={user} setUser={setUser} token={token}/>
      </div>
      <Outlet />
      <Footer user={user}/>
      </>
    )
  }
  
  
  return (
    <Routes>
      <Route path={"/"} element={<Layout />}>
        <Route index element={<NewsLayout/>} />
        <Route path={"games"} element={<GamesList category={category} />} />
        <Route path={"/games/:gameid"} element={<GamesPage category={category} token={token} user={user}/>}/>
        <Route path={"forum"} element={<ForumLayout />} />
        <Route path={"ranking"} element={<RankingLayout />} />
        <Route path={"profile"} 
        element={<ProfileLayout 
          user={user} 
          setUser={setUser} 
          token={token} 
          setToken={setToken}/>} />
          <Route path={"/profile/:userid"} 
        element={<ProfileLayout 
          user={user} 
          setUser={setUser} 
          token={token} 
          setToken={setToken}/>} />
        <Route path={'logout'} 
          element={<Logout 
          setToken={setToken} 
          setUser={setUser}/>} />
        <Route path={"login"} element={<LoginLayout token={token}/>} >
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
