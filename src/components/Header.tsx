
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
  return (
    <section className='head'>
      <div className='header-wrapper'>
        <header>
          <h2 className='title'>BestBrowserGames</h2>
          <form action="">
            <input type="search" placeholder='Buscar um jogo'/>
            <button><img src={searchIcon} alt="" /></button>
          </form>
          <p>Entrar</p>
        </header>
        <Nav />
      </div>
    </section>
  )
}


export default Header