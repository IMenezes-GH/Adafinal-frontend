import './App.css'
import {Routes, Route} from 'react-router-dom'

import LoginForm from './components/Forms/LoginForm'
import RegisterForm from './components/Forms/RegisterForm'
import GamesList from './components/Layouts/GamesLayout/GamesList'

import LoginLayout from './components/Layouts/LoginLayout/LoginLayout'
import NewsLayout from './components/Layouts/NewsLayout/NewsLayout'
import RankingLayout from './components/Layouts/RankingLayout/RankingLayout'
import ProfileLayout from './components/Layouts/ProfileLayout/ProfileLayout'
import ForumLayout from './components/Layouts/ForumLayout/ForumLayout'

import GamePage from './components/Layouts/GamesLayout/GamePage/GamePage'
import Logout from './components/Logout'


import Layout from './components/Layouts/Layout'

function App() {
  
  
  return (
    <Routes>
      <Route path={"/"} element={<Layout />}>
        <Route index element={<NewsLayout/>} />
        <Route path={"games"} element={<GamesList />} />
        <Route path={"/games/:gameid"} element={<GamePage />}/>
        <Route path={"forum"} element={<ForumLayout />} />
        <Route path={"ranking"} element={<RankingLayout />} />
        <Route path={"profile"} 
        element={<ProfileLayout />} />
          <Route path={"/profile/:userid"} 
        element={<ProfileLayout />} />
        <Route path={'logout'} 
          element={<Logout />} />
        <Route path={"login"} element={<LoginLayout />} >
          <Route index 
          element={<LoginForm />} />
          <Route path={'register'} element={<RegisterForm />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
