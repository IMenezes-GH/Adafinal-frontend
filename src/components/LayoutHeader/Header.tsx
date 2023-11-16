import { FormEvent, useEffect, useRef, useState } from 'react'
import profileIcon from '../../assets/profile-icon.svg'
import searchIcon from '../../assets/search-icon.svg'
import styles from './Header.module.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Nav from './Nav'
import { requestAPI } from '../../api/fetchData'


interface userProps {
  user: User,
  setUser : CallableFunction
  token: string,
  gameList: Game[],
  setGameList: CallableFunction
}



const Header = (props: userProps) => {
  
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const [gameSearch, setGameSearch] = useState('');
  
  const location = useLocation();
  const navigate = useNavigate();

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

  const handleSearchChange = (ev: FormEvent) => {
    
    const target = ev.target as HTMLInputElement;
    setGameSearch(target.value)

  }
  
  const handleSearchGame = async()=>{
    const {response, message} = await requestAPI('/games?name='+gameSearch);
    if (response.ok){
      props.setGameList(message)
      searchRef.current?.focus();
      if (location.pathname !== '/games'){
          navigate('/games');
      }
    }
  }

  return (
    <>
      <div draggable={false} className={styles.Header}>
        <header id='header'>
          <h2 draggable={false} className='title'>BestBrowserGames</h2>
          <form action="">
            <input ref={searchRef} value={gameSearch} onInput={(ev) => handleSearchChange(ev)} type="search" placeholder='Buscar um jogo'/>
            <button type='button' onClick={handleSearchGame}><img src={searchIcon} alt="" /></button>
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