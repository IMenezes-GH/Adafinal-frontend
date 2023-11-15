import Header from './LayoutHeader/Header'
import Footer from './LayoutFooter/Footer'

import { useContext, useEffect} from 'react'
import { jwtDecode } from 'jwt-decode'
import { refreshAPI } from '../api/fetchData'

import {AuthContext} from '../AuthContext'


const Layout = () => {

    const {login, token}  = useContext(AuthContext);
    
    useEffect(() => {

      const jwt = token && (jwtDecode(token))
      const current_time = new Date().getTime() / 1000;
      if (!jwt || current_time > jwt.exp!) {
        const data = (async () => await refreshAPI())();
        data.then((d) => { // OBS: STRICT MODE BREAKS THIS
          if (d.ok){
            login(d.data.token)
            // setUser(d.data.user)
            // setToken(d.data.token)
          }
        })
      }
      
    }, [login, token])
    
    return (
      <>
      <div className='block'>
        <Header/>
      </div>
      <Outlet/>
      <Footer/>
      </>
    )
}

export default Layout