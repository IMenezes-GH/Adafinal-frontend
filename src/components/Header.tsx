import profileIcon from '../assets/profile-icon.svg'
import searchIcon from '../assets/search-icon.svg'
import styles from './Header.module.css'
import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <nav className={styles.nav}>
        <ul>
            <li><Link to={'/'}>Notícias</Link></li>
            <li><Link to={'games'}>Jogos</Link></li>
            <li><Link to={'ranking'}>Ranking</Link></li>
            <li><Link to={'forum'}>Forum</Link></li>
            <li><Link to={'profile'}>Perfil</Link></li>
        </ul>
    </nav>
  )
}


const Header = () => {

  document.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    window.scrollY > 5 ? header?.classList.add('addShadow') : header?.classList.remove('addShadow')
  })

  return (
    <>
      <div draggable={false} className={styles.headerWrapper}>
        <header id='header'>
          <h2 draggable={false} className='title'>BestBrowserGames</h2>
          <form action="">
            <input type="search" placeholder='Buscar um jogo'/>
            <button><img src={searchIcon} alt="" /></button>
          </form>
          <div className={styles.loginContainer}><img src={profileIcon} alt="" /><span>|</span><Link to={'login'}>Entrar</Link></div>
        </header>
        <Nav />
      </div>
    </>
  )
}


export default Header