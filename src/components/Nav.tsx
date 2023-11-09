import React from 'react'
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
            <li>☰</li>
        </ul>
    </nav>
  )
}

export default Nav