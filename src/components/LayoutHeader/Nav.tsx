import styles from './Nav.module.css'
import { Link } from 'react-router-dom'
import { useContext } from 'react';
import { UserContext } from '../../context/UserProvider';  

const Nav = () => {
  
  const {token} = useContext(UserContext);
  
    return (
      <nav className={styles.Nav}>
          <ul>
              <li><Link to={'/'}>Notícias</Link></li>
              <li><Link to={'games'}>Jogos</Link></li>
              {/* <li><Link to={'ranking'}>Ranking</Link></li> */}
              {/* <li><Link to={'forum'}>Forum</Link></li> */}
              <li><Link to={token ? 'profile' : 'login'}>Perfil</Link></li>
          </ul>
      </nav>
    )
}

export default Nav