import Header from './components/Header'
import './App.css'
import {Routes, Route, Outlet} from 'react-router-dom'
import NewsPage from './components/NewsPage'
import LoginPage from './components/LoginPage'


export const Layout = () => {
  return (
    <>
    <Header />
    <Outlet />
    </>
  )
}


function App() {
  
  return (
    <Routes>
      <Route path={"/"} element={<Layout />}>
        <Route index element={<NewsPage />} />
        <Route path={"login"} element={<LoginPage />} />
      </Route>
    </Routes>
  )
}

export default App
