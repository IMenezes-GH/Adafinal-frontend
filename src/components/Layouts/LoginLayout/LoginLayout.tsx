import { useContext, useEffect } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import styles from './LoginLayout.module.css';
import { UserContext } from '../../../context/UserProvider';


const LoginLayout = () => {

  const navigate = useNavigate();
  const { token } = useContext(UserContext);

  useEffect(() => {
    if (token) navigate('/profile');
  }, [token, navigate])

  return (
    <>
    <main className={styles.loginPage}>
      <section className={styles.loginSection}>
        <nav className={styles.loginNav}>
          <Link to={""}>Login</Link>
          <Link to={"register"}>Cadastrar</Link>
        </nav>
        <Outlet />
      </section>
    </main>
    </>
  )
}

export default LoginLayout