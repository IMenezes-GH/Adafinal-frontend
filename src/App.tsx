import Header from './components/Header'
import './App.css'
import {Routes, Route, Outlet} from 'react-router-dom'
import NewsPage from './components/Layouts/NewsPage'
import LoginPage from './components/Layouts/LoginPage'


export const Layout = () => {
  return (
    <>
    <div className='block'>
      <Header />
    </div>
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
