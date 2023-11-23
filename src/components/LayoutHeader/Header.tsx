import { useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import profileIcon from '../../assets/profile-icon.svg'
import searchIcon from '../../assets/search-icon.svg'

import styles from './Header.module.css'
import Nav from './Nav'
import { UserContext } from '../../context/UserProvider'

import NavDropdown from '../Dropdown/NavDropdown'



const Header = () => {
  
  const {user, token} = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);

  const {search, setSearch} = useContext(UserContext);
  
  const location = useLocation();
  const navigate = useNavigate();

  

  document.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    window.scrollY > 5 ? header?.classList.add('addShadow') : header?.classList.remove('addShadow')
  })

  const handleOpenDropdown = () => { 
    setIsOpen(!isOpen)
  }

  
  const handleSearchGame = async() => {
 
      if (location.pathname !== '/games'){
          navigate('/games');
      }
    
  }

  return (
    <>
      <div draggable={false} className={styles.Header}>
        <header id='header'>
          <h2 draggable={false} className='title'>BestBrowserGames</h2>
          <form action="">
            <input value={search} onInput={(ev) => setSearch((ev.target as HTMLInputElement).value)} type="search" placeholder='Buscar um jogo'/>
            <button type='button' onClick={handleSearchGame}><img src={searchIcon} alt="" /></button>
          </form>
          <div className={styles.loginContainer}>
            <img src={profileIcon} alt="" />
            <span>|</span>
            {token 
            ? <p onClick={handleOpenDropdown}>{user?.username || 'Entrar'}</p>  
            : <Link to={token ? 'profile' : 'login'}>
              {user?.username || 'Entrar'}
              </Link> 
            }
          </div>
          <NavDropdown isOpen={isOpen}/>
        </header>
        <Nav/>
      </div>
    </>
  )
}


export default Header