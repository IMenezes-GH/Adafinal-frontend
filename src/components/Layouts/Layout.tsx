import Header from "../LayoutHeader/Header"
import Footer from "../LayoutFooter/Footer"
import { Outlet } from "react-router-dom"

const Layout = () => {
    
    return (
      <>
      <div className='block'>
        <Header />
      </div>
      <Outlet />
      <Footer/>
      </>
    )
}

export default Layout