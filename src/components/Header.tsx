import profileIcon from '../assets/profile-icon.svg'
import searchIcon from '../assets/search-icon.svg'
import styles from './Nav.module.css'
import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <nav className={styles.nav}>
        <ul>
            <li><Link to={'/'}>Notícias</Link></li>
            <li><Link to={'/'}>Jogos</Link></li>
            <li><Link to={'/'}>Ranking</Link></li>
            <li><Link to={'/'}>Forum</Link></li>
            <li><Link to={'/'}>Perfil</Link></li>
        </ul>
    </nav>
  )
}


const Header = () => {

  document.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    window.scrollY > 20 ? header?.classList.add('addShadow') : header?.classList.remove('addShadow')
  })

  return (
      <div className={styles.headerWrapper}>
        <header id='header'>
          <h2 className='title'>BestBrowserGames</h2>
          <form action="">
            <input type="search" placeholder='Buscar um jogo'/>
            <button><img src={searchIcon} alt="" /></button>
          </form>
          <div className={styles.loginContainer}><img src={profileIcon} alt="" /><span>|</span><span>Entrar</span></div>
        </header>
        <Nav />
      </div>
  )
}


export default Header