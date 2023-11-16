import './App.css'
import {Routes, Route, Outlet} from 'react-router-dom'
import NewsLayout from './components/Layouts/NewsLayout/NewsLayout'
import LoginLayout from './components/Layouts/LoginLayout/LoginLayout'
import LoginForm from './components/Forms/LoginForm'
import RegisterForm from './components/Forms/RegisterForm'
import GamesList from './components/Layouts/GamesLayout/GamesList'
import RankingLayout from './components/Layouts/RankingLayout/RankingLayout'
import ForumLayout from './components/Layouts/ForumLayout/ForumLayout'
import ProfileLayout from './components/Layouts/ProfileLayout/ProfileLayout'
import { BASE_URL } from './api/fetchData'

import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import { refreshAPI } from './api/fetchData'
import Logout from './components/Logout'
import GamePage from './components/Layouts/GamesLayout/GamePage/GamePage'

import Footer from './components/LayoutFooter/Footer'
import Header from './components/LayoutHeader/Header'

function App() {
    
    const [user, setUser] = useState<User>({username: '', name: '', description: '', state: '', country: ''});
    const [token, setToken] = useState('');
    const [gameList, setGameList] = useState([]);
    const [gameSearch, setGameSearch] = useState('');

  const loadGames = async () => {
    const response = await fetch(BASE_URL + '/games/all');
    const message = await response.json();
    setGameList(message)
  }

  useEffect(() => {
 
    // loadCategories();
    loadGames();
    
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
    
  }, [token, user])
  
  const Layout = () => {
    
    return (
      <>
      <div className='block'>
        <Header gameSearch={gameSearch} setGameSearch={setGameSearch} gameList={gameList} setGameList={setGameList} user={user} setUser={setUser} token={token}/>
      </div>
      <Outlet />
      <Footer gameList={gameList} setGameList={setGameList} token={token} user={user}/>
      </>
    )
  }
  
  
  return (
    <Routes>
      <Route path={"/"} element={<Layout />}>
        <Route index element={<NewsLayout/>} />
        <Route path={"games"} element={<GamesList gameList={gameList} setGameList={setGameList} />} />
        <Route path={"/games/:gameid"} element={<GamePage token={token} user={user}/>}/>
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
