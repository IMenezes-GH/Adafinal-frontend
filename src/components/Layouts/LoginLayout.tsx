import styles from './LoginLayout.module.css';
import { Outlet, Link } from 'react-router-dom';

const LoginPage = () => {

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

export default LoginPage