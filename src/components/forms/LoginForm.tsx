import styles from './RegisterForm.module.css'
import { Link } from 'react-router-dom'
import fetchData from '../../api/fetchData'
import { FormEvent } from 'react'

const LoginForm = () => {

  const handleSubmit = async(ev: FormEvent) => {
    ev.preventDefault();
    const target = ev.target as HTMLFormElement;

    const data = {
      email: target.email.value,
      password: target.password.value,
      confirmPassword: target.password.value
    }

    const res = await fetchData('https://adafinal-backend.vercel.app/auth/login', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    if (res?.response.ok) console.warn(res);
    else console.error(res)
  }

  return (
    <form className={styles.signForm} onSubmit={(ev) => handleSubmit(ev)}>
      <h1>Entre com sua conta</h1>
        <label htmlFor="email">Email:</label>
        <input id='email' type="email" placeholder='email@exemplo.com'/>
        <label htmlFor="password">Senha:</label>
        <input id='password' type="password" placeholder='sua senha'/>
        <div>
            <button type='submit'>Login</button>
        </div>
        <Link to={"register"}>Não tem uma conta?</Link>
    </form>
  )
}

export default LoginForm