import {useState, FormEvent, ChangeEvent} from 'react'
import fetchData from '../../api/fetchData';
import styles from './RegisterForm.module.css'

const RegisterForm = () => {


    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [country, setCountry] = useState('Brazil');
    const [stateUF, setStateUF] = useState('SP'); 
    const [birthDate, setBirthDate] = useState('');
  
    const handleSubmit = async (ev: FormEvent) => {
  
      ev.preventDefault();
      const user = {
        name,
        username,
        password,
        confirmPassword,
        email,
        country,
        stateUF,
        birthDate
      }
  
      const signIn = await fetchData('https://adafinal-backend.vercel.app/users', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
      if (signIn?.response.ok) {
        setName('');
        setPassword('');
        setEmail('');
        setUsername('');
        setBirthDate('');
        (ev.target as HTMLFormElement).reset()
      }
    }

  return (
    <form onSubmit={(ev) => {handleSubmit(ev)}} className={styles.signForm} id="signForm">
          <h1>Cadastre-se!</h1>
          <p>Faça parte das discussões!</p>
          <hr />
          <div>

            <div>
              <label htmlFor="username">Nome de usuário*:</label>
              <input 
                value={username} 
                onChange={(ev: ChangeEvent<HTMLInputElement>) => {setUsername(ev.target.value)}} 
                required 
                type="text" 
                id='username' 
                placeholder='Username'/>
            </div>

            <div>
              <label htmlFor="name">Nome completo*:</label>
              <input 
                value={name} 
                onChange={(ev: FormEvent) => {setName((ev.target as HTMLInputElement).value)}} 
                required 
                type="text" 
                id='name' 
                placeholder='Nome Completo da Silva'/>
            </div>
          </div>

          <label htmlFor="email">Email*:</label>
          <input 
            value={email} 
            onChange={(ev: FormEvent) => {setEmail((ev.target as HTMLInputElement).value)}} 
            required 
            type="email" 
            id='email' 
            placeholder='email@exemplo.com'/>

          <label htmlFor="password">Senha*:</label>
          <input 
            value={password}
            onChange={(ev: FormEvent) => {setPassword((ev.target as HTMLInputElement).value)}} 
            required 
            type="password" 
            placeholder='sua senha(mín 6, máx 15)' 
            id='password' />
          <input 
            value={confirmPassword}
            onChange={(ev: FormEvent) => {setConfirmPassword((ev.target as HTMLInputElement).value)}} 
            required 
            type="password" 
            placeholder='sua senha(mín 6, máx 15)' 
            id='confirmPassword' />
          
          <label htmlFor="birthDate">Data de nascimento*:</label>
          <input 
            value={birthDate}
            onChange={(ev: FormEvent) => {setBirthDate((ev.target as HTMLInputElement).value)}} 
            required 
            type="date" 
            id='birthDate'/>
          <div>
          <label htmlFor="country">País*:</label>
          <select 
            onChange={(ev: FormEvent) => {setCountry((ev.target as HTMLInputElement).value)}} 
            required 
            name="country" 
            id="country">
            <option value="Brazil">Brasil</option>
          </select>
          <label htmlFor="state">Estado*:</label>
          <select 
            onChange={(ev: FormEvent) => {setStateUF((ev.target as HTMLInputElement).value)}} 
            required 
            name="state" 
            id="state">
            <option value="SP">SP</option>
          </select>
          </div>
          <div>
            <input type="checkbox" required id='terms' />
            <label htmlFor="terms"> Lí e aceito os Termos e condições
            </label>
          </div>
          <div>
            <button type='reset'>Limpar</button>
            <button type='submit'>Enviar</button>
          </div>
        </form>
  )
}

export default RegisterForm