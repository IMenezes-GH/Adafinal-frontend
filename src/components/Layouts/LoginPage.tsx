import styles from './LoginPage.module.css';
import RegisterForm from '../RegisterForm/RegisterForm';

const LoginPage = () => {


  return (
    <>
    <main className={styles.loginPage}>
      <section className={styles.loginSection}>
        <RegisterForm />
      </section>
    </main>
    </>
  )
}

export default LoginPage