import { useEffect, useRef, useState } from 'react'
import profileIcon from '../../assets/profile-icon.svg'
import searchIcon from '../../assets/search-icon.svg'
import styles from './Header.module.css'
import { Link } from 'react-router-dom'
import Nav from './Nav'


interface userProps {
  user: User,
  setUser : CallableFunction
  token: string
}



const Header = (props: userProps) => {
  
  const [isOpen, setIsOpen] = useState(false);

  const DropDown = () => {
    const dropdown = useRef<HTMLDivElement>(null);
  
    useEffect(() => {
      if (isOpen){
        dropdown.current?.classList.add('open');
      }
      else {
        dropdown.current?.classList.remove('open');
      }
    }, [isOpen])
  
    return (
    <div ref={dropdown} className={styles.dropDown}>
      <ul>
        <li>
        <Link to={'profile'}>Perfil</Link>
        </li>
        <li>
        <Link to={'logout'}>Logout</Link>
        </li>
      </ul>
    </div>
    )
  }

  document.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    window.scrollY > 5 ? header?.classList.add('addShadow') : header?.classList.remove('addShadow')
  })

  const handleOpenDropdown = () => { 
    setIsOpen(!isOpen)
  }

  return (
    <>
      <div draggable={false} className={styles.Header}>
        <header id='header'>
          <h2 draggable={false} className='title'>BestBrowserGames</h2>
          <form action="">
            <input type="search" placeholder='Buscar um jogo'/>
            <button><img src={searchIcon} alt="" /></button>
          </form>
          <div className={styles.loginContainer}>
            <img src={profileIcon} alt="" />
            <span>|</span>
            {props.token 
            ? <p onClick={handleOpenDropdown}>{props.user.username || 'Entrar'}</p>  
            : <Link to={props.token ? 'profile' : 'login'}>
              {props.user.username || 'Entrar'}
              </Link> 
            }
            {/* <Link to={props.token ? 'profile' : 'login'}>{props.user.username || 'Entrar'}</Link> */}
          </div>
          <DropDown />
        </header>
        <Nav token={props.token}/>
      </div>
    </>
  )
}


export default Header