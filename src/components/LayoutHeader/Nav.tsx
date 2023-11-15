import styles from './Nav.module.css'
import { Link } from 'react-router-dom'

interface IProps {
    token: string
  }
  
const Nav = (props: IProps) => {
  
    const { token } = props
  
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