import { useEffect } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import styles from './LoginLayout.module.css';

interface ILoginLayout{
  token?: string
}

const LoginLayout = (props: ILoginLayout) => {

  const navigate = useNavigate();

  useEffect(() => {
    if (props.token) navigate('/profile');
  }, [props.token, navigate])

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