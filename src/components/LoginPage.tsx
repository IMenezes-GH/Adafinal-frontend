import { useEffect, useState } from 'react';
import styles from './LoginPage.module.css';

const LoginPage = () => {

  const [name, setName] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [country, setCountry] = useState();
  const [stateUF, setStateUF] = useState(); 
  const [birthDate, setBirthDate] = useState();

  const [applyStyle, setApplyStyle] = useState(false);
  // const 

  const handleApplyStyle = () => {
    if (name && username && password && email && country && stateUF && birthDate){
      setApplyStyle(true);
    }
    else setApplyStyle(false);
  }

  useEffect(() => {
    handleApplyStyle()
  }, [name, username, password, email, country, stateUF, birthDate])

  return (
    <>
    <main className={styles.loginPage}>
      <section className={styles.loginSection}>
        <form className={styles.signForm}>
          <h1>Cadastre-se!</h1>
          <p>Faça parte das discussões!</p>
          <hr />
          <div>
            <div>
              <label htmlFor="username">Nome de usuário*:</label>
              <input required type="text" id='username' placeholder='Username'/>
            </div>
            <div>
              <label htmlFor="name">Nome completo*:</label>
              <input required type="text" id='name' placeholder='Nome Completo da Silva'/>
            </div>
          </div>
          <label htmlFor="email">Email*:</label>
          <input required type="email" id='email' placeholder='email@exemplo.com'/>
          <label htmlFor="password">Senha*:</label>
          <input required type="password" placeholder='sua senha(mín 6, máx 15)' id='password' />
          <input required type="password" placeholder='sua senha(mín 6, máx 15)' id='confirmPassword' />
          
          <label htmlFor="birthDate">Data de nascimento*:</label>
          <input required type="date" id='birthDate'/>
          <div>
          <label htmlFor="country">País*:</label>
          <select required name="country" id="countr">
            <option value="Brasil">Brasil</option>
          </select>
          <label htmlFor="state">Estado*:</label>
          <select required name="state" id="state">
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
      </section>
    </main>
    </>
  )
}

export default LoginPage