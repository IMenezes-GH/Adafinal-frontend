import styles from './Form.module.css'
import { Link, useNavigate } from 'react-router-dom'
import {loginAPI} from '../../api/fetchData'
import { FormEvent, useState } from 'react'

// const URL: string = 'https://adafinal-backend.vercel.app'

const LoginForm = (props: userProps) => {

  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  const handleSubmit = async(ev: FormEvent) => {
    ev.preventDefault();
    const target = ev.target as HTMLFormElement;

    const loginData = {
      email: target.email.value,
      password: target.password.value
    }

    const login = await loginAPI(loginData);
    document.body.style.cursor = 'wait'

    setMessage(login.data.message);
    if (login.ok) {

      login.data.user._id = login.data.user.id;
      props.setUser(login.data.user);
      props.setToken(login.data.token);
      navigate('/profile')
    }
    else setMessage(login.data.message);

    document.body.style.cursor = 'auto'
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
        <output>{message}</output>
    </form>
  )
}

export default LoginForm